import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/app/lib/types';
import { isExternalImage } from '@/app/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 ${
          featured ? 'flex flex-col md:flex-row' : ''
        }`}
      >
        {/* Image */}
        <div
          className={`relative bg-gray-100 ${
            featured
              ? 'md:w-1/2 aspect-video md:aspect-auto'
              : 'aspect-video'
          } overflow-hidden`}
        >
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
              unoptimized={isExternalImage(post.cover_image)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-5 ${featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''}`}>
          <span
            className="inline-block text-xs font-semibold px-2 py-1 rounded mb-3"
            style={{ backgroundColor: '#ecebfa', color: '#0f0392' }}
          >
            {post.category}
          </span>
          <h2
            className={`font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#0f0392] transition-colors ${
              featured ? 'text-xl md:text-2xl line-clamp-3' : 'text-base line-clamp-2'
            }`}
          >
            {post.title}
          </h2>
          {post.excerpt && (
            <p
              className={`text-gray-500 leading-relaxed ${
                featured ? 'text-sm line-clamp-3' : 'text-xs line-clamp-2'
              }`}
            >
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between mt-4">
            <time className="text-xs text-gray-400">
              {new Date(post.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span className="text-xs text-[#0f0392] font-medium group-hover:underline">
              Ler artigo →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
