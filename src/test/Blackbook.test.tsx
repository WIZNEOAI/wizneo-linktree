import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import Blackbook from "@/pages/Blackbook";
import { trackBlackbookCheckout } from "@/lib/blackbookAnalytics";

describe("Blackbook", () => {
  it("renders the four verified v1.2.0 products and prices", () => {
    render(
      <MemoryRouter>
        <Blackbook />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "BLACKBOOK" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "BLACKBOOK 01 · AI ENGINEER" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "BLACKBOOK 02 · AGENTIC CODING" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "BLACKBOOK 03 · INFRAESTRUCTURA DE AGENTES",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "BLACKBOOK COMPLETE SYSTEM" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("USD 49")).toHaveLength(3);
    expect(screen.getByText("USD 119")).toBeInTheDocument();
    expect(screen.getByText("PDF · 70 páginas")).toBeInTheDocument();
    expect(screen.getByText("PDF · 67 páginas")).toBeInTheDocument();
    expect(screen.getByText("PDF · 72 páginas")).toBeInTheDocument();
    expect(screen.getByText("PDF · 209 páginas")).toBeInTheDocument();
    expect(screen.getByText(/Packs de los tres BLACKBOOK \+ bonus · 81 archivos/)).toBeInTheDocument();
    expect(screen.getByText("Ruta de 90 días")).toBeInTheDocument();
  });

  it("emits only the approved checkout event payload and stays fail-open", () => {
    const gtagMock = vi.mocked(global.gtag);
    gtagMock.mockClear();

    trackBlackbookCheckout("blackbook-02");

    expect(gtagMock).toHaveBeenCalledOnce();
    expect(gtagMock).toHaveBeenCalledWith("event", "blackbook_checkout_clicked", {
      product: "blackbook_02",
      source: "blackbook_catalog",
    });

    gtagMock.mockImplementationOnce(() => {
      throw new Error("analytics unavailable");
    });
    expect(() => trackBlackbookCheckout("blackbook-03")).not.toThrow();
  });

  it("renders non-clickable checkout states without Gumroad URLs", () => {
    render(
      <MemoryRouter>
        <Blackbook />
      </MemoryRouter>,
    );

    const unavailableStates = screen.getAllByText("Compra no disponible");

    expect(unavailableStates).toHaveLength(4);
    unavailableStates.forEach((state) => {
      expect(state).toHaveAttribute("aria-disabled", "true");
      expect(state.closest("a")).toBeNull();
    });
    expect(screen.queryByRole("link", { name: /Comprar edición digital/ })).not.toBeInTheDocument();
  });

  it("sets catalog metadata while mounted", () => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    const { unmount } = render(
      <MemoryRouter>
        <Blackbook />
      </MemoryRouter>,
    );

    expect(document.title).toBe("BLACKBOOK | WIZNEO");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Cuatro productos digitales WIZNEO para entender, construir y operar agentes: tres BLACKBOOK y BLACKBOOK COMPLETE SYSTEM.",
    );

    unmount();

    expect(document.title).toBe(previousTitle);
    expect(description?.getAttribute("content")).toBe(previousDescription);
  });
});
