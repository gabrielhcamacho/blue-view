import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { fetchSiteConfig } from '@/app/lib/rehut-api';
import { whatsappUrl } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: 'Contato | Blueview Imóveis',
  description: 'Fale com os especialistas da Blueview Imóveis. Atendimento de segunda à domingo, das 8h às 19h.',
};

export default async function ContatoPage() {
  const config = await fetchSiteConfig();

  const waLink = config.whatsapp
    ? whatsappUrl(config.whatsapp, 'Olá! Gostaria de mais informações sobre imóveis.')
    : '#';

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Fale diretamente com um corretor</h1>
          <p className="text-gray-500 text-lg">
            Reunimos um time de especialistas preparados para auxiliar em tudo que você precisar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contato cards */}
          <div className="space-y-4">
            {config.whatsapp && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#0f0392] transition-colors group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#ecebfa' }}
                >
                  <MessageCircle className="w-6 h-6" style={{ color: '#0f0392' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-[#0f0392] transition-colors">
                    WhatsApp
                  </p>
                  <p className="text-gray-500 text-sm mt-0.5">{config.whatsapp}</p>
                  <p className="text-xs text-gray-400 mt-1">Clique para abrir o WhatsApp</p>
                </div>
              </a>
            )}

            {config.phone && (
              <a
                href={`tel:${config.phone}`}
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#0f0392] transition-colors group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#ecebfa' }}
                >
                  <Phone className="w-6 h-6" style={{ color: '#0f0392' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-[#0f0392] transition-colors">
                    Telefone
                  </p>
                  <p className="text-gray-500 text-sm mt-0.5">{config.phone}</p>
                </div>
              </a>
            )}

            {config.email && (
              <a
                href={`mailto:${config.email}`}
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#0f0392] transition-colors group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#ecebfa' }}
                >
                  <Mail className="w-6 h-6" style={{ color: '#0f0392' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-[#0f0392] transition-colors">
                    E-mail
                  </p>
                  <p className="text-gray-500 text-sm mt-0.5">{config.email}</p>
                </div>
              </a>
            )}

            {config.branches?.map((branch) => (
              <div
                key={branch.label}
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#ecebfa' }}
                >
                  <MapPin className="w-6 h-6" style={{ color: '#0f0392' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{branch.label}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{branch.address}</p>
                </div>
              </div>
            ))}

            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#ecebfa' }}
              >
                <Clock className="w-6 h-6" style={{ color: '#0f0392' }} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Horário de atendimento</p>
                <p className="text-gray-500 text-sm mt-0.5">Segunda à domingo, das 8h às 19h</p>
              </div>
            </div>
          </div>

          {/* CTA panel */}
          <div
            className="rounded-xl p-8 text-white flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #0a0270 0%, #0f0392 100%)' }}
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">Encontre o imóvel ideal</h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Especializada em imóveis de médio e alto padrão em Itapema, Porto Belo,
                Balneário Camboriú e Praia Brava. Do primeiro contato à escritura, nossa
                equipe acompanha cada etapa.
              </p>
            </div>
            <div className="space-y-3">
              {config.whatsapp && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar pelo WhatsApp
                </a>
              )}
              <Link
                href="/imoveis"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold border-2 border-white/40 text-white transition-colors hover:bg-white/10"
              >
                Ver imóveis disponíveis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
