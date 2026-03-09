"use client";

import { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { locations } from "@/data/locations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function LocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const location = locations[id];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!location) {
      notFound();
    } else {
      localStorage.setItem("currentLocation", id);
    }
  }, [id, location]);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  if (!location) return null;

  return (
    <main className="flex flex-col h-dvh w-full max-w-120 mx-auto bg-white overflow-hidden text-zinc-900">
      <section className="relative w-full shrink-0 bg-white">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {location.images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full aspect-4/3 overflow-hidden bg-zinc-50 shadow-sm border-zinc-100">
                  <Image
                    src={src}
                    alt={`${location.title} - фото ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-contain"
                    sizes="(max-width: 480px) 100vw, 480px"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {location.images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {location.images.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === index ? "w-4 bg-zinc-800" : "w-1.5 bg-zinc-200"
                }`}
                aria-label={`Перейти до фото ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col grow px-6 pt-5 pb-8 sm:px-8 min-h-0">
        <h1 className="text-3xl font-light tracking-tight mb-3">
          {location.title}
        </h1>

        <p className="text-base text-zinc-600 leading-relaxed font-light grow overflow-hidden text-ellipsis line-clamp-6">
          {location.description}
        </p>

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
