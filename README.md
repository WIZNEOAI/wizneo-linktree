# LinkTree Estilo Matrix — Regalo Comunitario

Una página de enlaces tipo LinkTree con estética inspirada en Matrix, incluyendo lluvia de código animada, partículas flotantes y un diseño verde neón que te hará sentir como si estuvieras dentro de la película. Ideal para creadores, emprendedores y entusiastas de la tecnología que quieren una página de bio links única y llamativa.

![Matrix Theme](https://img.shields.io/badge/tema-matrix-00FF41?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## Características

- **Lluvia de código Matrix** — Efecto auténtico de caracteres cayendo
- **Partículas flotantes** — Sistema de partículas dinámico que añade profundidad
- **Tarjetas de enlaces personalizables** — Diseño llamativo con iconos y descripciones
- **Totalmente responsivo** — Se ve bien en cualquier dispositivo
- **Efectos de brillo neón** — El característico verde Matrix al pasar el cursor
- **Rápido y optimizado** — Construido con Vite para un rendimiento veloz

## Requisitos Previos

- Node.js 18 o superior
- npm (viene incluido con Node.js)

Si no tienes Node.js instalado, puedes hacerlo con [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

## Instalación

```bash
# Clona el repositorio
git clone https://github.com/WIZNEOAI/wizneo-linktree.git

# Entra a la carpeta del proyecto
cd wizneo-linktree

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

La aplicación se abrirá en `http://localhost:8080`

## Personalización

### 1. Cambia tu información de perfil

Edita el archivo `src/pages/Index.tsx`:

**Tu nombre o marca** (línea 69):
```tsx
WIZNEO  →  TU NOMBRE
```

**Tu frase o eslogan** (línea 79):
```tsx
Transforma tu realidad, reprograma tu mente.  →  Tu frase aquí
```

### 2. Cambia tu foto de perfil

1. Coloca tu imagen en la carpeta `public/lovable-uploads/`
2. Actualiza la ruta en `src/pages/Index.tsx` (línea 56):

```tsx
<img src="/lovable-uploads/tu-imagen.png" alt="Tu Nombre" />
```

### 3. Personaliza tus enlaces principales

Edita el array `links` en `src/pages/Index.tsx` (líneas 16-36):

```tsx
const links = [
  {
    icon: "phone",           // Iconos: phone, tech, brain, link
    title: "Título de tu enlace",
    description: "Descripción de tu enlace",
    url: "https://tu-url.com",
    featured: true           // Opcional: resalta el enlace
  },
  // Agrega más enlaces aquí...
];
```

### 4. Actualiza tus redes sociales

Modifica las URLs de redes sociales en `src/pages/Index.tsx` (líneas 99-143):

```tsx
<SocialIcon url="https://instagram.com/tu-usuario" />
<SocialIcon url="https://youtube.com/@tu-canal" />
<SocialIcon url="https://twitter.com/tu-usuario" />
<SocialIcon url="https://tiktok.com/@tu-usuario" />
<SocialIcon url="https://github.com/tu-usuario" />
```

### 5. Cambia los colores (opcional)

El proyecto usa el tema verde Matrix. Para personalizar los colores, edita `src/index.css`:

```css
:root {
  --matrix-green: 136 100% 50%;  /* Valores HSL */
  --matrix-dark: 120 100% 10%;
}
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── MatrixRain.tsx       # Animación de lluvia Matrix
│   ├── FloatingParticles.tsx # Sistema de partículas
│   ├── LinkCard.tsx         # Componente de tarjeta de enlace
│   └── ui/                  # Componentes de interfaz
├── pages/
│   └── Index.tsx            # Página principal (aquí personalizas)
├── hooks/
│   └── useAnalytics.ts      # Seguimiento de analíticas
└── index.css                # Estilos globales y animaciones
```

## Iconos Disponibles

El proyecto incluye varios iconos para tus tarjetas de enlaces:
- `phone` — Teléfono/calendario
- `tech` — Tecnología/engranaje
- `brain` — IA/cerebro
- `link` — Enlace genérico

Puedes ver más opciones en `src/utils/iconMapping.ts`

## Despliegue

### Con Vercel (recomendado)

1. Sube tu proyecto a GitHub
2. Conecta tu repositorio en [vercel.com](https://vercel.com)
3. Vercel detectará automáticamente la configuración
4. ¡Tu sitio estará en línea!

### Con Netlify

1. Sube tu proyecto a GitHub
2. Conecta tu repositorio en [netlify.com](https://netlify.com)
3. Configura el comando de build: `npm run build`
4. Directorio de publicación: `dist`

### Construcción manual

```bash
# Construye para producción
npm run build

# Previsualiza la construcción
npm run preview
```

## Comandos Útiles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar construcción
npm run lint         # Ejecutar ESLint
npm run test         # Ejecutar pruebas
```

## Tecnologías Utilizadas

- **Framework:** React 18 con TypeScript
- **Empaquetador:** Vite
- **Estilos:** Tailwind CSS
- **Componentes UI:** shadcn/ui + Radix UI
- **Iconos:** Lucide React + React Social Icons
- **Enrutamiento:** React Router DOM

## Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT. Eres libre de usarlo, modificarlo y distribuirlo.

## Agradecimientos

Este proyecto es un **regalo de [Wizneo](https://github.com/WIZNEOAI)** para la comunidad.

Puedes usarlo libremente para crear tu propia página de enlaces. Si te resulta útil, considera darle una estrella al repositorio y compartirlo con otros.

---

Si tienes preguntas o sugerencias, no dudes en abrir un [issue](https://github.com/WIZNEOAI/wizneo-linktree/issues).

**¡Que la Matrix te acompañe!**
