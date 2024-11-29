import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./get-token";





interface PatientCreationProps {
    firstname: string;
    lastname: string;
  }
const baseUrl = getStrapiURL();


export async function fetchPatients(userData: PatientCreationProps) {
  const authToken =  getAuthToken();
    const url = new URL("/api/customers", baseUrl);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({data: {...userData}}),
        cache: "no-cache",
      });
      if (!res.ok) throw new Error("Failed to fetch patients");
      const data = await res.json();
      return data.data;
  }