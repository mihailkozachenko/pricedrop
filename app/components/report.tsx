import { CARS } from "../../lib/data";

const SEVERITY_MAP = {
  high: { label: "Критично", cls: "bg-red-100 text-red-700 border-red-200" },
  medium: { label: "Важно", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  low: { label: "Мелкий", cls: "bg-green-100 text-green-700 border-green-200" },
} as const;

function CarIcon() {
  return (
    <svg viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-6 text-white">
      <path
        d="M4 20h56M8 20l6-10h26l6 10M14 20v4a2 2 0 004 0v-4M46 20v4a2 2 0 004 0v-4"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="18" cy="24" r="3" fill="currentColor" />
      <circle cx="46" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

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
    <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-600 px-6 py-5 flex items-center gap-4">
        <div className="flex-shrink-0 bg-white/10 rounded-xl p-3">
          <CarIcon />
        </div>
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-0.5">
            Отчёт по осмотру
          </p>
          <h2 className="text-white text-xl font-bold leading-tight">
            {car.brand} {car.model}
          </h2>
          <p className="text-slate-300 text-sm">{car.generation}</p>
        </div>
      </div>

      {/* Car info grid */}
      <div className="px-6 py-4 grid grid-cols-2 gap-3 bg-slate-50 border-b border-slate-100">
        {[
          { label: "Марка", value: car.brand },
          { label: "Модель", value: car.model },
          { label: "Поколение", value: car.generation },
          { label: "Двигатель", value: car.engine },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">{label}</p>
            <p className="text-sm font-semibold text-slate-700 mt-0.5">{value}</p>
          </div>
        ))}
      </div>

      {/* Defects section */}
      <div className="px-6 py-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Выявленные дефекты
        </h3>
        <div className="space-y-2">
          {defects.map((d) => {
            const sev = d.severity ? SEVERITY_MAP[d.severity] : null;
            return (
              <div
                key={d.id}
                className="flex items-start justify-between gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-slate-800">{d.name}</span>
                    {sev && (
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${sev.cls}`}>
                        {sev.label}
                      </span>
                    )}
                  </div>
                  {d.partPrice != null && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      Запчасть: {d.partPrice.toLocaleString("cs-CZ")} Kč
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-slate-800">
                    {d.repairCost.toLocaleString("cs-CZ")} Kč
                  </p>
                  <p className="text-[11px] text-slate-400">ремонт</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total block */}
      <div className="mx-6 mb-6 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
            Итого дефектов
          </p>
          <p className="text-white text-2xl font-extrabold mt-0.5">
            {defects.length}
          </p>
        </div>
        <div className="w-px h-10 bg-white/20" />
        <div className="text-right">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
            Стоимость устранения
          </p>
          <p className="text-amber-400 text-2xl font-extrabold mt-0.5">
            {total.toLocaleString("cs-CZ")} Kč
          </p>
        </div>
      </div>
    </div>
  );
}
