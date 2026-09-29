'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import type { SiteConfig } from '@/app/lib/types';
import { whatsappUrl } from '@/app/lib/utils';

const propertyCategories = [
  { label: 'Todo o portfólio', href: '/imoveis' },
  { label: 'Imóveis à venda', href: '/imoveis?purpose=venda' },
  { label: 'Imóveis para alugar', href: '/imoveis?purpose=aluguel' },
  { label: 'Lançamentos', href: '/imoveis?status_imovel=lancamento' },
  { label: 'Coberturas', href: '/imoveis?tipo_apt=cobertura' },
  { label: 'Investimentos', href: '/investir' },
];

interface HeaderProps {
  config?: SiteConfig;
}

export default function Header({ config }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = () => {
    if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownCloseTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';
  // Menu mobile aberto usa fundo branco, então o header precisa acompanhar
  // (senão a logo branca ficaria invisível sobre ele).
  const solid = !isHome || scrolled || mobileOpen;

  useEffect(() => {
    if (!isHome) return;
    const fn = () => setScrolled(window.scrollY > 10);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [isHome]);

  const whatsappLink = config?.whatsapp
    ? whatsappUrl(config.whatsapp, 'Olá! Gostaria de falar com um corretor.')
    : '/contato';

  // Sobre o hero (home, topo) o header é transparente e usa a logo em branco;
  // ao rolar e nas páginas internas vira branco sólido com a logo colorida.
  const navLink = solid
    ? 'text-gray-600 hover:text-[#0f0392]'
    : 'text-white/80 hover:text-white';
  const logoClass = solid ? '' : 'brightness-0 invert';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b ${
        solid ? 'border-gray-200' : 'border-white/10'
      }`}
      style={{
        backgroundColor: solid ? '#ffffff' : 'rgba(0,0,0,0.00)',
        backdropFilter: 'blur(20px)',
        transition: 'background-color 300ms ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-column grid: nav | logo | actions */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center h-20">
          {/* Left: nav links */}
          <nav className="flex items-center gap-6">
            <Link href="/blog" className={`${navLink} text-sm font-medium transition-colors whitespace-nowrap`}>
              Blog
            </Link>

            <Link href="/sobre" className={`${navLink} text-sm font-medium transition-colors whitespace-nowrap`}>
              Sobre
            </Link>

            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button className={`flex items-center gap-1 ${navLink} text-sm font-medium transition-colors whitespace-nowrap`}>
                Ver imóveis
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-52 rounded-lg shadow-xl py-2 z-50 border border-gray-200"
                  style={{ backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)' }}
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  {propertyCategories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#0f0392] transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/investir"
              className={`${navLink} text-sm font-medium transition-colors whitespace-nowrap`}
            >
              Área do investidor
            </Link>
          </nav>

          {/* Center: logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/logo-blueview.png"
                alt="Blueview Imóveis"
                width={95}
                height={64}
                className={`h-16 w-auto ${logoClass}`}
                priority
              />
            </Link>
          </div>

          {/* Right: CTAs */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/favoritos"
              className={`flex items-center gap-1.5 ${navLink} text-sm transition-colors`}
            >
              <Heart className="w-4 h-4" />
              Meus favoritos
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* Mobile header */}
        <div className="flex md:hidden items-center justify-between h-16">
          <Link href="/">
            <Image
              src="/logo-blueview.png"
              alt="Blueview Imóveis"
              width={77}
              height={52}
              className={`h-13 w-auto ${logoClass}`}
              priority
            />
          </Link>
          <button
            className={`p-2 ${solid ? 'text-gray-700' : 'text-white/80'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-gray-200"
          style={{ backgroundColor: 'rgba(255,255,255,0.98)' }}
        >
          <div className="px-4 py-4 space-y-3">
            <Link href="/blog" className="block text-gray-600 hover:text-[#0f0392] font-medium" onClick={() => setMobileOpen(false)}>
              Blog
            </Link>
            <Link href="/sobre" className="block text-gray-600 hover:text-[#0f0392] font-medium" onClick={() => setMobileOpen(false)}>
              Sobre
            </Link>
            <Link href="/imoveis" className="block text-gray-600 hover:text-[#0f0392] font-medium" onClick={() => setMobileOpen(false)}>
              Ver imóveis
            </Link>
            {propertyCategories.slice(1).map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="block text-sm text-gray-400 hover:text-[#0f0392] pl-4"
                onClick={() => setMobileOpen(false)}
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/investir"
              className="block text-gray-600 hover:text-[#0f0392] font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Área do investidor
            </Link>
            <Link
              href="/favoritos"
              className="flex items-center gap-1.5 text-gray-600 hover:text-[#0f0392] font-medium"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="w-4 h-4" />
              Meus favoritos
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-4 py-2.5 rounded-lg text-sm font-semibold text-center block mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
