"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { getAuthToken } from "@/actions/services/get-token";

export default function GetPatientsPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = "http://localhost:1337";
    const url = new URL("/api/customers", baseUrl);

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = getAuthToken();
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const search = (data) => {
    return data.data.filter((item) => item.firstname.toLowerCase().includes(query) || item.lastname.toLowerCase().includes(query))
  }


  return (
    <div className="p-10 w-full flex flex-col items-center gap-4">
      <h1 className="font-sans font-semibold text-3xl">Search for patients here</h1>
      <Input
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      {loading ? <div>Loading...</div> : <DataTable data={search(data)} />}
    </div>
  );
}
