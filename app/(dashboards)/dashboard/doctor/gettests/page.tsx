"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { getAuthToken } from "@/actions/services/get-token";

type Customer = {
  id: number;
  firstname: string;
  lastname: string;
};

type Test = {
  id: number;
  testresults: string;
};

const API_URL = "http://localhost:1337";
const authToken = getAuthToken();

export default function CustomerTestPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [testData, setTestData] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/customers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setCustomers(data.data); 
        setFilteredCustomers(data.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to fetch customers.");
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search query
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

  const fetchTestData = async (customerId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}/api/tests?filters[customer][id][$eq]=${customerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch test data.");
      }

      const data = await response.json();
      setTestData(data.data); 
    } catch (err) {
      console.error("Error fetching test data:", err);
      setError("Failed to fetch test data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 w-full flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Search Customers and View Test Data</h1>

      {error && <div className="text-red-500">{error}</div>}

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
              onClick={() => {
                setSelectedCustomer(customer);
                fetchTestData(customer.id); 
              }}
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

      {/* Display Test Data */}
      {selectedCustomer && (
        <div className="w-full max-w-md flex flex-col gap-4 mt-6">
          <h2 className="text-lg font-semibold">
            Tests for:{" "}
            <span className="text-blue-500">
              {selectedCustomer.firstname} {selectedCustomer.lastname}
            </span>
          </h2>

          {loading ? (
            <div>Loading test data...</div>
          ) : testData.length > 0 ? (
            <ul className="bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-auto">
              {testData.map((test) => (
                <li key={test.id} className="p-2 border-b">
                  {test.testresults}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No test data available</div>
          )}
        </div>
      )}
    </div>
  );
}


