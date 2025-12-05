"use client"; // because we’ll use state

import { useEffect, useState } from "react";
import { User } from "../types/User";
import { getUsers } from "../lib/api";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {users.map((user) => (
        <div key={user.id} className="p-4 border rounded-md shadow-md mb-2">
          <p className="font-semibold">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ))}
    </div>
  );
}
