"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full disabled:opacity-50 disabled:cursor-not-allowed mt-5"
    >
      {pending ? (
        <p className="flex items-center gap-2 font-hankook">
          <LoaderCircle size={15} className="animate-spin" />
          Loading...
        </p>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  return (
    <form
      action={async (formData) => {
        const nik = formData.get("nik");
        const password = formData.get("password");

        const res = await signIn("credentials", {
          nik,
          password,
          redirect: false,
        });

        if (res?.ok) {
          toast.success("Redirecting, please wait...");
          router.push("/dashboard");
        } else {
          toast.error("Wrong NIK or Password");
        }
      }}
      className="flex flex-col gap-4 mt-8 font-hankook"
    >
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-semibold">
          NIK
        </label>
        <input
          type="text"
          name="nik"
          id="nik"
          className="p-2 rounded-md border rounded-md text-sm focus-visible:outline-orange-500"
          placeholder="NIK"
          required
          minLength={8}
          maxLength={8}
          pattern="[0-9]*"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-semibold">
          Password
        </label>
        <div className="w-full relative">
          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            className="p-2 rounded-md w-full border rounded-md text-sm focus-visible:outline-orange-500"
            placeholder="Password"
            required
          />
          <button type="button" onClick={() => setShow(!show)}>
            {show ? (
              <EyeOff
                size={20}
                className={`absolute right-2 top-2 transition-all text-zinc-500`}
              />
            ) : (
              <Eye size={20} className="absolute right-2 top-2 text-zinc-500" />
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <Checkbox id="remember" />
          <label htmlFor="remember" className="ml-2 text-xs font-medium">
            Remember ID
          </label>
        </div>
        <a
          href="#"
          className="text-xs text-zinc-500 hover:underline hover:text-black"
        >
          Forgot Password?
        </a>
      </div>
      <SubmitButton />
    </form>
  );
}
