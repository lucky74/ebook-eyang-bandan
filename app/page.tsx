import FlipBookComponent from "@/components/FlipBook";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative">
      <FlipBookComponent />
      <div className="absolute bottom-4 text-center w-full z-10 pointer-events-none">
        <p className="text-[#D4C4A8] font-serif text-sm md:text-base tracking-widest drop-shadow-md opacity-80">
          Dibuat Oleh Lucky Zamaludin Malik
        </p>
      </div>
    </main>
  );
}
