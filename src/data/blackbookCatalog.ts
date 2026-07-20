export interface BlackbookProduct {
  id: "blackbook-01" | "blackbook-02" | "blackbook-03";
  title: string;
  fit: string;
  pageCount: number;
  packCount: number;
  packName: string;
  priceUsd: number;
  imagePath: string;
  gumroadUrl?: string;
}

interface BlackbookGumroadEnvironment {
  VITE_GUMROAD_BLACKBOOK_01_URL?: string;
  VITE_GUMROAD_BLACKBOOK_02_URL?: string;
  VITE_GUMROAD_BLACKBOOK_03_URL?: string;
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
    fit: "Para elegir modelos, evaluar fine-tuning y trazar una ruta técnica con criterios verificables.",
    pageCount: 65,
    packCount: 15,
    packName: "AI Engineer Starter Kit",
    priceUsd: 49,
    imagePath: "/blackbook/blackbook-01-ai-engineer.png",
    gumroadUrl: optionalUrl(environment.VITE_GUMROAD_BLACKBOOK_01_URL),
  },
  {
    id: "blackbook-02",
    title: "BLACKBOOK 02 · AGENTIC CODING",
    fit: "Para preparar repositorios, contratos y evidencia antes de delegar código a un agente.",
    pageCount: 67,
    packCount: 34,
    packName: "Agentic Coding Harness Kit",
    priceUsd: 49,
    imagePath: "/blackbook/blackbook-02-agentic-coding.png",
    gumroadUrl: optionalUrl(environment.VITE_GUMROAD_BLACKBOOK_02_URL),
  },
  {
    id: "blackbook-03",
    title: "BLACKBOOK 03 · INFRAESTRUCTURA DE AGENTES",
    fit: "Para diseñar cómo ejecutar, observar y recuperar agentes con límites operativos claros.",
    pageCount: 68,
    packCount: 22,
    packName: "Agent Infra Ops Kit",
    priceUsd: 49,
    imagePath: "/blackbook/blackbook-03-infraestructura-agentes.png",
    gumroadUrl: optionalUrl(environment.VITE_GUMROAD_BLACKBOOK_03_URL),
  },
];

export const blackbookCatalog = createBlackbookCatalog(import.meta.env);
