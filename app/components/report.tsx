import { CARS } from "../../lib/data";

export function Report({
  carId,
  defectIds,
}: {
  carId: string;
  defectIds: string[];
}) {
  const car = CARS.find((c) => c.id === carId);

  if (!car || defectIds.length === 0) {
    return null;
  }

  const defects = car.commonDefects.filter((d) => defectIds.includes(d.id));
  const total = defects.reduce((sum, d) => sum + d.repairCost, 0);

  return (
    <div className="p-6 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-bold mb-2">
        Отчёт по осмотру: {car.brand} {car.model} ({car.generation})
      </h2>
      <ul className="mb-3 list-disc pl-5">
        {defects.map((d) => (
          <li key={d.id}>
            {d.name} — {d.repairCost.toLocaleString("cs-CZ")} Kč
          </li>
        ))}
      </ul>
      <p className="font-semibold">
        Найдено {defects.length} дефектов. Оценочная стоимость устранения —{" "}
        {total.toLocaleString("cs-CZ")} Kč
      </p>
    </div>
  );
}