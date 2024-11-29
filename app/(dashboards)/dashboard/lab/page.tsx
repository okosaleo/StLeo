import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";


export default function LabPage() {
  return (
    <div className="p-10 w-full h-screen flex flex-col ">
      <div className="flex flex-col items-center justify-center gap-10 w-full">
        <div className="flex flex-row">
        <h1 className="font-sans text-3xl md:text-5xl font-bold">Hello LabTechnicians &#128075;</h1>
        </div>
        <div className="w-full flex md:flex-row flex-col gap-6 items-center md:justify-evenly">
          <Card className="md:w-[400px] w-[290px]">
            <CardHeader>
            <CardTitle>Give Patients Tests.</CardTitle>
            <CardDescription>Use this Link to a Patient&apos;s test result</CardDescription>
            </CardHeader>
            <CardContent className="relative w-full h-[270px] rounded-b-md mb-4">
              <Image src="/Image/patient.jpg" fill alt="" className="object-cover" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
              <Link href="/dashboard/lab/sendtests">Send Tests
              </Link>
              </Button>
            
            </CardFooter>
          </Card>
          <Card className="md:w-[400px] w-[290px]">
            <CardHeader>
            <CardTitle>Retrieve New Tests</CardTitle>
            <CardDescription>Use this Link to get new tests for patients.</CardDescription>
            </CardHeader>
            <CardContent className="relative w-full h-[270px] rounded-b-md mb-4">
              <Image src="/Image/all.jpg" fill alt="" className="object-cover" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
              <Link href="/dashboard/lab/getnewTests">Get Test Results
              </Link>
              </Button>
            
            </CardFooter>
          </Card>
          
        </div>
      </div>
    </div>
  )
}