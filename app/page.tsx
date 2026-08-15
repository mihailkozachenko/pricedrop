"use client";

import { useState } from "react";
import { CarSelector } from "./components/carselector";
import { Checklist } from "./components/checklist";
import { Calculator } from "./components/calculator";
import { Report } from "./components/report";

export default function Home() {
  const [carId, setCarId] = useState("");
  const [defectIds, setDefectIds] = useState<string[]>([]);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex w-full max-w-3xl flex-col gap-4 py-12 px-6">
        <h1 className="text-2xl font-bold">Оценка состояния авто</h1>
        <CarSelector
          onSelect={(id) => {
            setCarId(id);
            setDefectIds([]);
          }}
        />
        <Checklist carId={carId} onChange={setDefectIds} />
        <Calculator carId={carId} defectIds={defectIds} />
        <Report carId={carId} defectIds={defectIds} />
      </main>
    </div>
  );
}
