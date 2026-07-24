import { describe, expect, it } from "vitest";
import { createBlackbookCatalog } from "@/data/blackbookCatalog";

describe("blackbookCatalog", () => {
  it("keeps the verified RC.1 product, page, pack, and price counts", () => {
    const catalog = createBlackbookCatalog({});

    expect(catalog).toHaveLength(4);
    expect(catalog.map(({ pageCount }) => pageCount)).toEqual([68, 71, 72, 211]);
    expect(catalog.map(({ packCount }) => packCount)).toEqual([17, 34, 22, 73]);
    expect(catalog.map(({ priceUsd }) => priceUsd)).toEqual([49, 49, 49, 129]);
    expect(catalog.at(-1)).toMatchObject({
      id: "blackbook-complete-system",
      title: "BLACKBOOK COMPLETE SYSTEM",
      roadmapDays: 90,
      imagePath: "/blackbook/blackbook-complete-system.png",
    });
  });

  it("keeps checkout URLs undefined when environment variables are absent", () => {
    const catalog = createBlackbookCatalog({});

    expect(catalog.every(({ gumroadUrl }) => gumroadUrl === undefined)).toBe(true);
  });

  it("maps each approved Gumroad environment variable to only its product", () => {
    const catalog = createBlackbookCatalog({
      VITE_GUMROAD_BLACKBOOK_01_URL: "https://example.com/blackbook-01",
      VITE_GUMROAD_BLACKBOOK_02_URL: "https://example.com/blackbook-02",
      VITE_GUMROAD_BLACKBOOK_03_URL: "https://example.com/blackbook-03",
      VITE_GUMROAD_BLACKBOOK_COMPLETE_SYSTEM_URL: "https://example.com/complete-system",
    });

    expect(catalog.map(({ gumroadUrl }) => gumroadUrl)).toEqual([
      "https://example.com/blackbook-01",
      "https://example.com/blackbook-02",
      "https://example.com/blackbook-03",
      "https://example.com/complete-system",
    ]);
  });
});
