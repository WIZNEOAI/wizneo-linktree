import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import Blackbook from "@/pages/Blackbook";

vi.mock("@/hooks/useAnalytics", () => ({
  useAnalytics: () => ({
    trackPageView: vi.fn(),
  }),
}));

describe("Blackbook", () => {
  it("renders the three verified editions and prices", () => {
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
    expect(screen.getAllByText("USD 49")).toHaveLength(3);
  });

  it("renders non-clickable checkout states without Gumroad URLs", () => {
    render(
      <MemoryRouter>
        <Blackbook />
      </MemoryRouter>,
    );

    const unavailableStates = screen.getAllByText("Compra no disponible");

    expect(unavailableStates).toHaveLength(3);
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
      "Tres guías digitales WIZNEO para entender, construir y operar agentes. Cada edición incluye PDF, Markdown y un pack de trabajo.",
    );

    unmount();

    expect(document.title).toBe(previousTitle);
    expect(description?.getAttribute("content")).toBe(previousDescription);
  });
});
