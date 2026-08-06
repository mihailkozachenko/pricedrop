"use client";

import { useRef } from "react";
import { CARS } from "../lib/data";

export function Report({
  carId,
  defectIds,
}: {
  carId: string;
  defectIds: string[];
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const car = CARS.find((c) => c.id === carId);

  if (!car || defectIds.length === 0) {
    return null;
  }

  const defects = car.commonDefects.filter((d) => defectIds.includes(d.id));
  const total = defects.reduce((sum, d) => sum + d.repairCost, 0);

  async function handleDownloadPDF() {
    if (!contentRef.current) return;

    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(contentRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`report-${car!.id}.pdf`);
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow">
      <div ref={contentRef} className="bg-white">
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
      <button
        onClick={handleDownloadPDF}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Скачать PDF
      </button>
    </div>
  );
}
