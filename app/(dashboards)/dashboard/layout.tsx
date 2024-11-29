import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BursaryLayout({ children }: {
    readonly children: React.ReactNode;
  }) {
    return (
      <SidebarProvider>
        <AppSidebar />
      <main className=" w-full">
        <div className="p-5 flex justify-between items-center">
        <SidebarTrigger className='size-4' />
        <Button asChild>
          <Link href="/">LogOut</Link>
        </Button>
        </div>
     
        {children}
      </main>
      </SidebarProvider>
    );
  }