"use client"
import Lottie from "lottie-react"
import ani from "../../public/Image/lot.json"

interface iAppProps {
    text: string;
}

export default function SuccessMessage({text}: iAppProps) {
  return (
    <div className="py-24 px-10 flex flex-col justify-center items-center " >
        <h3 className="md:text-4xl text-2xl font-semibold font-sans">{text}</h3>
        <div>
        <Lottie animationData={ani} className="w-[30vh] h-[30vh]"/>
        </div>
    </div>
  )
}
