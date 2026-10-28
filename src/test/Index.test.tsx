import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

const posthogMock = vi.hoisted(() => ({ init: vi.fn(), capture: vi.fn() }));
vi.mock('posthog-js', () => ({ default: posthogMock }));
vi.mock('@/components/MatrixRain', () => ({ default: () => null }));
vi.mock('@/components/FloatingParticles', () => ({ default: () => null }));

import Index from '@/pages/Index';
import { initPosthog } from '@/lib/posthog';

const SKOOL_URL =
  'https://www.skool.com/wiz-ai-club-4087/about?utm_source=wizneo_linkhub&utm_medium=primary_cta&utm_campaign=wiz_ai_club';

describe('Index', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it('pone Skool con su UTM como primer link', () => {
    render(<Index />);
    const first = screen.getAllByRole('link')[0];
    expect(first).toHaveAttribute('href', SKOOL_URL);
    expect(first).toHaveTextContent('WIZ AI Club · la comunidad');
  });

  it('mantiene el reto gratis en segundo lugar', () => {
    render(<Index />);
    expect(screen.getAllByRole('link')[1]).toHaveAttribute(
      'href',
      'https://reto.wizneo.org/?utm_source=wizneo_linkhub&utm_medium=organic&utm_campaign=lead_magnet',
    );
  });

  it('ya no muestra cal.com ni el boletín', () => {
    const { container } = render(<Index />);
    expect(container.innerHTML).not.toContain('cal.com');
    expect(container.innerHTML).not.toContain('newsletter.wizneo.org');
    expect(screen.queryByText(/Boletín/i)).not.toBeInTheDocument();
  });

  it('captura link_click en PostHog al hacer clic en un link', () => {
    vi.stubEnv('VITE_POSTHOG_KEY', 'phc_test');
    initPosthog();
    render(<Index />);
    fireEvent.click(screen.getAllByRole('link')[0]);
    expect(posthogMock.capture).toHaveBeenCalledWith('link_click', {
      link_id: 'skool',
      link_url: SKOOL_URL,
      position: 1,
    });
  });

  it('captura link_click al hacer clic en una red social', () => {
    vi.stubEnv('VITE_POSTHOG_KEY', 'phc_test');
    initPosthog();
    render(<Index />);
    const ig = screen.getAllByRole('link').find((a) => a.getAttribute('href')?.includes('instagram.com'))!;
    fireEvent.click(ig);
    expect(posthogMock.capture).toHaveBeenCalledWith(
      'link_click',
      expect.objectContaining({ link_id: 'instagram', link_url: 'https://www.instagram.com/wizneo.io/' }),
    );
  });

  it('sin VITE_POSTHOG_KEY no inicializa ni captura', () => {
    initPosthog();
    render(<Index />);
    fireEvent.click(screen.getAllByRole('link')[0]);
    expect(posthogMock.init).not.toHaveBeenCalled();
    expect(posthogMock.capture).not.toHaveBeenCalled();
  });
});
