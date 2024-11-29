import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";


export default function Receptionpage() {
  return (
    <div className="p-10 w-full h-screen flex flex-col ">
      <div className="flex flex-col items-center justify-center gap-10 w-full">
        <h1 className="font-sans text-3xl md:text-5xl font-bold">Hello Reception &#128075;</h1>
        <div className="w-full flex md:flex-row flex-col gap-6 items-center md:justify-evenly">
          <Card className="md:w-[400px] w-[290px]">
            <CardHeader>
            <CardTitle>Create a new Patient Here.</CardTitle>
            <CardDescription>Use this Link to Create a new Patient</CardDescription>
            </CardHeader>
            <CardContent className="relative w-full h-[270px] rounded-b-md mb-4">
              <Image src="/Image/patient.jpg" fill alt="" className="object-cover" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
              <Link href="/dashboard/reception/createpatient">Create new Patient
              </Link>
              </Button>
            
            </CardFooter>
          </Card>
          <Card className="md:w-[400px] w-[290px]">
            <CardHeader>
            <CardTitle>Get List and Details of all Patients</CardTitle>
            <CardDescription>Use this Link to get all patient details</CardDescription>
            </CardHeader>
            <CardContent className="relative w-full h-[270px] rounded-b-md mb-4">
              <Image src="/Image/all.jpg" fill alt="" className="object-cover" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
              <Link href="/dashboard/reception/getallpatients">Get Details of all Patients
              </Link>
              </Button>
            
            </CardFooter>
          </Card>
          
        </div>
      </div>
    </div>
  )
}
