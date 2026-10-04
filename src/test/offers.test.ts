import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CLUB_OPEN, CLUB_URL, clubHref } from '@/lib/offers';

const root = resolve(__dirname, '../..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf-8');

const jsonLd = () => {
  const m = read('index.html').match(/ld\+json">([\s\S]*?)<\/script>/);
  return JSON.parse(m![1]);
};

describe('canon 4-oct: el Club abre en Skool, sin precio ni newsletter', () => {
  const pageFiles = ['index.html', 'src/pages/Index.tsx', 'public/llms.txt', 'public/llms-full.txt'];

  it('el Club está abierto con la URL de Skool', () => {
    expect(CLUB_OPEN).toBe(true);
    expect(CLUB_URL).toBe('https://www.skool.com/wiz-ai-club-4087/about');
  });

  it('el link del Club apunta a Skool con UTM wiz_ai_club', () => {
    const u = new URL(clubHref());
    expect(u.origin + u.pathname).toBe('https://www.skool.com/wiz-ai-club-4087/about');
    expect(u.searchParams.get('utm_campaign')).toBe('wiz_ai_club');
    expect(u.searchParams.get('utm_source')).toBe('wizneo_linkhub');
  });

  it('el Club es la primera oferta del JSON-LD, con URL de Skool, sin PreOrder y sin precio', () => {
    const offers = jsonLd().offers;
    expect(offers[0].name).toBe('WIZ AI Club');
    expect(offers[0].url).toBe('https://www.skool.com/wiz-ai-club-4087/about');
    expect(offers[0].availability).toBeUndefined();
    expect(offers[0].priceSpecification).toBeUndefined();
    expect(offers[0].price).toBeUndefined();
    expect(offers[1].name).toContain('Reto');
    expect(offers[1].price).toBe('0');
  });

  it('primer link = Club, segundo = Reto, y no hay más cards', () => {
    const src = read('src/pages/Index.tsx');
    const titles = [...src.matchAll(/^\s{6}title: "([^"]+)"/gm)].map((m) => m[1]);
    expect(titles).toHaveLength(2);
    expect(titles[0]).toBe('WIZ AI Club');
    expect(titles[1]).toContain('inteligencia artificial');
    expect(src).toContain('Únete a la comunidad');
    expect(src).not.toMatch(/CLUB_PRICE_LABEL/);
  });

  it('no hay card de newsletter ni NewsletterModal en la página', () => {
    const src = read('src/pages/Index.tsx');
    expect(src).not.toMatch(/NewsletterModal/);
    expect(src).not.toMatch(/Boletín semanal/);
    expect(src).not.toMatch(/newsletter\.wizneo\.org/);
  });

  it('no aparece ningún precio USD 49 ni lista de espera en la página ni en llms*', () => {
    for (const f of pageFiles) {
      expect(read(f), f).not.toMatch(/USD\s*49|USD\s*490|\$49|lista de espera|waitlist|PreOrder/i);
    }
  });

  it('llms.txt y llms-full.txt anuncian el Club abierto en Skool y no mencionan newsletter', () => {
    for (const f of ['public/llms.txt', 'public/llms-full.txt']) {
      expect(read(f), f).toMatch(/skool\.com\/wiz-ai-club-4087\/about/);
      expect(read(f), f).not.toMatch(/newsletter|bolet[ií]n/i);
    }
  });

  it('la consultoría no aparece en ningún archivo del repo y no hay redirect /consultoria', () => {
    for (const f of ['index.html', 'src/pages/Index.tsx', 'public/llms.txt', 'public/llms-full.txt', 'README.md', 'vercel.json']) {
      expect(read(f), f).not.toMatch(/consultor[ií]a|consultoria-wizneo|1-a-1|WIZNEO 1:1/i);
    }
    expect(JSON.parse(read('vercel.json')).redirects ?? []).toEqual([]);
    expect(existsSync(resolve(root, '.planning/wizneo-consultoria-url'))).toBe(false);
  });

  it('WIZNEO no menciona a Gnosix, Depadoc ni Elderhermit en llms, index.html ni src', () => {
    for (const f of ['public/llms.txt', 'public/llms-full.txt', 'index.html', 'src/pages/Index.tsx', 'src/lib/offers.ts', 'README.md']) {
      expect(read(f), f).not.toMatch(/gnosix|depadoc|elderhermit/i);
    }
  });

  it('meta description y OG mencionan el Club y no el boletín', () => {
    const html = read('index.html');
    expect(html).toMatch(/name="description" content="[^"]*WIZ AI Club/);
    expect(html).toMatch(/og:description" content="[^"]*WIZ AI Club/);
    expect(html).not.toMatch(/bolet[ií]n|newsletter/i);
  });

  it('subtítulo del hero nuevo y el viejo ya no está', () => {
    const src = read('src/pages/Index.tsx');
    expect(src).toContain('Te enseño a usar la IA para crear contenido, construir productos y conseguir clientes.');
    expect(src).not.toContain('Monto infraestructura');
    expect(src).toContain('Deja de pedirle cosas a la IA. Empieza a operarla.');
  });

  it('cerrado, clubHref cae a la lista de espera', () => {
    const u = new URL(clubHref(null, false));
    expect(u.origin).toBe('https://newsletter.wizneo.org');
    expect(u.searchParams.get('utm_campaign')).toBe('wiz_ai_club_waitlist');
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
