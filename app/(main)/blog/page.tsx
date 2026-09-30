import type { Metadata } from 'next';
import { fetchBlogPosts } from '@/app/lib/rehut-api';
import BlogCard from '@/app/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog | Blueview Imóveis',
  description: 'Conteúdo sobre o mercado imobiliário de Balneário Camboriú e região. Tendências, análises e oportunidades exclusivas.',
};

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { page = '1', category } = await searchParams;

  const data = await fetchBlogPosts({
    page: parseInt(page, 10),
    limit: 10,
    category,
  });

  const { data: posts, pagination } = data;
  const featured = posts[0];
  const rest = posts.slice(1);

  function buildPageUrl(p: number) {
    const q = new URLSearchParams();
    q.set('page', String(p));
    if (category) q.set('category', category);
    return `/blog?${q.toString()}`;
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Insights Blueview</h1>
          <p className="text-gray-500 mt-2">
            Tendências e análises sobre o mercado imobiliário do litoral catarinense
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Em breve, conteúdo exclusivo sobre o mercado imobiliário de Balneário Camboriú e região.</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <div className="mb-10">
                <BlogCard post={featured} featured />
              </div>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {rest.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.total_pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {pagination.has_prev && (
                  <a href={buildPageUrl(parseInt(page) - 1)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white">
                    ← Anterior
                  </a>
                )}
                {Array.from({ length: pagination.total_pages }, (_, i) => i + 1)
                  .filter((p) => Math.abs(p - parseInt(page)) <= 2)
                  .map((p) => (
                    <a
                      key={p}
                      href={buildPageUrl(p)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        p === parseInt(page) ? 'text-white' : 'border border-gray-200 text-gray-700 hover:bg-white'
                      }`}
                      style={p === parseInt(page) ? { backgroundColor: '#ff751f' } : {}}
                    >
                      {p}
                    </a>
                  ))}
                {pagination.has_next && (
                  <a href={buildPageUrl(parseInt(page) + 1)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white">
                    Próxima →
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
