"use client";

import { useState } from "react";
import { CARS } from "../../lib/data";

export function Checklist({
  carId,
  onChange,
}: {
  carId: string;
  onChange: (defectIds: string[]) => void;
}) {
  const [checked, setChecked] = useState<string[]>([]);

  const car = CARS.find((c) => c.id === carId);

  if (!car) {
    return <p className="p-4 text-gray-500">Сначала выберите машину</p>;
  }

  function toggleDefect(id: string) {
    const next = checked.includes(id)
      ? checked.filter((d) => d !== id)
      : [...checked, id];
    setChecked(next);
    onChange(next);
  }

  return (
    <div className="p-4">
      <h2 className="font-medium mb-2">
        Частые болячки: {car.brand} {car.model}
      </h2>
      {car.commonDefects.map((defect) => (
        <label key={defect.id} className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            checked={checked.includes(defect.id)}
            onChange={() => toggleDefect(defect.id)}
          />
          {defect.name}
        </label>
      ))}
    </div>
  );
}