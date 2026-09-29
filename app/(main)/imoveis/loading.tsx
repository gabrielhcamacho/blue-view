import PropertyCardSkeleton from '@/app/components/PropertyCardSkeleton';

// Skeleton da listagem de imóveis — espelha app/(main)/imoveis/page.tsx
// (barra de filtros sticky, breadcrumb, chips, contador e grade de cards).
export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* Barra de filtros sticky (mesmo fallback usado no Suspense da página) */}
      <div className="sticky top-20 z-40">
        <div className="h-14 bg-white border-b border-gray-200" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12">
        {/* Breadcrumb */}
        <div className="h-4 w-40 bg-gray-200 rounded mb-4 animate-pulse" />

        {/* Feature chips */}
        <div className="flex gap-2 mb-5 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-28 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
          ))}
        </div>

        {/* Contador de resultados */}
        <div className="h-8 w-56 bg-gray-200 rounded mb-6 animate-pulse" />

        {/* Grade de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
          {Array.from({ length: 9 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
