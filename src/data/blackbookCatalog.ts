export interface BlackbookProduct {
  id:
    | "blackbook-01"
    | "blackbook-02"
    | "blackbook-03"
    | "blackbook-complete-system";
  title: string;
  fit: string;
  pageCount: number;
  packCount: number;
  packName: string;
  priceUsd: number;
  imagePath: string;
  imageOrientation: "portrait" | "landscape";
  roadmapDays?: number;
  gumroadUrl?: string;
}

interface BlackbookGumroadEnvironment {
  VITE_GUMROAD_BLACKBOOK_01_URL?: string;
  VITE_GUMROAD_BLACKBOOK_02_URL?: string;
  VITE_GUMROAD_BLACKBOOK_03_URL?: string;
  VITE_GUMROAD_BLACKBOOK_COMPLETE_SYSTEM_URL?: string;
}

const optionalUrl = (value?: string) => {
  const url = value?.trim();
  return url || undefined;
};

export const createBlackbookCatalog = (
  environment: BlackbookGumroadEnvironment,
): readonly BlackbookProduct[] => [
  {
    id: "blackbook-01",
    title: "BLACKBOOK 01 · AI ENGINEER",
    fit: "Para ordenar modelos, contexto, delegación, memoria y verificación antes de depender de chats sueltos.",
    pageCount: 68,
    packCount: 17,
    packName: "AI Engineer Starter Kit",
    priceUsd: 49,
    imagePath: "/blackbook/blackbook-01-ai-engineer.png",
    imageOrientation: "portrait",
    gumroadUrl: optionalUrl(environment.VITE_GUMROAD_BLACKBOOK_01_URL),
  },
  {
    id: "blackbook-02",
    title: "BLACKBOOK 02 · AGENTIC CODING",
    fit: "Para convertir una petición en un cambio de software aislado, revisado, probado y listo para decisión humana.",
    pageCount: 71,
    packCount: 34,
    packName: "Agentic Coding Harness Kit",
    priceUsd: 49,
    imagePath: "/blackbook/blackbook-02-agentic-coding.png",
    imageOrientation: "portrait",
    gumroadUrl: optionalUrl(environment.VITE_GUMROAD_BLACKBOOK_02_URL),
  },
  {
    id: "blackbook-03",
    title: "BLACKBOOK 03 · INFRAESTRUCTURA DE AGENTES",
    fit: "Para operar agentes con runtime, seguridad, estado, observabilidad y una ruta de recuperación clara.",
    pageCount: 72,
    packCount: 22,
    packName: "Agent Infra Ops Kit",
    priceUsd: 49,
    imagePath: "/blackbook/blackbook-03-infraestructura-agentes.png",
    imageOrientation: "portrait",
    gumroadUrl: optionalUrl(environment.VITE_GUMROAD_BLACKBOOK_03_URL),
  },
  {
    id: "blackbook-complete-system",
    title: "BLACKBOOK COMPLETE SYSTEM",
    fit: "Las tres capas en una sola ruta: entender y dirigir IA, construir con agentes y mantener la operación bajo control.",
    pageCount: 211,
    packCount: 73,
    packName: "Packs de los tres BLACKBOOK",
    priceUsd: 129,
    imagePath: "/blackbook/blackbook-complete-system.png",
    imageOrientation: "landscape",
    roadmapDays: 90,
    gumroadUrl: optionalUrl(environment.VITE_GUMROAD_BLACKBOOK_COMPLETE_SYSTEM_URL),
  },
];

export const blackbookCatalog = createBlackbookCatalog(import.meta.env);
