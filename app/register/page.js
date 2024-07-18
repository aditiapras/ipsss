import { Toaster } from "sonner";
import SignUp from "@/components/form/sign-up";

export default function SignIn({ searchParams }) {
  const secret = searchParams.secret;

  return (
    <main className="grid grid-cols-2 min-h-screen bg-zinc-100 relative">
      <Toaster
        position="top-center"
        reverseOrder={false}
        closeButton
        richColors
      />
      <div className="w-full h-full relative lg:absolute lg:flex hidden">
        <div className="w-full h-full bg-zinc-100 lg:bg-zinc-100/30 z-10"></div>
        <img
          src="/tech.jpg"
          alt="technodome"
          className="w-full h-full object-cover lg:absolute"
        />
      </div>

      <p className="hidden lg:block">asdkh</p>
      <div className="w-full flex flex-col h-full bg-zinc-50 items-center justify-center shadow-md relative z-10 col-span-2 lg:col-span-1">
        <div className="w-full px-5 lg:px-10 flex lg:justify-end justify-start mt-5">
          <img
            src="/logo.png"
            alt="logo"
            width={200}
            height={100}
            className="lg:mb-5 w-[150px] place lg:w-[200px]"
          />
        </div>
        <div className="flex gap-3 items-center px-5 lg:px-10 mb-5 w-full mt-5">
          <p className="text-xl md:text-3xl font-bold text-orange-500 font-hankook ">
            IPSS
          </p>
          <p className="pl-3 border-l-2 border-zinc-400 text-xs md:text-base font-semibold text-zinc-500 font-hankook">
            Indonesia Plant Scorecard System
          </p>
        </div>
        <p className="w-full px-5 lg:px-10 font-hankook mb-5 font-semibold text-xl">
          Register
        </p>
        <SignUp secret={secret} />
        <p className="text-xs text-zinc-500 col-span-2 py-3 font-hankook">
          Copyright © {new Date().getFullYear()} IP) Production Management Team
        </p>
      </div>
    </main>
  );
}
