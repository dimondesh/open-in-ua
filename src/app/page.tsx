"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const lastLocation = localStorage.getItem("currentLocation");

    if (lastLocation) {
      router.replace(`/${lastLocation}`);
    } else {
      router.replace("/tap1");
    }
  }, [router]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#ECD6C7]">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-[#5A4A40] animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-[#5A4A40] animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-[#5A4A40] animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
}
