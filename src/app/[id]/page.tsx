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
    <div className="md:min-h-dvh md:flex md:items-center md:justify-center md:bg-[#ECD6C7] md:p-6">
      <main
        className="flex flex-col md:flex-row h-dvh md:h-[680px] w-full max-w-[480px] md:max-w-5xl mx-auto overflow-hidden text-[#3E2C20] md:rounded-[2rem] md:shadow-2xl md:border md:border-[#D5CABB] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundColor: "#ECD6C7",
        }}
      >
        <section className="relative w-full md:w-1/2 shrink-0 md:flex md:flex-col md:justify-center md:border-r md:border-[#D5CABB]/40 md:p-12">
          <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {location.images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full aspect-4/3 overflow-hidden shadow-sm md:rounded-2xl">
                    <Image
                      src={src}
                      alt={location.title + " - фото " + (index + 1)}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {location.images.length > 1 && (
            <div className="flex justify-center gap-2 mt-6 md:mt-10">
              {location.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-5 bg-[#5A4A40]"
                      : "w-1.5 bg-[#D5CABB]"
                  }`}
                  aria-label={"Перейти до фото " + (index + 1)}
                />
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-col grow px-5 pt-6 pb-12 md:w-1/2 md:justify-center md:p-14 overflow-y-auto">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 md:mb-8 text-center md:text-left text-[#3E2C20]">
            {location.title}
          </h1>

          <p className="text-base md:text-lg text-[#5A4A40] leading-relaxed font-light text-center md:text-left mb-8 max-w-[55ch] mx-auto md:mx-0">
            {location.description}
          </p>

          <div className="flex flex-col items-center mt-auto shrink-0">
            <div className="flex items-center justify-center text-[#A68A73] mb-6 space-x-4 opacity-70 w-full">
              <span className="h-[1px] w-12 sm:w-16 bg-[#A68A73]/40"></span>
              <span className="text-xl">❦</span>
              <span className="h-[1px] w-12 sm:w-16 bg-[#A68A73]/40"></span>
            </div>

            <p className="text-sm md:text-[15px] font-normal text-[#5A4A40]/80 leading-relaxed text-center w-full md:w-[90%]">
              {location.fact}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
