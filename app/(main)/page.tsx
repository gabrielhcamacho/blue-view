import type { Metadata } from 'next';
import { fetchAllProperties, fetchSiteConfig } from '@/app/lib/rehut-api';
import { isLancamento, whatsappUrl } from '@/app/lib/utils';
import SearchBar from '@/app/components/SearchBar';
import HeroSlideshow from '@/app/components/HeroSlideshow';
import AnimatedSection from '@/app/components/AnimatedSection';
import PropertyCarousel from '@/app/components/PropertyCarousel';

export const metadata: Metadata = {
  title: 'Blueview Imóveis | Alto Padrão em Itapema e região',
  description:
    'Especialistas em imóveis de alto padrão em Itapema e região. Apartamentos, coberturas e lançamentos exclusivos no litoral catarinense.',
};

export default async function HomePage() {
  const [configData, propertiesData] = await Promise.all([
    fetchSiteConfig(),
    // Catálogo inteiro, e não só a primeira página: os lançamentos vêm do DWV, que a API
    // devolve depois de todos os imóveis próprios.
    fetchAllProperties(),
  ]);

  const waLink = configData.whatsapp
    ? whatsappUrl(configData.whatsapp, 'Olá! Tenho um imóvel e gostaria de anunciá-lo com a Blueview.')
    : '#';

  const all = propertiesData.data;
  const featured = all.slice(0, 6);
  const lancamentos = all.filter(isLancamento);
  const section2 = lancamentos.length > 0 ? lancamentos.slice(0, 6) : all.slice(6, 12);
  const hasSection2 = section2.length > 0;

  return (
    <>
      {/* Hero — ocupa a viewport inteira; o header fixo flutua por cima (fundo cobre atrás dele) */}
      <section className="relative min-h-[100svh] flex items-stretch overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #05013a 0%, #0f0392 60%, #1f4fd1 100%)' }}
          />
          <HeroSlideshow
            images={
              configData.hero_images?.length
                ? configData.hero_images
                : ['/hero-1.jpg', '/hero-2.jpg']
            }
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(8,3,80,0.72) 0%, rgba(8,3,80,0.35) 50%, rgba(0,0,0,0.15) 100%)',
            }}
          />
        </div>

        {/* Left: floating search card */}
        <div className="relative z-10 flex items-center px-4 py-24 md:px-10 w-full md:w-auto md:min-w-[420px] lg:min-w-[480px]">
          <div
            className="w-full rounded-2xl p-7 border border-white/20"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)', backdropFilter: 'blur(16px)' }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight">
              {configData.hero_title}
            </h1>
            <p className="text-white/70 text-sm mb-6">
              {configData.hero_subtitle}
            </p>
            <SearchBar naked />
          </div>
        </div>

        {/* Right: editorial text */}
        <div className="relative z-10 hidden lg:flex flex-1 items-center justify-start p-14">
          <div
            className="text-white font-black leading-none uppercase select-none"
            // style={{ fontSize: 'clamp(4rem, 7vw, 7rem)', textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}
            style={{ fontSize: 'clamp(4rem, 7vw, 7rem)'}}
          >
            <div>O MAR</div>
            <div>À SUA</div>
            <div>PORTA</div>
          </div>
        </div>
      </section>

      {/* Seção 1: Imóveis em Destaque */}
      {featured.length > 0 && (
        <AnimatedSection animation="fade-up">
          <PropertyCarousel
            properties={featured}
            title="Imóveis em Destaque"
            subtitle="Selecionados pela nossa equipe de especialistas"
            viewAllHref="/imoveis"
          />
        </AnimatedSection>
      )}

      {/* Seção 2: Lançamentos (ou mais imóveis) */}
      {hasSection2 && (
        <AnimatedSection animation="fade-up" delay={80}>
          <div className="bg-gray-50">
            <PropertyCarousel
              properties={section2}
              title={lancamentos.length > 0 ? 'Lançamentos' : 'Mais Imóveis'}
              subtitle={
                lancamentos.length > 0
                  ? 'Os melhores lançamentos de Itapema e região'
                  : 'Explore mais opções do nosso portfólio'
              }
              viewAllHref={
                lancamentos.length > 0 ? '/imoveis?status_imovel=lancamento' : '/imoveis'
              }
            />
          </div>
        </AnimatedSection>
      )}

      {/* Seção dois cards: Anunciar / Investir */}
      <AnimatedSection animation="fade-up">
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card: Proprietário */}
            <div className="relative rounded-2xl overflow-hidden min-h-[300px] flex flex-col justify-between p-8 md:p-10">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/proprietario.avif')",
                }}
              />
              <div className="absolute inset-0 bg-black/55" />
              <h3 className="relative z-10 text-2xl sm:text-3xl font-bold text-white leading-snug max-w-xs">
                Você é proprietário de um imóvel e deseja anunciá-lo aqui?
              </h3>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white relative z-10 mt-8 w-full text-center font-semibold py-3.5 rounded-xl text-sm"
              >
                Fale com um corretor
              </a>
            </div>

            {/* Card: Investimento */}
            <div className="relative rounded-2xl overflow-hidden min-h-[300px] flex flex-col justify-between p-8 md:p-10">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&w=900&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-black/55" />
              <h3 className="relative z-10 text-2xl sm:text-3xl font-bold text-white leading-snug max-w-xs">
                Procurando o melhor investimento? Você não precisa fazer isso sozinho.
              </h3>
              <a
                href="/investir"
                className="btn-white relative z-10 mt-8 w-full text-center font-semibold py-3.5 rounded-xl text-sm"
              >
                Receba uma consultoria
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
