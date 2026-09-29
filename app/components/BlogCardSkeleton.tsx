// Skeleton com o mesmo formato do BlogCard (imagem 16:9, categoria, título, excerto, data).
export default function BlogCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <article
      className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse ${
        featured ? 'flex flex-col md:flex-row' : ''
      }`}
    >
      <div
        className={`relative bg-gray-200 ${
          featured ? 'md:w-1/2 aspect-video md:aspect-auto md:min-h-[280px]' : 'aspect-video'
        }`}
      />
      <div className={`p-5 ${featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''}`}>
        <div className="h-5 w-20 bg-gray-200 rounded mb-3" />
        <div className={`bg-gray-200 rounded mb-2 ${featured ? 'h-6 w-3/4' : 'h-4 w-3/4'}`} />
        <div className="h-3 w-full bg-gray-200 rounded mb-1.5" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
        <div className="flex items-center justify-between mt-4">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </article>
  );
}
