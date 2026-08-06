import { CARS } from "../lib/data";

export function Calculator({
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
    <div className="p-4 bg-orange-50 rounded">
      <p className="font-medium">
        Найдено дефектов: {defects.length}
      </p>
      <p className="text-xl font-bold">
        Оценочная стоимость ремонта: {total.toLocaleString("cs-CZ")} Kč
      </p>
    </div>
  );
}