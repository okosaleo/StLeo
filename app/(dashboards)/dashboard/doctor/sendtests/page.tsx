"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getAuthToken } from "@/actions/services/get-token";

type Customer = {
  id: number;
  firstname: string;
  lastname: string;
};

const API_URL = "http://localhost:1337"; 
const authToken = getAuthToken();

export default function CustomerTestPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [testData, setTestData] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch customers on mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/customers?populate=tests`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch customers: ${response.status}`);
        }

        const data = await response.json();
        const mappedCustomers = data.data.map((customer: any) => ({
          id: customer.id,
          firstname: customer.firstname,
          lastname: customer.lastname,
        }));
        setCustomers(mappedCustomers);
        setFilteredCustomers(mappedCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on query
  useEffect(() => {
    const filtered = query
      ? customers.filter((customer) =>
          `${customer.firstname} ${customer.lastname}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : customers;

    setFilteredCustomers(filtered);
  }, [query, customers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCustomer) {
      setMessage("Please select a customer.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/tests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          data: {
            customerstests: testData,
            customer: selectedCustomer.id, 
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add test data.");
      }

      setMessage("Test data added successfully!");
      setTestData("");
      setSelectedCustomer(null);
    } catch (error) {
      console.error("Error submitting test data:", error);
      setMessage("Error submitting test data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 w-full flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Assign Test to Customer</h1>

      {message && (
        <div
          className={`text-${
            message.includes("Error") ? "red" : "green"
          }-500`}
        >
          {message}
        </div>
      )}

      {/* Search Customers */}
      <div className="w-full max-w-md flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Search customers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Display Filtered Customers */}
        <ul className="w-full bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-auto">
          {filteredCustomers.map((customer) => (
            <li
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${
                selectedCustomer?.id === customer.id ? "bg-gray-200" : ""
              }`}
            >
              {customer.firstname} {customer.lastname}
            </li>
          ))}
          {filteredCustomers.length === 0 && (
            <li className="p-2 text-gray-500">No customers found</li>
          )}
        </ul>
      </div>

      {/* Test Input Form */}
      {selectedCustomer && (
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
          <h2 className="text-lg font-semibold">
            Assigning test to:{" "}
            <span className="text-blue-500">
              {selectedCustomer.firstname} {selectedCustomer.lastname}
            </span>
          </h2>

          <label className="flex flex-col">
            Test Details:
            <Textarea
              value={testData}
              onChange={(e) => setTestData(e.target.value)}
              placeholder="Enter test details..."
              required
            />
          </label>

          <Button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
}



