'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/app/hooks/useFavorites';
import PropertyCard from '@/app/components/PropertyCard';
import type { Property } from '@/app/lib/types';

interface Props {
  allProperties: Property[];
}

export default function FavoritosClient({ allProperties }: Props) {
  const { favorites } = useFavorites();

  const favProperties = allProperties.filter((p) => favorites.includes(p.id));

  if (favorites.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
          <Heart className="w-8 h-8 text-gray-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Nenhum favorito ainda</h2>
        <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
          Salve imóveis clicando no ícone de marcador em qualquer card para encontrá-los aqui.
        </p>
        <Link
          href="/imoveis"
          className="btn-primary inline-block px-6 py-2.5 rounded-xl text-sm font-semibold"
        >
          Explorar imóveis
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-3xl font-bold text-gray-900">{favProperties.length}</span>
        <span className="text-gray-500 text-sm">
          imóvel{favProperties.length !== 1 ? 'is' : ''} salvo{favProperties.length !== 1 ? 's' : ''}
        </span>
      </div>

      {favProperties.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-400 text-sm">
            Os imóveis que você salvou não estão mais disponíveis no portfólio.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
          {favProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </>
  );
}
