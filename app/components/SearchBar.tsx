'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export interface SearchBarProps {
  /** When true, strips the outer white card — use inside a colored hero card */
  naked?: boolean;
}

const cities = [
  { label: 'Itapema', value: 'Itapema' },
  { label: 'Balneário Camboriú', value: 'Balneário Camboriú' },
];

const propertyTypes = [
  { label: 'Todos os tipos', value: '' },
  { label: 'Apartamento', value: 'apartamento' },
  { label: 'Cobertura', value: 'cobertura' },
  { label: 'Flat / Studio', value: 'flat' },
  { label: 'Duplex', value: 'duplex' },
  { label: 'Garden', value: 'garden' },
  { label: 'Terreno', value: 'terreno' },
];

const statusOptions = [
  { label: 'Todos', value: '' },
  { label: 'Na planta', value: 'lancamento' },
  { label: 'Mobiliado', value: 'pronto_mobiliado' },
  { label: 'Sem mobília', value: 'pronto' },
];

const priceRanges = [
  { label: 'Qualquer valor', value: '' },
  { label: 'Até R$ 500 mil', value: 'ate500' },
  { label: 'R$ 500 mil a R$ 1 mi', value: '500_1000' },
  { label: 'R$ 1 mi a R$ 1,5 mi', value: '1000_1500' },
  { label: 'R$ 1,5 mi a R$ 3 mi', value: '1500_3000' },
  { label: 'R$ 3 mi a R$ 5 mi', value: '3000_5000' },
  { label: 'R$ 5 mi a R$ 10 mi', value: '5000_10000' },
  { label: 'Acima de R$ 10 mi', value: 'acima10000' },
];

export default function SearchBar({ naked = false }: SearchBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [status, setStatus] = useState('');
  const [faixaPreco, setFaixaPreco] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    if (city) params.set('city', city);
    if (propertyType) params.set('tipo_apt', propertyType);
    if (status) params.set('status_imovel', status);
    if (faixaPreco) params.set('faixa_preco', faixaPreco);
    router.push(`/imoveis?${params.toString()}`);
  };

  const labelClass = naked
    ? 'block text-xs font-medium text-white/70 mb-1'
    : 'block text-xs font-medium text-gray-500 mb-1';

  const inputClass = naked
    ? 'w-full pl-9 pr-3 py-2.5 border border-white/20 rounded-lg text-sm text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/40'
    : 'w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#0f0392]';

  const inner = (
    <>
      {/* Busca por nome do imóvel */}
      <div className="mb-3">
        <label className={labelClass}>Nome do imóvel</label>
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${naked ? 'text-white/60' : 'text-gray-400'}`} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            placeholder="Ex.: Residencial Marina, Infinity Coast..."
            className={inputClass}
          />
        </div>
      </div>

      {/* Filters grid — 2 cols on mobile, 2 on tablet, search btn full row */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className={labelClass}>Localização</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#0f0392]"
          >
            <option value="">Qual a localização?</option>
            {cities.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Tipo de imóvel</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#0f0392]"
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Status do imóvel</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#0f0392]"
          >
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Faixa de valor</label>
          <select
            value={faixaPreco}
            onChange={(e) => setFaixaPreco(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#0f0392]"
          >
            {priceRanges.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold mb-3"
      >
        <Search className="w-4 h-4" />
        Buscar
      </button>

      <div className="flex items-center gap-4 text-xs">
        <a
          href="/imoveis"
          className={`font-medium hover:underline ${naked ? 'text-white/70' : ''}`}
          style={naked ? {} : { color: '#0f0392' }}
        >
          Pesquisa Avançada →
        </a>
      </div>
    </>
  );

  if (naked) return <div className="w-full">{inner}</div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 w-full max-w-4xl mx-auto">
      {inner}
    </div>
  );
}
