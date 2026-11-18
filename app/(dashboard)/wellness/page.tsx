import type { Metadata } from "next";
import BreakTimer from "@/features/wellness/components/BreakTimer";

export const metadata: Metadata = {
  title: "Wellness | Cozy Corner",
  description: "Optional wellness tools for a calm study routine.",
};

export default function WellnessPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 bg-[#FDFBF7] px-6 py-10">
      <h1 className="font-serif text-3xl font-semibold text-[#2C2420]">
        Wellness Check
      </h1>
      <p className="mt-2 mb-8 text-[#6B5E55]">
        Small, optional habits that make studying a little kinder.
      </p>

      <BreakTimer />
    </main>
  );
}
