import { useEffect } from "react";
import { Link } from "react-router-dom";
import { blackbookCatalog } from "@/data/blackbookCatalog";
import { useAnalytics } from "@/hooks/useAnalytics";

const PAGE_TITLE = "BLACKBOOK | WIZNEO";
const PAGE_DESCRIPTION =
  "Cuatro productos digitales WIZNEO para entender, construir y operar agentes: tres BLACKBOOK y BLACKBOOK COMPLETE SYSTEM.";

const Blackbook = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    const previousTitle = document.title;
    const existingDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousDescription = existingDescription?.getAttribute("content");
    const description = existingDescription ?? document.createElement("meta");

    if (!existingDescription) {
      description.name = "description";
      document.head.appendChild(description);
    }

    document.title = PAGE_TITLE;
    description.content = PAGE_DESCRIPTION;
    trackPageView("BLACKBOOK Catalog");

    return () => {
      document.title = previousTitle;

      if (existingDescription) {
        if (previousDescription === null) {
          existingDescription.removeAttribute("content");
        } else {
          existingDescription.content = previousDescription;
        }
      } else {
        description.remove();
      }
    };
  }, [trackPageView]);

  return (
    <main className="min-h-screen bg-[#020504] text-[#ecfff5] font-matrix">
      <header className="relative isolate overflow-hidden border-b border-matrix-green/20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(0,255,136,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.07)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
        />
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 pb-16 pt-7 sm:px-8 sm:pb-24 sm:pt-9 lg:grid-cols-12 lg:px-10 lg:pb-28">
          <div className="lg:col-span-8">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center text-sm text-matrix-green underline decoration-matrix-green/40 underline-offset-4 transition-colors hover:text-[#ecfff5] focus:outline-none focus-visible:ring-2 focus-visible:ring-matrix-green focus-visible:ring-offset-4 focus-visible:ring-offset-[#020504]"
            >
              ← Volver a WIZNEO
            </Link>
            <p className="mt-16 text-xs font-semibold uppercase tracking-[0.3em] text-matrix-green sm:mt-20">
              Biblioteca digital · Edición 2026
            </p>
            <h1 className="mt-5 text-[clamp(3.25rem,10vw,7.75rem)] font-bold leading-[0.82] tracking-[-0.08em] text-[#ecfff5]">
              BLACKBOOK
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-[#a8c7b8] sm:text-xl sm:leading-8">
              Tres BLACKBOOK y una ruta completa para entender, construir y operar sistemas con agentes.
            </p>
          </div>

          <dl className="self-end border-t border-matrix-green/40 pt-5 text-sm lg:col-span-3 lg:col-start-10">
            <div className="flex justify-between gap-6 border-b border-[#173b2a] py-3">
              <dt className="text-[#7da590]">Productos</dt>
              <dd className="text-matrix-green">04</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-[#173b2a] py-3">
              <dt className="text-[#7da590]">Formatos</dt>
              <dd className="text-right">PDF + MD</dd>
            </div>
            <div className="flex justify-between gap-6 py-3">
              <dt className="text-[#7da590]">Incluye</dt>
              <dd>Pack + ruta</dd>
            </div>
          </dl>
        </div>
      </header>

      <section
        aria-labelledby="catalog-heading"
        className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <div className="mb-10 flex items-baseline justify-between gap-6 sm:mb-14">
          <h2 id="catalog-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Elige tu producto
          </h2>
          <p className="hidden text-xs uppercase tracking-[0.24em] text-[#6e9180] sm:block">
            Individual o sistema completo
          </p>
        </div>

        <div>
          {blackbookCatalog.map((product, index) => (
            <article
              key={product.id}
              className="grid gap-8 border-t border-[#173b2a] py-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20"
            >
              <figure
                className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <div className="border border-matrix-green/25 bg-[#07110c] p-2 sm:p-3">
                  <img
                    src={product.imagePath}
                    alt={`Portada digital de ${product.title}`}
                    width={product.imageOrientation === "portrait" ? 1024 : 1800}
                    height={product.imageOrientation === "portrait" ? 1536 : 1000}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`h-auto w-full ${
                      product.imageOrientation === "portrait"
                        ? "mx-auto aspect-[2/3] max-w-md object-contain"
                        : "aspect-video object-cover"
                    }`}
                  />
                </div>
                <figcaption className="mt-3 flex justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[#6e9180]">
                  <span>
                    {product.id === "blackbook-complete-system"
                      ? "Sistema digital completo"
                      : "Edición digital"}
                  </span>
                  <span>
                    {String(index + 1).padStart(2, "0")} / {String(blackbookCatalog.length).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>

              <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-matrix-green">
                  WIZNEO BLACKBOOK
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#ecfff5] sm:text-4xl">
                  {product.title}
                </h3>
                <p className="mt-5 max-w-[54ch] text-sm leading-7 text-[#a8c7b8] sm:text-base">
                  {product.fit}
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-x-5 border-y border-[#173b2a] py-1 text-sm">
                  <div className="border-b border-[#173b2a] py-4">
                    <dt className="text-[#6e9180]">Lectura</dt>
                    <dd className="mt-1 text-[#ecfff5]">PDF · {product.pageCount} páginas</dd>
                  </div>
                  <div className="border-b border-[#173b2a] py-4">
                    <dt className="text-[#6e9180]">Consulta</dt>
                    <dd className="mt-1 text-[#ecfff5]">Markdown</dd>
                  </div>
                  <div className="col-span-2 py-4">
                    <dt className="text-[#6e9180]">Pack incluido</dt>
                    <dd className="mt-1 text-[#ecfff5]">
                      {product.packName} · {product.packCount} archivos
                    </dd>
                  </div>
                  {product.roadmapDays ? (
                    <div className="col-span-2 border-t border-[#173b2a] py-4">
                      <dt className="text-[#6e9180]">Ruta incluida</dt>
                      <dd className="mt-1 text-[#ecfff5]">Ruta de {product.roadmapDays} días</dd>
                    </div>
                  ) : null}
                </dl>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
                  <p className="text-2xl font-semibold text-[#ecfff5]">USD {product.priceUsd}</p>
                  {product.gumroadUrl ? (
                    <a
                      href={product.gumroadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center border border-matrix-green bg-matrix-green px-5 py-3 text-sm font-semibold text-[#020504] transition-colors hover:bg-[#74ffb9] focus:outline-none focus-visible:ring-2 focus-visible:ring-matrix-green focus-visible:ring-offset-4 focus-visible:ring-offset-[#020504]"
                    >
                      {product.id === "blackbook-complete-system"
                        ? "Comprar sistema digital ↗"
                        : "Comprar edición digital ↗"}
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      aria-label={`Compra de ${product.title} no disponible`}
                      className="inline-flex min-h-12 cursor-not-allowed items-center justify-center border border-[#315241] px-5 py-3 text-sm text-[#6e9180]"
                    >
                      Compra no disponible
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-matrix-green/20 bg-[#06100b]" aria-labelledby="guide-heading">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-matrix-green">
              Guía de lectura
            </p>
            <h2 id="guide-heading" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Empieza por tu problema actual.
            </h2>
          </div>
          <ol className="grid gap-0 border-t border-[#315241] lg:col-span-7 lg:col-start-6">
            <li className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#315241] py-5">
              <span className="text-matrix-green">01</span>
              <p className="text-sm leading-6 text-[#a8c7b8]">Define modelos, datos y habilidades con AI Engineer.</p>
            </li>
            <li className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#315241] py-5">
              <span className="text-matrix-green">02</span>
              <p className="text-sm leading-6 text-[#a8c7b8]">Ordena la colaboración entre repositorio y agentes con Agentic Coding.</p>
            </li>
            <li className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#315241] py-5">
              <span className="text-matrix-green">03</span>
              <p className="text-sm leading-6 text-[#a8c7b8]">Lleva el sistema a una operación controlada con Infraestructura de Agentes.</p>
            </li>
            <li className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#315241] py-5">
              <span className="text-matrix-green">04</span>
              <p className="text-sm leading-6 text-[#a8c7b8]">Recorre las tres capas con BLACKBOOK COMPLETE SYSTEM y su ruta de 90 días.</p>
            </li>
          </ol>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1180px] flex-col gap-5 px-5 py-10 text-xs text-[#6e9180] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© 2026 WIZNEO · BLACKBOOK</p>
        <Link
          to="/"
          className="text-matrix-green underline decoration-matrix-green/40 underline-offset-4 hover:text-[#ecfff5] focus:outline-none focus-visible:ring-2 focus-visible:ring-matrix-green"
        >
          Volver al inicio
        </Link>
      </footer>
    </main>
  );
};

export default Blackbook;
