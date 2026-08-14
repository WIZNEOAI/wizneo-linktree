
import { useEffect } from 'react';
import MatrixRain from '@/components/MatrixRain';
import LinkCard from '@/components/LinkCard';
import FloatingParticles from '@/components/FloatingParticles';
import NewsletterModal from '@/components/NewsletterModal';
import { SocialIcon } from 'react-social-icons';
import { useAnalytics } from '@/hooks/useAnalytics';

const Index = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('Homepage');
  }, [trackPageView]);

  const links = [
    {
      icon: "agent",
      title: "Consultoría 1:1 WIZNEO",
      description: 'Sesión de 2 horas conmigo para montar tu infraestructura de inteligencia artificial.',
      // Va a la landing y no a Cal directo: quien llega al hub desde una bio es
      // trafico frio y ahi encuentra el "¿es para ti? / no es para ti" que califica
      // antes de la llamada. El Cal esta embebido abajo en la misma pagina, asi que
      // no agrega un paso real. El camino corto a Cal es el QR que se da en persona.
      url: "https://consultoria.wizneo.org/?utm_source=wizneo_linkhub&utm_medium=primary_cta&utm_campaign=wizneo_1a1",
      featured: true,
      offer: "Precio especial USD 500 — cierra el 31 de agosto."
    },
    // Card "Mis sistemas" retirada el 2026-08-13: el canon pausó los infoproductos
    // el 2026-08-03 y la tienda de Gumroad está vacía, así que la card prometía algo
    // que no existe. Vuelve tal cual el día que haya producto publicado.
    // {
    //   icon: "store",
    //   title: "Mis sistemas",
    //   description: 'Ebooks, skills y agentes listos para que empieces a implementar IA hoy como todo un profesional.',
    //   url: "https://wizneo.gumroad.com/?utm_source=wizneo_linkhub&utm_medium=organic&utm_campaign=sistemas",
    //   featured: false
    // },
    {
      icon: "brain",
      title: "Domina la inteligencia artificial en 30 días",
      description: "Recibe gratis un plan personalizado para entender IA, herramientas actuales y qué hacer día por día.",
      url: "https://reto.wizneo.org/?utm_source=wizneo_linkhub&utm_medium=organic&utm_campaign=lead_magnet",
      featured: false
    },
    {
      icon: "newsletter",
      title: "Boletín semanal WIZNEO",
      description: "Noticias, herramientas y oportunidades de IA explicadas sin humo y aterrizadas a la vida real.",
      url: "https://newsletter.wizneo.org/?utm_source=wizneo_linkhub&utm_medium=organic&utm_campaign=bio",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-matrix relative overflow-hidden" role="main">
      {/* Background Effects - Behind everything */}
      <MatrixRain />
      <FloatingParticles />

      {/* Email capture → newsletter (direct subscribe via newsletter /api/subscribe) */}
      <NewsletterModal />

      {/* Main Content - Above background effects */}
      <div className="relative z-20 min-h-[100dvh] flex flex-col items-center justify-start sm:justify-center
                      px-4 sm:px-6 lg:px-8 pt-8 pb-6 sm:py-10">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto space-y-4 sm:space-y-5">

          {/* Profile Section */}
          <section className="text-center space-y-3 sm:space-y-4" aria-labelledby="profile-heading">
            {/* Profile Picture */}
            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28
                           rounded-full overflow-hidden matrix-border-glow hover:matrix-glow
                           transition-all duration-300 transform hover:scale-105">
              <img
                src="/uploads/wizneo-profile.webp"
                alt="Ulises Arellano, AI Engineer y fundador de WIZNEO"
                width={336}
                height={323}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Brand label. Lleva el rol porque el subtitulo ya no lo dice y la
                identidad tiene que quedar explicita en algun lado de la pagina. */}
            <p className="text-xs sm:text-sm font-matrix tracking-[0.25em] uppercase text-matrix-green/70">
              WIZNEO · Ulises Arellano · AI Engineer
            </p>

            {/* Antes el H1 era motivacional ("Ya no hay excusas") y no decia a que se
                dedica. Ahora nombra el salto que vende y el subtitulo dice que hace. */}
            <div className="space-y-2 sm:space-y-3">
              <h1
                id="profile-heading"
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold
                           text-matrix-green matrix-text-glow font-matrix tracking-tight
                           leading-[1.04] px-2 sm:px-4 lg:px-6
                           transform transition-all duration-300 hover:scale-[1.02]"
              >
                Deja de pedirle cosas a la IA. Empieza a operarla.
              </h1>
              <div className="h-px w-14 sm:w-20 lg:w-24 mx-auto bg-gradient-to-r
                             from-transparent via-matrix-green to-transparent"></div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-matrix
                            leading-relaxed px-2 sm:px-4 lg:px-6 max-w-prose mx-auto">
                Monto infraestructura de IA y aquí te enseño a montar la tuya.
              </p>
            </div>
          </section>

          {/* Links Section */}
          <section className="space-y-3 sm:space-y-4 w-full" aria-label="Enlaces principales">
            {links.map((link, index) => (
              <div
                key={index}
                className={`transform transition-all duration-300
                          ${link.featured ? 'hover:scale-[1.03] active:scale-[0.97]' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
              >
                <LinkCard {...link} />
              </div>
            ))}
          </section>

          {/* Social Media Icons */}
          <section className="text-center pt-5 sm:pt-6 pb-4 sm:pb-5" aria-label="Redes sociales">
            <nav className="flex justify-center items-center space-x-6 sm:space-x-8 mb-6 sm:mb-8" aria-label="Enlaces de redes sociales">
              <SocialIcon
                url="https://www.instagram.com/wizneo.io/"
                style={{ height: 48, width: 48 }}
                bgColor="#00E676"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
              <SocialIcon
                url="https://x.com/Wizneoio"
                style={{ height: 48, width: 48 }}
                bgColor="#00E676"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
              <SocialIcon
                url="https://www.youtube.com/@wizneoai"
                style={{ height: 48, width: 48 }}
                bgColor="#00E676"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
              <SocialIcon
                url="https://www.tiktok.com/@wizneo.io"
                style={{ height: 48, width: 48 }}
                bgColor="#00E676"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
              <SocialIcon
                url="https://github.com/WIZNEOAI"
                style={{ height: 48, width: 48 }}
                bgColor="#00E676"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
            </nav>

            {/* Copyright */}
            <div className="text-xs sm:text-sm text-gray-500 font-matrix tracking-wide">
              © 2026 WIZNEO
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Index;
