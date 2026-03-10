import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#ECD6C7] p-6">
      <main
        className="flex flex-col items-center justify-center w-full max-w-[480px] md:max-w-xl overflow-hidden text-[#3E2C20] rounded-[2rem] shadow-2xl border border-[#D5CABB] bg-cover bg-center p-12 md:p-16 text-center"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundColor: "#ECD6C7",
        }}
      >
        <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-2 text-[#3E2C20]">
          404
        </h1>

        {/* Декоративний розділювач */}
        <div className="flex items-center justify-center text-[#A68A73] my-6 space-x-4 opacity-70 w-full">
          <span className="h-[1px] w-12 sm:w-16 bg-[#A68A73]/40"></span>
          <span className="text-xl">❦</span>
          <span className="h-[1px] w-12 sm:w-16 bg-[#A68A73]/40"></span>
        </div>

        <h2 className="text-2xl md:text-3xl font-medium mb-4 text-[#3E2C20]">
          Локацію не знайдено
        </h2>

        <p className="text-base md:text-lg text-[#5A4A40] leading-relaxed font-light mb-10">
          Здається, ви заблукали. Такої сторінки або локації на нашій карті поки
          що немає.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-[#A68A73] rounded-full text-[#5A4A40] font-medium hover:bg-[#5A4A40] hover:text-[#ECD6C7] transition-all duration-300"
        >
          Повернутися на головну
        </Link>
      </main>
    </div>
  );
}
