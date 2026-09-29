'use client';

import Link from 'next/link';
import { MapPin, Car, BedDouble, Maximize2, Bookmark } from 'lucide-react';
import type { Property } from '@/app/lib/types';
import { formatCurrency } from '@/app/lib/utils';
import { useFavorites } from '@/app/hooks/useFavorites';
import ImageCarousel from '@/app/components/ImageCarousel';

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const favorited = isFavorite(property.id);

  const images = property.images?.length ? property.images : [];

  const area = property.area_private ?? property.area_total;
  const price = property.purpose === 'aluguel' ? property.rental_price : property.price;
  const isRental = property.purpose === 'aluguel';

  const specsLabel =
    property.suites > 0
      ? `${property.suites} suíte${property.suites > 1 ? 's' : ''}`
      : `${property.bedrooms} quarto${property.bedrooms !== 1 ? 's' : ''}`;

  return (
    <Link href={`/imoveis/${property.id}`} className="block group h-full">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Image carousel (arrastável) */}
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden flex-shrink-0">
          <ImageCarousel
            images={images}
            alt={property.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Bookmark top-right (sobreposto ao carrossel) */}
          <button
            onClick={(e) => { e.preventDefault(); toggle(property.id); }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow transition-colors z-20 ${
              favorited ? 'bg-[#0f0392] hover:bg-[#0a0270]' : 'bg-white/80 hover:bg-white'
            }`}
            aria-label={favorited ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
          >
            <Bookmark
              className="w-4 h-4 transition-colors"
              style={favorited ? { color: 'white', fill: 'white' } : { color: '#6b7280' }}
            />
          </button>
        </div>

        {/* Card body */}
        <div className="p-4 flex flex-col flex-1">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#0f0392' }} />
            <span className="truncate">
              {property.city}{property.neighborhood ? ` – ${property.neighborhood}` : ''}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-1">
            {property.title}
          </h3>

          {/* Property code */}
          {property.property_code && (
            <p className="text-xs text-gray-400 mb-3">{property.property_code}</p>
          )}

          {/* Specs */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto mb-3">
            {area && (
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5" />
                {area} m²
              </span>
            )}
            {property.parking_spots > 0 && (
              <span className="flex items-center gap-1">
                <Car className="w-3.5 h-3.5" />
                {property.parking_spots} {property.parking_spots === 1 ? 'vaga' : 'vagas'}
              </span>
            )}
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5" />
              {specsLabel}
            </span>
          </div>

          {/* Price */}
          <p className="font-bold text-lg mb-3" style={{ color: '#0f0392' }}>
            {price ? (
              <>
                {formatCurrency(price)}
                {isRental && <span className="text-sm font-normal text-gray-400">/mês</span>}
              </>
            ) : (
              <span className="text-gray-400 text-sm font-medium">Consulte o preço</span>
            )}
          </p>

          {/* CTA */}
          <button
            className="btn-outline w-full py-2.5 rounded-xl text-sm font-semibold"
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </Link>
  );
}
