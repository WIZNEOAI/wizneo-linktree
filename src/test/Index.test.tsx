import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Index from "@/pages/Index";

vi.mock("@/components/MatrixRain", () => ({ default: () => null }));
vi.mock("@/components/FloatingParticles", () => ({ default: () => null }));
vi.mock("@/components/NewsletterModal", () => ({ default: () => null }));
vi.mock("react-social-icons", () => ({ SocialIcon: () => null }));
vi.mock("@/hooks/useAnalytics", () => ({
  useAnalytics: () => ({
    trackEvent: vi.fn(),
    trackPageView: vi.fn(),
  }),
}));

describe("Index links", () => {
  it("keeps Consultoría first and adds BLACKBOOK second", () => {
    render(<Index />);

    const links = screen.getAllByRole("link");
    const consultoria = links[0];
    const blackbook = links[1];

    expect(consultoria).toHaveAccessibleName(
      "Consultoría 1:1 WIZNEO - Sesión de 2 horas conmigo para montar tu infraestructura de inteligencia artificial.",
    );
    expect(consultoria).toHaveAttribute(
      "href",
      "https://cal.com/gnosixio/consultoria-express?utm_source=wizneo_linkhub&utm_medium=primary_cta&utm_campaign=wizneo_1a1",
    );
    expect(blackbook).toHaveAccessibleName(
      "BLACKBOOK - Tres guías para entender, construir y operar agentes.",
    );
    expect(blackbook).toHaveAttribute("href", "/blackbook");
    expect(blackbook).not.toHaveAttribute("target");
  });

  it("preserves the Reto and newsletter destinations", () => {
    render(<Index />);

    expect(
      screen.getByRole("link", {
        name: /Domina la inteligencia artificial en 30 días/,
      }),
    ).toHaveAttribute(
      "href",
      "https://reto.wizneo.org/?utm_source=linktree&utm_medium=organic&utm_campaign=lead_magnet",
    );
    expect(
      screen.getByRole("link", { name: /Boletín semanal WIZNEO/ }),
    ).toHaveAttribute(
      "href",
      "https://newsletter.wizneo.org/?utm_source=linktree&utm_medium=organic&utm_campaign=bio",
    );
  });
});
