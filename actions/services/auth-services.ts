import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./get-token";

interface LoginUserProps {
    identifier: string;
    password: string;
  }
const baseUrl = getStrapiURL();

export async function loginUserService(userData: LoginUserProps) {
    const url = new URL("/api/auth/local", baseUrl);
    const authToken =  getAuthToken();
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ ...userData }),
        cache: "no-cache",
      });
  
      return response.json();
    } catch (error) {
      console.error("Login Service Error:", error);
      throw error;
    }
  }