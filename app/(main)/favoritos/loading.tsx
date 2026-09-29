import PropertyCardSkeleton from '@/app/components/PropertyCardSkeleton';

// Skeleton dos favoritos — espelha app/(main)/favoritos/page.tsx (breadcrumb, título, grade).
export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="h-4 w-44 bg-gray-200 rounded mb-6 animate-pulse" />
        <div className="h-7 w-48 bg-gray-200 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
