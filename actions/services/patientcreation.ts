import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./get-token";






interface PatientCreationProps {
    firstname: string;
    lastname: string;
    height: string;
    weight: string;
    bloodpressure: string;
    age: string;
    emergency: string;
  }
const baseUrl = getStrapiURL();


export async function patientCreationService(userData: PatientCreationProps) {
  const authToken =  getAuthToken();
    const url = new URL("/api/customers", baseUrl);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({data: {...userData}}),
        cache: "no-cache",
      });
      console.log(userData)
      return response.json();
    } catch (error) {
      console.error("User Creation Error:", error);
      throw error;
    }
  }


