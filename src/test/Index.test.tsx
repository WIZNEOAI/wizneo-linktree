import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Index from '@/pages/Index';

vi.mock('@/components/MatrixRain', () => ({ default: () => null }));
vi.mock('@/components/FloatingParticles', () => ({ default: () => null }));
vi.mock('@/components/NewsletterModal', () => ({ default: () => null }));
vi.mock('react-social-icons', () => ({ SocialIcon: () => null }));
vi.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: () => ({ trackPageView: vi.fn() }),
}));

describe('WIZNEO homepage offer focus', () => {
  it('keeps the USD 500 consultancy first and removes infoproduct sales', () => {
    render(<Index />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAccessibleName(
      /Consultoría 1:1 WIZNEO - Sesión de 2 horas conmigo/i,
    );
    expect(links[0]).toHaveAttribute(
      'href',
      expect.stringContaining('cal.com/gnosixio/consultoria-wizneo'),
    );
    expect(screen.getByText(/Precio especial USD 500/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mis sistemas/i)).not.toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/ebook|gumroad|blackbook/i);
  });
});
