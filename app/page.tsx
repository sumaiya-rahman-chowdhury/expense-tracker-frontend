import RegisterPage from "@/components/RegisterForm";
import React from "react";

function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-900">
          Expense Tracker
        </h1>
        <p className="mb-6 text-center text-gray-600 font-semibold">
          Create your account to start managing expenses
        </p>
        <RegisterPage />
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-800 transition"
          >
            Login here
          </a>
        </p>
      </div>
    </main>
  );
}

export default Page;
