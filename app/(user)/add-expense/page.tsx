import AddExpenseForm from "@/components/AddExpenseForm";
import React from "react";

function Page() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6">
        <AddExpenseForm/>
      </div>
    </main>
  );
}

export default Page;
