import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CLUB_OPEN, CLUB_PRICE_LABEL, CLUB_URL, clubHref } from '@/lib/offers';

const root = resolve(__dirname, '../..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf-8');

const jsonLd = () => {
  const m = read('index.html').match(/ld\+json">([\s\S]*?)<\/script>/);
  return JSON.parse(m![1]);
};

describe('canon 29-sep: Club primero, en lista de espera', () => {
  it('el Club aún no abre: CLUB_OPEN=false y sin URL de Skool', () => {
    expect(CLUB_OPEN).toBe(false);
    expect(CLUB_URL).toBeNull();
  });

  it('el link del Club apunta a la newsletter con UTM mientras esté cerrado', () => {
    const u = new URL(clubHref());
    expect(u.origin).toBe('https://newsletter.wizneo.org');
    expect(u.searchParams.get('utm_campaign')).toBe('wiz_ai_club_waitlist');
  });

  it('ningún archivo publicado ni el código declara una URL de skool.com', () => {
    for (const f of ['index.html', 'src/pages/Index.tsx', 'src/lib/offers.ts', 'public/llms.txt', 'public/llms-full.txt']) {
      expect(read(f), f).not.toMatch(/skool\.com/i);
    }
  });

  it('el Club es la primera oferta del JSON-LD, sin URL falsa y en PreOrder', () => {
    const offers = jsonLd().offers;
    expect(offers[0].name).toBe('WIZ AI Club');
    expect(offers[0].url).toBeUndefined();
    expect(offers[0].availability).toBe('https://schema.org/PreOrder');
    expect(offers[0].priceSpecification).toHaveLength(2);
    expect(offers[1].name).toContain('Reto');
    expect(offers[1].price).toBe('0');
  });

  it('el primer link de la página es el Club en lista de espera, seguido de Reto y newsletter', () => {
    const src = read('src/pages/Index.tsx');
    const titles = [...src.matchAll(/^\s{6}title: "([^"]+)"/gm)].map((m) => m[1]);
    expect(titles[0]).toBe('WIZ AI Club');
    expect(titles[1]).toContain('inteligencia artificial');
    expect(titles[2]).toContain('Boletín');
    expect(src).toMatch(/Abre pronto/);
    expect(src).toMatch(/lista de espera/i);
    expect(src).toContain('${CLUB_PRICE_LABEL}');
    expect(CLUB_PRICE_LABEL).toBe('USD 49/mes o USD 490/año');
  });

  it('llms.txt y llms-full.txt anuncian lista de espera y precio de fundador', () => {
    for (const f of ['public/llms.txt', 'public/llms-full.txt']) {
      expect(read(f), f).toMatch(/lista de espera/i);
      expect(read(f), f).toMatch(/USD 49\/mes o USD 490\/año/);
    }
  });

  it('la consultoría no aparece en ningún archivo del repo y no hay redirect /consultoria', () => {
    for (const f of ['index.html', 'src/pages/Index.tsx', 'public/llms.txt', 'public/llms-full.txt', 'README.md', 'vercel.json']) {
      expect(read(f), f).not.toMatch(/consultor[ií]a|consultoria-wizneo|1-a-1|WIZNEO 1:1/i);
    }
    expect(JSON.parse(read('vercel.json')).redirects ?? []).toEqual([]);
    expect(existsSync(resolve(root, '.planning/wizneo-consultoria-url'))).toBe(false);
  });

  it('WIZNEO no menciona a Gnosix en llms, index.html ni src', () => {
    for (const f of ['public/llms.txt', 'public/llms-full.txt', 'index.html', 'src/pages/Index.tsx', 'src/lib/offers.ts']) {
      expect(read(f), f).not.toMatch(/gnosix/i);
    }
  });

  it('meta description y OG mencionan el Club', () => {
    const html = read('index.html');
    expect(html).toMatch(/name="description" content="[^"]*WIZ AI Club/);
    expect(html).toMatch(/og:description" content="[^"]*WIZ AI Club/);
  });

  it('cuando el Club abra, clubHref usa la URL con UTM del Club', () => {
    const u = new URL(clubHref('https://example.com/club', true));
    expect(u.origin + u.pathname).toBe('https://example.com/club');
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
