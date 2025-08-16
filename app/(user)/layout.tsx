import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (fixed width on desktop, collapsible on mobile) */}
      <div className=" md:block md:w-64 fixed left-0 top-0 h-full border-r bg-white shadow-sm">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
