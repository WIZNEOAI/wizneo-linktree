import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CLUB_URL, clubUrlWithUtm } from '@/lib/offers';

const root = resolve(__dirname, '../..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf-8');

const jsonLd = () => {
  const m = read('index.html').match(/ld\+json">([\s\S]*?)<\/script>/);
  return JSON.parse(m![1]);
};

describe('canon 29-sep: Club primero', () => {
  it('el Club es la primera oferta del JSON-LD y el Reto es gratis', () => {
    const offers = jsonLd().offers;
    expect(offers[0].name).toBe('WIZ AI Club');
    expect(offers[0].url).toBe(CLUB_URL);
    expect(offers[1].name).toContain('Reto');
    expect(offers[1].price).toBe('0');
  });

  it('el primer link de la página es el Club, seguido de Reto y newsletter', () => {
    const src = read('src/pages/Index.tsx');
    const titles = [...src.matchAll(/^\s{6}title: "([^"]+)"/gm)].map((m) => m[1]);
    expect(titles[0]).toBe('WIZ AI Club');
    expect(titles[1]).toContain('inteligencia artificial');
    expect(titles[2]).toContain('Boletín');
  });

  it('la consultoría 1:1 no aparece en página, metadata, JSON-LD ni llms', () => {
    for (const f of ['index.html', 'src/pages/Index.tsx', 'public/llms.txt', 'public/llms-full.txt']) {
      expect(read(f), f).not.toMatch(/consultor[ií]a 1:1|consultoria-wizneo|1-a-1|WIZNEO 1:1/i);
    }
  });

  it('meta description y OG mencionan el Club', () => {
    const html = read('index.html');
    expect(html).toMatch(/name="description" content="[^"]*WIZ AI Club/);
    expect(html).toMatch(/og:description" content="[^"]*WIZ AI Club/);
  });

  it('el link del Club conserva la URL base y agrega UTM', () => {
    const u = new URL(clubUrlWithUtm());
    expect(u.origin + u.pathname).toBe(new URL(CLUB_URL).origin + new URL(CLUB_URL).pathname);
    expect(u.searchParams.get('utm_campaign')).toBe('wiz_ai_club');
  });
});

describe('verde oficial #02FD5E', () => {
  const files = [
    'index.html',
    'src/index.css',
    'tailwind.config.ts',
    'src/pages/Index.tsx',
    'src/components/LinkCard.tsx',
    'src/components/NewsletterModal.tsx',
    'src/components/NewsletterCapture.tsx',
    'src/components/FloatingParticles.tsx',
  ];

  it('no quedan #00E676, #00FF88 ni su rgba', () => {
    for (const f of files) {
      expect(read(f), f).not.toMatch(/#00e676|#00ff88|rgba\(\s*0,\s*255,\s*136/i);
    }
  });

  it('theme-color y token usan #02FD5E', () => {
    expect(read('index.html')).toMatch(/name="theme-color" content="#02FD5E"/);
    expect(read('src/index.css')).toMatch(/--matrix-green:\s*#02FD5E/);
    expect(read('tailwind.config.ts')).toMatch(/green:\s*'#02FD5E'/);
  });

  it('el contraste del verde sobre negro sigue por encima de AA (4.5)', () => {
    const lin = (c: number) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const L = 0.2126 * lin(0x02) + 0.7152 * lin(0xfd) + 0.0722 * lin(0x5e);
    expect((L + 0.05) / 0.05).toBeGreaterThan(4.5);
  });
});
