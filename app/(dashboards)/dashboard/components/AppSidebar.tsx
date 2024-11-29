import {Home, Hospital, Receipt, Stethoscope, TestTubeDiagonal, } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    id: 1,
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    id: 2,
    title: "Reception",
    url: "/dashboard/reception",
    icon: Hospital,
  },
  {
    id: 3,
    title: "Doctor",
    url: "/dashboard/doctor",
    icon: Stethoscope,
  },
  {
    id: 4,
    title: "Lab",
    url: "/dashboard/lab",
    icon: TestTubeDiagonal,
  },
  {
    id: 5,
    title: "Bursary",
    url: "/dashboard/totalIncome",
    icon: Receipt,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-primary">
     <SidebarHeader className="font-sans text-4xl font-extrabold text-primary border-b-2 border-primary">St. Leonard</SidebarHeader>
     <SidebarContent>
        <SidebarMenu className="mt-4 p-5">
            {items.map((item) => (
                <Link key={item.id} href={item.url} className="py-2 flex flex-row items-center text-primary font-sans gap-2 font-bold hover:text-primary/50">
                    <item.icon />
                    <p>{item.title}</p>
                </Link>
            ))}
        </SidebarMenu>
     </SidebarContent>
    </Sidebar>
  )
}
