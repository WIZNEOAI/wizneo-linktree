import { describe, expect, it } from "vitest";
import { createBlackbookCatalog } from "@/data/blackbookCatalog";

describe("blackbookCatalog", () => {
  it("keeps the verified product counts and individual USD 49 price", () => {
    const catalog = createBlackbookCatalog({});

    expect(catalog).toHaveLength(3);
    expect(catalog.map(({ pageCount }) => pageCount)).toEqual([65, 67, 68]);
    expect(catalog.map(({ packCount }) => packCount)).toEqual([15, 34, 22]);
    expect(catalog.every(({ priceUsd }) => priceUsd === 49)).toBe(true);
  });

  it("keeps checkout URLs undefined when environment variables are absent", () => {
    const catalog = createBlackbookCatalog({});

    expect(catalog.every(({ gumroadUrl }) => gumroadUrl === undefined)).toBe(true);
  });
});
