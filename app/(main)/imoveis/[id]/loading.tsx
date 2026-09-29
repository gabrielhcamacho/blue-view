// Skeleton da página de detalhe do imóvel — espelha app/(main)/imoveis/[id]/page.tsx
// (galeria + miniaturas, card de info com specs e descrição, card de contato sticky).
export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        {/* Voltar */}
        <div className="h-4 w-40 bg-gray-200 rounded mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Esquerda: galeria + info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galeria */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-video bg-gray-200" />
              <div className="flex gap-2 p-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-16 h-12 rounded bg-gray-200 flex-shrink-0" />
                ))}
              </div>
            </div>

            {/* Card de info */}
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-gray-200 rounded" />
                <div className="h-6 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-6 w-2/3 bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-5 h-5 bg-gray-200 rounded" />
                    <div className="h-5 w-10 bg-gray-200 rounded" />
                    <div className="h-3 w-12 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-5/6 bg-gray-200 rounded" />
                <div className="h-3 w-2/3 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* Direita: card de contato sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="h-8 w-1/2 bg-gray-200 rounded" />
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
              <div className="h-10 w-full bg-gray-200 rounded mt-2" />
              <div className="h-10 w-full bg-gray-200 rounded" />
              <div className="h-10 w-full bg-gray-200 rounded" />
              <div className="h-11 w-full bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
