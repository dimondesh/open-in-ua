"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { locations } from "@/data/locations";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleNavigation = () => {
      if (document.visibilityState === "visible") {
        const lastLocation = localStorage.getItem("currentLocation");
        let nextTap = "tap1";

        // кожен новий скан -> нове місце
        if (lastLocation && lastLocation.startsWith("tap")) {
          const currentNum = parseInt(lastLocation.replace("tap", ""), 10);
          const maxTaps = Object.keys(locations).length;

          if (!isNaN(currentNum)) {
            const nextNum = currentNum >= maxTaps ? 1 : currentNum + 1;
            nextTap = "tap" + nextNum;
          }
        }

        timeoutId = setTimeout(() => {
          const url = "/" + nextTap + "?t=" + Date.now();
          router.replace(url);
        }, 1000);
      }
    };

    if (document.visibilityState === "visible") {
      handleNavigation();
    }

    document.addEventListener("visibilitychange", handleNavigation);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleNavigation);
    };
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
