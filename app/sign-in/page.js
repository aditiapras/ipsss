import LoginForm from "@/components/form/sign-in";
import { Toaster } from "sonner";

export default function SignIn() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 bg-zinc-100">
      <Toaster
        richColors
        closeButton
        position="top-center"
        reverseOrder={false}
        className="text-xs font-hankook"
      />
      {/* HEADER */}
      <div className="flex gap-3 bg-zinc-50 py-5 pl-6 md:pl-3 absolute w-full top-0 left-0 h-20 lg:h-32 items-center justify-center z-10">
        <div className="lg:w-[200px]">
          <img src="/logo.png" alt="logo" width={200} height={100} />
        </div>
        <div className="flex gap-2 items-center pl-3 border-l-2">
          <p className="text-lg lg:text-3xl font-hankook font-bold text-orange-600">
            IPSS
          </p>
          <p className="text-xs lg:text-xs text-zinc-500 font-bold tracking-wide font-hankook text-wrap w-32">
            Indonesia Plant Scorecard System
          </p>
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-10 rounded z-10 bg-white mt-20">
        <p className="text-lg font-semibold font-hankook">Login</p>
        <p className="text-xs font-hankook text-zinc-500">
          Sign in to your account
        </p>
        <LoginForm />
      </div>
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 overflow-hidden h-4/5 lg:h-full">
        <img
          src="/tech.jpg"
          alt="logo"
          width={200}
          height={100}
          className="w-full lg:h-fit h-full object-cover"
        />
      </div>
      <p className="absolute bottom-0 text-center p-5 text-xs text-zinc-700 bg-zinc-100 w-full font-hankook">
        Copyright © {new Date().getFullYear()} IP | Production Management Team
      </p>
    </main>
  );
}
