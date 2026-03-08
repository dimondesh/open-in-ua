"use client";

import { useEffect, useState, use, useRef } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { locations } from "@/data/locations";

export default function LocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const location = locations[id];
  const [activeImage, setActiveImage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!location) {
      notFound();
    } else {
      // Запам'ятовуємо локацію при успішному скануванні QR-коду
      localStorage.setItem("currentLocation", id);
    }
  }, [id, location]);

  if (!location) return null;

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollPosition = scrollContainerRef.current.scrollLeft;
    const width = scrollContainerRef.current.clientWidth;
    const currentIndex = Math.round(scrollPosition / width);
    setActiveImage(currentIndex);
  };

  return (
    <main className="flex flex-col h-[100dvh] w-full max-w-[480px] mx-auto bg-white overflow-hidden text-zinc-900">
      {/* Блок фото (Співвідношення 4:3) */}
      <section className="relative w-full aspect-[4/3] shrink-0 bg-zinc-50">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {location.images.map((src, index) => (
            <div key={index} className="relative h-full min-w-full snap-center">
              <Image
                src={src}
                alt={`${location.title} - фото ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="(max-width: 480px) 100vw, 480px"
              />
            </div>
          ))}
        </div>

        {/* Індикатори (крапки) відображаються тільки якщо фото більше одного */}
        {location.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
            {location.images.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeImage === index
                    ? "w-4 bg-zinc-800"
                    : "w-1.5 bg-zinc-400/60"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Блок тексту (займає весь залишок екрану, без скролу) */}
      <section className="flex flex-col flex-grow p-6 sm:p-8 min-h-0">
        <h1 className="text-3xl font-light tracking-tight mb-4">
          {location.title}
        </h1>

        {/* Опис. Завдяки line-clamp він обріжеться красиво, якщо тексту забагато для екрану */}
        <p className="text-base text-zinc-600 leading-relaxed font-light flex-grow overflow-hidden text-ellipsis line-clamp-6">
          {location.description}
        </p>

        {/* Візуально відокремлений цікавий факт (Завжди притиснутий донизу) */}
        <div className="mt-4 bg-[#F8F8F8] rounded-2xl p-5 shrink-0">
          <span className="block text-[11px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">
            Цікавий факт
          </span>
          <p className="text-sm font-medium text-zinc-800 leading-snug">
            {location.fact}
          </p>
        </div>
      </section>
    </main>
  );
}
