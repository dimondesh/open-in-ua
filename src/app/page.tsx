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
    <div className="flex min-h-[100dvh] items-center justify-center bg-white">
      <div className="animate-pulse text-zinc-400">Завантаження...</div>
    </div>
  );
}
