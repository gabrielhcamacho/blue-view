import type { Metadata } from 'next';
import { TrendingUp, Shield, MapPin, Users, Star, BarChart3 } from 'lucide-react';
import InvestmentForm from '@/app/components/InvestmentForm';
import AnimatedSection from '@/app/components/AnimatedSection';

export const metadata: Metadata = {
  title: 'Investimentos Imobiliários | Blueview Imóveis',
  description:
    'Cadastre-se e receba oportunidades exclusivas de investimento imobiliário de alto padrão em Balneário Camboriú e região.',
};

const benefits = [
  {
    icon: TrendingUp,
    title: 'Alta Valorização',
    description:
      'Itapema registra uma das maiores valorizações por m² do Brasil, com crescimento impulsionado pela demanda nacional e internacional.',
  },
  {
    icon: Shield,
    title: 'Patrimônio Real',
    description:
      'Imóveis são ativos tangíveis com proteção natural contra inflação e baixa correlação com a volatilidade dos mercados financeiros.',
  },
  {
    icon: MapPin,
    title: 'Localização Estratégica',
    description:
      'Balneário Camboriú e região concentram infraestrutura de alto padrão, acesso privilegiado ao mar e alta demanda por locação de temporada.',
  },
  {
    icon: Users,
    title: 'Atendimento Especializado',
    description:
      'Acompanhamos cada etapa — da identificação da oportunidade à escritura — com expertise local e foco no seu objetivo.',
  },
  {
    icon: Star,
    title: 'Acesso Antecipado',
    description:
      'Parceria direta com as principais incorporadoras garante acesso a lançamentos e oportunidades antes de chegarem ao mercado aberto.',
  },
  {
    icon: BarChart3,
    title: 'Renda e Valorização',
    description:
      'Imóveis de alto padrão na orla catarinense combinam renda consistente via temporada com histórico comprovado de valorização de capital.',
  },
];

export default function InvestirPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section
        className="pb-24 pt-36 px-4 text-white"
        style={{ background: 'linear-gradient(135deg, #07014f 0%, #0f0392 60%, #1f4fd1 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <span className="inline-block text-xs font-semibold px-4 py-2 rounded-full bg-white/20 mb-5">
              Área do Investidor
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
              Invista em imóveis de alto padrão no litoral catarinense
            </h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              Balneário Camboriú e região estão entre as regiões com maior valorização
              imobiliária do Brasil. Cadastre-se e receba oportunidades antes de chegarem ao mercado.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Por que investir com a Blueview?
            </h2>
            <p className="text-gray-500 mt-2">
              Expertise local, curadoria exclusiva e acesso direto aos melhores lançamentos da região.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 80} animation="fade-up">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#ecebfa' }}
                  >
                    <b.icon className="w-6 h-6" style={{ color: '#0f0392' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Receba oportunidades exclusivas
            </h2>
            <p className="text-gray-500">
              Preencha seus dados e nossa equipe de investimentos entrará em contato com as
              melhores oportunidades para o seu perfil.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <InvestmentForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
