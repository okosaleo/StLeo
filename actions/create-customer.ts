"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { patientCreationService } from "./services/patientcreation";
import { redirect } from "next/navigation";


const patientsCreation = z.object({
    firstname: z
      .string()
      .min(3, {
        message: "firstname must have at least 3 or more characters",
      })
      .max(29, {
        message: "Characters too long",
      }),
      lastname: z
      .string()
      .min(3, {
        message: "firstname must have at least 3 or more characters",
      })
      .max(29, {
        message: "Characters too long",
      }),
    height: z
      .string()
      .min(2, {
        message: "Please input patient's height",
      })
      .max(100, {
        message: "characters are too long",
      }),
      weight: z
      .string()
      .min(2, {
        message: "Please input patient's height",
      })
      .max(30, {
        message: "characters are too long",
      }),
      age: z
      .string()
      .min(2, {
        message: "You haven't put in the patient's age",
      })
      .max(40, {
        message: "Characters are too long",
      }),
      bloodpressure: z
      .string()
      .min(2, {
        message: "You haven't put in the patient's blood pressure",
      })
      .max(100, {
        message: "Characters are too long",
      }),
      emergency: z
      .string()
      .min(2, {
        message: "Only is thiss a serious case do you input true",
      })
      .max(100, {
        message: "Characters are too long",
      }),
  });


  export async function patientCreationAction(prevState: any, formData: FormData) {
    const validatedFields = patientsCreation.safeParse({
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      height: formData.get("height"),
      bloodpressure: formData.get("bloodpressure"),
      age: formData.get("age"),
      weight: formData.get("weight"),
      emergency: formData.get("emergency"),
    });
  
    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        strapiErrors: null,
        message: "Missing Fields. Failed to Register.",
      };
    }
  
    const responseData = await patientCreationService(validatedFields.data);
  
    if (!responseData) {
      return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: "Ops! Something went wrong. Please try again.",
      };
    }
  
    if (responseData.error) {
      return {
        ...prevState,
        strapiErrors: responseData.error,
        zodErrors: null,
        message: "Failed to Register.",
      };
    };
    (await cookies()).set("jwt", responseData.jwt);
    redirect("/dashboard/reception/createduser");
  }

