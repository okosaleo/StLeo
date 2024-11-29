import Image from "next/image";
import Link from "next/link";

async function getData (path: string) {
  const baseURL = "http://localhost:1337";
  try {
    const response = await fetch(baseURL + path)
    const data = await response.json();
    return data
   } catch (error) {
    console.log(error)
   }
}
export default async function Home() {
  const strapiData = await getData("/api/home")

  return (
   <main className=" flex items-center justify-center">
    <div className="relative w-full h-screen blur-[2px] bg-black/90 ">
      <Image src="/Image/ww.jpg" alt="St. Leo's Workers" className="object-cover" fill />
    </div>
    <div className="z-10 absolute flex items-center flex-col">
      <h1 className="font-sans text-foreground text-5xl font-bold">{strapiData.data.title}</h1>
      <p>{strapiData.data.Description}</p>
      <div className="flex flex-row gap-2 justify-center">
      <Link href="/login" className="bg-foreground font-sans rounded-md text-white p-2" >Login</Link>
      <Link href="/createUser" className="bg-foreground font-sans rounded-md text-white p-2" >Create new staff</Link>
      </div>
    </div>
   </main>
  );
}
