export interface Producer {
  id: string
  name: string
  document: string
  docType: "CNPJ" | "CPF"
  createdAt: string
  updatedAt: string
}

export interface Farm {
  id: string
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  // producer: Producer;
  producerId: string;
  // harvests: Harvest[];
  createdAt: string
  updatedAt: string
}

export interface Harvest {
  id: string
  farmId: string
  name: string
  status: 'PLANTED'| 'GROWING'| 'HARVESTED'| 'PLOWING'
  plantingDate: Date
  expectedHarvestDate: Date
  createdAt: string
  updatedAt: string
}

export interface Cultivation {
  id: string
  harvestId: string
  culture: string
  area: number
  plantingDate: Date
  expectedHarvestDate: Date
  status: 'PLANTED'| 'GROWING'| 'HARVESTED'| 'PLOWING'
  createdAt: string
  updatedAt: string
}

export interface DashboardStats {
  totalFarms: number
  totalCultivationArea: number
  cultivationsByType: Array<{
    cropType: string
    total: number
  }>
}
