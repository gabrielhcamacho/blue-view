import BlogCardSkeleton from '@/app/components/BlogCardSkeleton';

// Skeleton do blog — espelha app/(main)/blog/page.tsx (cabeçalho, post em destaque, grade).
export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="h-9 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-gray-200 rounded mt-3 animate-pulse" />
        </div>

        {/* Post em destaque */}
        <div className="mb-10">
          <BlogCardSkeleton featured />
        </div>

        {/* Grade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
