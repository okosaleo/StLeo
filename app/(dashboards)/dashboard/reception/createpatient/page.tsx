"use client"
import { patientCreationAction } from "@/actions/create-customer";
import { StrapiErrors } from "@/components/custom/SrapiErrors";
import SubmitLoaders from "@/components/custom/SubmitLoaders";
import { ZodErrors } from "@/components/custom/ZodErrors";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

const INITIAL_STATE = {
    zodErrors: null,
    strapiErrors: null,
    data: null,
    message: null,
  };

export default function Receptionpage() {
    const [formState, formAction] = useActionState(patientCreationAction, INITIAL_STATE);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-20 w-full">
      <h1 className="font-sans text-4xl font-bold">Hello Reception &#128075;</h1>
      <div>
        <h3 className="text-2xl font-semibold font-sans text-gray-500"> Create Patients Details</h3>
        <form action={formAction}>
        <Card className="border-primary border-[3px]">
          <CardHeader className="font-sans font-bold">
            Create a new Patient
          </CardHeader>
          <CardContent>
                <div className="flex flex-col gap-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="firstname">First Name </Label>
                        <Input placeholder="Patient firstname" id="firstname" name="firstname" type="text" />
                        <ZodErrors  error={formState?.zodErrors?.firstname} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Last Name </Label>
                        <Input placeholder="Patient lastname" id="lastname" name="lastname" type="text" />
                        <ZodErrors  error={formState?.zodErrors?.lastname} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Patient Height</Label>
                        <Input placeholder="Subdirectory" id="height" name="height" type="text" />
                        <ZodErrors  error={formState?.zodErrors?.height} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Blood Pressure</Label>
                        <Input placeholder="Patient Blood Pressure" id="bloodpressure" name="bloodpressure" type="text" />
                        <ZodErrors  error={formState?.zodErrors?.bloodpressure} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Age</Label>
                        <Input placeholder="Patient Age" type="text" id="age" name="age" />
                        <ZodErrors  error={formState?.zodErrors?.age} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Weight</Label>
                        <Input placeholder="Patient Weight" id="weight" name="weight" type="text" />
                        <ZodErrors  error={formState?.zodErrors?.weight} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Is this an emergency!</Label>
                        <Input placeholder="Subdirectory" id="emergency" name="emergency" type="text" />
                        <ZodErrors  error={formState?.zodErrors?.emergency} />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <SubmitLoaders text="Create Patient" />
                <StrapiErrors error={formState?.strapiErrors} />
            </CardFooter>
           
        </Card>
        </form>
      </div>
    </div>
  )
}
