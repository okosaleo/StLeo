import { SigninForm } from "@/components/forms/SIgnInForm";


export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="font-sans font-bold text-4xl ">Login page for St. Leonard&apos;s staff</h2>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-3xl font-sans font-semibold">Sign In</h3>
        <SigninForm />
      </div>
    </div>
  )
}
