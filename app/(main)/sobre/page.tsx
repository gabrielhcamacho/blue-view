import type { Metadata } from 'next';
import { Building2, TrendingUp, Users, Award } from 'lucide-react';
import Image from 'next/image';
import AnimatedSection from '@/app/components/AnimatedSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre a Blueview | Quem Somos',
  description:
    'A Blueview transforma oportunidades do mercado imobiliário em patrimônio, rentabilidade e qualidade de vida. Imóveis de médio e alto padrão no litoral catarinense.',
};

const pillars = [
  {
    icon: TrendingUp,
    title: 'Inteligência Imobiliária',
    description:
      'Cada oportunidade é analisada com foco em valorização, liquidez, potencial de rentabilidade e segurança patrimonial, permitindo que cada decisão seja tomada com confiança e visão de longo prazo.',
  },
  {
    icon: Award,
    title: 'Transparência, Ética e Relacionamento',
    description:
      'Nossa atuação é baseada em transparência, ética e relacionamento — pilares que sustentam negociações que geram valor real para clientes, parceiros e construtoras.',
  },
  {
    icon: Users,
    title: 'Equipe Altamente Qualificada',
    description:
      'Uma equipe preparada para compreender os objetivos de cada cliente e oferecer soluções alinhadas ao seu momento de vida ou à sua estratégia de investimento.',
  },
  {
    icon: Building2,
    title: 'Atendimento Consultivo',
    description:
      'Acompanhamos cada cliente de perto, da primeira visita à entrega das chaves, com acesso às melhores oportunidades do mercado.',
  },
];

export default function SobrePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section
        className="pb-24 pt-36 px-4 text-white"
        style={{ background: 'linear-gradient(135deg, #07014f 0%, #0f0392 60%, #1f4fd1 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold px-4 py-2 rounded-full bg-white/20 mb-5 tracking-wider uppercase">
              Quem Somos
            </span>
          <AnimatedSection animation="fade-up">
            <div className="flex justify-center mb-16">
              <Image
                src="/logo-blueview.png"
                alt="Blueview Imóveis"
                width={240}
                height={161}
                className="brightness-0 invert"
                priority
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Sobre a Blueview
            </h1>
            <p className="text-2xl font-light text-white/90 mb-6">
              Imóveis com vista para o litoral catarinense
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Transformamos oportunidades do mercado imobiliário em patrimônio, rentabilidade
              e qualidade de vida para nossos clientes.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Origin story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection animation="fade-up">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              A <strong className="text-gray-900">Blueview</strong> transforma
              oportunidades do mercado imobiliário em patrimônio, rentabilidade e qualidade de vida
              para seus clientes.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Especializada em imóveis de médio e alto padrão, atua nas regiões mais valorizadas do
              litoral catarinense: <strong className="text-gray-900">Itapema, Porto Belo,
              Balneário Camboriú e Praia Brava</strong>, conectando investidores e famílias aos
              empreendimentos das construtoras mais sólidas e reconhecidas da região.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Mais do que intermediar negociações, a Blueview oferece <strong className="text-gray-900">inteligência
              imobiliária</strong>. Cada oportunidade é analisada com foco em valorização, liquidez,
              potencial de rentabilidade e segurança patrimonial, permitindo que cada decisão seja
              tomada com confiança e visão de longo prazo.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Nossa atuação é baseada em transparência, ética e relacionamento. Contamos com uma
              equipe altamente qualificada, preparada para compreender os objetivos de cada cliente e
              oferecer soluções alinhadas ao seu momento de vida ou estratégia de investimento.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nosso compromisso é construir uma reputação sólida entregando
              atendimento consultivo, acesso às melhores oportunidades do mercado e negociações que
              geram valor real.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Nossa atuação é fundamentada em
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 80} animation="fade-up">
                <div className="bg-white rounded-xl p-6 border border-gray-100 h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#ecebfa' }}
                  >
                    <p.icon className="w-6 h-6" style={{ color: '#0f0392' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Region context */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection animation="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              O mercado certo, no momento certo
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Itapema, Porto Belo, Balneário Camboriú e Praia Brava consolidaram-se como destinos de
              destaque nacional, atraindo investidores, empresários e famílias que buscam qualidade de
              vida aliada a um dos mercados imobiliários mais sólidos e valorizados do país.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Nesse cenário, experiência, relacionamento e inteligência de mercado fazem toda a
              diferença. Por isso, a Blueview posiciona-se como <strong className="text-gray-900">parceira
              estratégica</strong> de seus clientes, acompanhando cada etapa da jornada de investimento e
              oferecendo suporte na construção de patrimônio de forma consistente, segura e sustentável.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Acreditamos que investir em imóveis vai além da aquisição de um bem. Trata-se de tomar
              decisões inteligentes, fundamentadas em informação, estratégia e visão de longo prazo.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center">
            <p className="text-gray-500 text-lg mb-2">Nosso compromisso é</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Transformar oportunidades em resultados
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto">
              Conectando nossos clientes aos melhores ativos imobiliários da região e contribuindo
              para a construção de patrimônio, geração de rentabilidade e realização de objetivos.
            </p>
            <p className="text-xl font-semibold mb-8" style={{ color: '#0f0392' }}>
              Blueview Imóveis. Viva com vista para o mar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/imoveis"
                className="btn-primary inline-block px-6 py-3 rounded-xl text-sm font-semibold"
              >
                Ver portfólio de imóveis
              </Link>
              <Link
                href="/investir"
                className="btn-outline inline-block px-6 py-3 rounded-xl text-sm font-semibold"
              >
                Área do investidor
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
