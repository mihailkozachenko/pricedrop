export type Defect = {
  id: string;
  name: string;
  repairCost: number; // в Kč
};

export type CarModel = {
  id: string;
  brand: string;
  model: string;
  generation: string;
  engine: string;
  commonDefects: Defect[];
};

export const CARS: CarModel[] = [
  {
    id: "skoda-octavia-2-tdi",
    brand: "Škoda",
    model: "Octavia",
    generation: "II (2004–2013)",
    engine: "1.9 TDI",
    commonDefects: [
      { id: "dpf", name: "Забитый сажевый фильтр (DPF)", repairCost: 15000 },
      { id: "turbo", name: "Износ турбины", repairCost: 20000 },
      { id: "injectors", name: "Проблемы с форсунками", repairCost: 12000 },
    ],
  },
  {
    id: "vw-passat-b6",
    brand: "Volkswagen",
    model: "Passat",
    generation: "B6 (2005–2010)",
    engine: "2.0 TDI",
    commonDefects: [
      { id: "dsg", name: "Износ сцепления DSG", repairCost: 35000 },
      { id: "ac-clutch", name: "Отказ муфты кондиционера", repairCost: 8000 },
      { id: "timing-chain", name: "Растяжение цепи ГРМ", repairCost: 18000 },
    ],
  },
];