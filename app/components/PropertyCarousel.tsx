'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Property } from '@/app/lib/types';
import PropertyCard from './PropertyCard';

const ACCENT = '#0f0392';

/** Espaçamento entre os cards. Precisa bater com o `gap-5` aplicado no track. */
const GAP_PX = 20;

interface Props {
  properties: Property[];
  title: string;
  subtitle?: string;
  viewAllHref?: string;
}

export default function PropertyCarousel({ properties, title, subtitle, viewAllHref }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(Math.max(0, properties.length - 1));

  /**
   * Largura de um passo (card + gap), medida no DOM.
   *
   * A versão anterior movia o track por um `translateX` com o passo cravado como
   * `100% / 3 + 20px / 3 * 2` — calibrado só para o layout de 3 colunas do desktop. No mobile,
   * onde o card ocupa a largura inteira, cada clique na seta andava um terço de card.
   */
  const stepSize = useCallback(() => {
    const first = trackRef.current?.firstElementChild as HTMLElement | undefined;
    return first ? first.getBoundingClientRect().width + GAP_PX : 0;
  }, []);

  /** Mantém bolinhas e setas em sincronia com a posição real do scroll (inclusive após swipe). */
  const sync = useCallback(() => {
    const track = trackRef.current;
    const step = stepSize();
    if (!track || !step) return;
    setIndex(Math.round(track.scrollLeft / step));
    setMaxIndex(Math.max(0, Math.round((track.scrollWidth - track.clientWidth) / step)));
  }, [stepSize]);

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const step = stepSize();
    if (!track || !step) return;
    track.scrollTo({ left: Math.max(0, i) * step, behavior: 'smooth' });
  };

  if (!properties.length) return null;

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-sm font-semibold hidden sm:block shrink-0 ml-4 hover:underline"
              style={{ color: ACCENT }}
            >
              Ver todos →
            </Link>
          )}
        </div>

        {/* Carousel track */}
        <div className="relative">
          {/* Prev button */}
          <button
            onClick={() => goTo(index - 1)}
            disabled={!canPrev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow items-center justify-center transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed hidden sm:flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/*
            O próprio track rola: scroll-snap dá o arrasto com inércia nativo do mobile, que é o
            que o usuário espera do gesto, e as setas viram apenas um `scrollTo`. A barra de
            rolagem fica escondida para não poluir o desktop.
          */}
          <div
            ref={trackRef}
            onScroll={sync}
            className="flex gap-5 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {properties.map((p) => (
              <div
                key={p.id}
                className="snap-start flex-none w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              >
                <PropertyCard property={p} />
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => goTo(index + 1)}
            disabled={!canNext}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow items-center justify-center transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed hidden sm:flex"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Dots — uma por posição alcançável, não por imóvel: com 3 cards visíveis de 6, só
            existem 4 paradas, e bolinhas a mais nunca ficariam ativas. */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="w-2 h-2 rounded-full transition-colors"
                style={{ backgroundColor: i === index ? ACCENT : '#d1d5db' }}
                aria-label={`Ir para item ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
