"use client";
import { createClient } from "@/supabase/client";
import React, { useState } from "react";

const HomePage = () => {
  const [from, setFromCity] = useState("");
  const [to, setToCity] = useState("");
  const [date, setDate] = useState("");
  const supabase = createClient();

  const fetchTickets = async () => {
    if (!from || !to || !date) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const { data, error } = await supabase
      .from("AvtoTicket")
      .select("*")
      .eq("from", from)
      .eq("to", to)
      .eq("date", date);

    if (error) {
      console.error("Xatolik:", error.message);
      return;
    }

    localStorage.setItem("selectedTicket", JSON.stringify(data));
    location.href = "/byticket";
    setFromCity("");
    setToCity("");
    setDate("");
  };

  return (
    <div className="home bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
          <div
            className="text-gray-900 text-2xl sm:text-3xl font-bold hover:cursor-pointer"
            onClick={() => (location.href = "/home")}
          >
            <span className="text-red-600">Auto</span>Ticket
          </div>

          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={() => (location.href = "/restoration")}
              className="bg-lime-600 text-white px-4 sm:px-6 py-2 rounded-lg shadow hover:bg-lime-700 transition duration-300 text-sm sm:text-base"
            >
              Chiptani tiklash
            </button>

            <button
              onClick={() => (location.href = "/admin")}
              className="bg-red-600 text-white px-4 sm:px-6 py-2 rounded-lg shadow hover:bg-red-700 transition duration-300 text-sm sm:text-base"
            >
              Admin Page
            </button>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center px-4 sm:px-6 pt-44 pb-10">
        <div className="bg-white bg-opacity-95 p-6 sm:p-10 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 text-center">
            Tez va ishonchli chipta izlash!
          </h2>

          <div className="flex flex-col gap-4">
            <select
              value={from}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            >
              <option value="" disabled>
                Qayerdan
              </option>
              {[
                "Toshkent",
                "Buxoro",
                "Farg'ona",
                "Xorazm",
                "Surxondaryo",
                "Jizzax",
                "Samarqand",
                "Navoiy",
                "Qashqadaryo",
                "Andijon",
                "Namangan",
                "Qoraqalpog'iston",
              ].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              value={to}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            >
              <option value="" disabled>
                Qayerga
              </option>
              {[
                "Toshkent",
                "Buxoro",
                "Farg'ona",
                "Xorazm",
                "Surxondaryo",
                "Jizzax",
                "Samarqand",
                "Navoiy",
                "Qashqadaryo",
                "Andijon",
                "Namangan",
                "Qoraqalpog'iston",
              ].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <input
              type="date"
              min="2025-03-01"
              max="2025-03-31"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />

            <button
              onClick={fetchTickets}
              className="mt-2 w-full bg-red-600 text-white py-3 rounded-md shadow hover:bg-red-700 transition duration-300 text-base font-medium"
            >
              Chipta izlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
