import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { fetchAllProperties } from '@/app/lib/rehut-api';
import FavoritosClient from './FavoritosClient';

export const metadata: Metadata = {
  title: 'Meus Favoritos | Blueview Imóveis',
  description: 'Imóveis salvos por você na Blueview Imóveis.',
};

export default async function FavoritosPage() {
  const raw = await fetchAllProperties({});

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">Início</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-medium">Meus Favoritos</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">Meus Favoritos</h1>

        <Suspense fallback={<div className="text-gray-400 text-sm">Carregando...</div>}>
          <FavoritosClient allProperties={raw.data} />
        </Suspense>
      </div>
    </div>
  );
}
