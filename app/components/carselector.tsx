"use client";

import { useState } from "react";
import { CARS } from "../lib/data";

export function CarSelector({
  onSelect,
}: {
  onSelect: (carId: string) => void;
}) {
  const [selected, setSelected] = useState("");

  return (
    <div className="p-4">
      <label className="block mb-2 font-medium">Выберите машину</label>
      <select
        className="border rounded p-2 w-full"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          onSelect(e.target.value);
        }}
      >
        <option value="">-- выберите модель --</option>
        {CARS.map((car) => (
          <option key={car.id} value={car.id}>
            {car.brand} {car.model} ({car.generation}) — {car.engine}
          </option>
        ))}
      </select>
    </div>
  );
}