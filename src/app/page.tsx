'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DepartamentosPage from '../components/departamentos/DepartamentosPage';
import MunicipiosPage from '../components/municipios/MunicipiosPage';
import ColegiosPage from '../components/colegios/ColegiosPage';
import SedesPage from '../components/sedes/SedesPage';
import { usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getComponent = () => {
    switch (pathname) {
      case '/departamentos':
        return <DepartamentosPage />;
      case '/municipios':
        return <MunicipiosPage />;
      case '/colegios':
        return <ColegiosPage />;
      case '/sedes':
        return <SedesPage />;
      default:
        return (
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-20">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-blue-900 mb-4 sm:mb-8 leading-tight">
                Bienvenido al Sistema de Gestión Escolar
              </h1>
              <p className="text-lg sm:text-2xl text-gray-700 max-w-3xl mx-auto px-4">
                Una plataforma integral diseñada para simplificar y optimizar la administración de instituciones educativas
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-12 sm:mb-20 px-4">
              {/* Tarjeta de Colegios */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-blue-100 hover:shadow-3xl transition-shadow duration-300">
                <div className="h-16 w-16 bg-blue-100 rounded-3xl flex items-center justify-center mb-8">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-blue-900 mb-6">Colegios</h3>
                <p className="text-lg text-gray-600 mb-8">Gestiona la información de las instituciones educativas de manera eficiente y centralizada.</p>
                <Link href="/colegios" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors">
                  Administrar Colegios
                  <svg className="ml-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Tarjeta de Sedes */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-blue-100 hover:shadow-3xl transition-shadow duration-300">
                <div className="h-16 w-16 bg-blue-100 rounded-3xl flex items-center justify-center mb-8">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-blue-900 mb-6">Sedes</h3>
                <p className="text-lg text-gray-600 mb-8">Controla y administra las diferentes sedes y sus características específicas.</p>
                <Link href="/sedes" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors">
                  Administrar Sedes
                  <svg className="ml-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Tarjeta de Municipios */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-blue-100 hover:shadow-3xl transition-shadow duration-300">
                <div className="h-16 w-16 bg-blue-100 rounded-3xl flex items-center justify-center mb-8">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-blue-900 mb-6">Municipios</h3>
                <p className="text-lg text-gray-600 mb-8">Organiza y gestiona las instituciones por su ubicación geográfica.</p>
                <Link href="/municipios" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors">
                  Administrar Municipios
                  <svg className="ml-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Tarjeta de Departamentos */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-blue-100 hover:shadow-3xl transition-shadow duration-300">
                <div className="h-16 w-16 bg-blue-100 rounded-3xl flex items-center justify-center mb-8">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-blue-900 mb-6">Departamentos</h3>
                <p className="text-lg text-gray-600 mb-8">Gestiona los departamentos y su relación con las instituciones educativas.</p>
                <Link href="/departamentos" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors">
                  Administrar Departamentos
                  <svg className="ml-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* How to Start Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl sm:rounded-4xl shadow-2xl overflow-hidden mx-4">
              <div className="px-6 py-10 sm:p-20">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12">¿Cómo comenzar?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div className="flex-shrink-0 h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-4">Navega</h3>
                      <p className="text-blue-100 text-lg">Accede a la sección deseada usando el menú de navegación superior</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div className="flex-shrink-0 h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      2
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-4">Gestiona</h3>
                      <p className="text-blue-100 text-lg">Agrega, edita o elimina registros según tus necesidades</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div className="flex-shrink-0 h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      3
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-4">Organiza</h3>
                      <p className="text-blue-100 text-lg">Mantén la información actualizada y bien estructurada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Barra de navegación */}
      <nav className="bg-white shadow-lg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-16 sm:h-20">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="text-2xl sm:text-3xl font-bold text-blue-900 hover:text-blue-700 transition-colors">
                  Colegio App
                </Link>
              </div>
              
              {/* Enlaces de navegación desktop */}
              <div className="hidden sm:flex ml-12 items-center space-x-8">
                <Link
                  href="/departamentos"
                  className={`px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                    pathname === '/departamentos'
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Departamentos
                </Link>
                <Link
                  href="/municipios"
                  className={`px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                    pathname === '/municipios'
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Municipios
                </Link>
                <Link
                  href="/colegios"
                  className={`px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                    pathname === '/colegios'
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Colegios
                </Link>
                <Link
                  href="/sedes"
                  className={`px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                    pathname === '/sedes'
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Sedes
                </Link>
              </div>
            </div>
            
            {/* Botón menú móvil */}
            <div className="sm:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-blue-900 hover:text-blue-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Menú móvil */}
          {isMenuOpen && (
            <div className="sm:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
              <div className="px-4 py-2 space-y-1">
                <Link
                  href="/departamentos"
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    pathname === '/departamentos'
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Departamentos
                </Link>
                <Link
                  href="/municipios"
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    pathname === '/municipios'
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Municipios
                </Link>
                <Link
                  href="/colegios"
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    pathname === '/colegios'
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Colegios
                </Link>
                <Link
                  href="/sedes"
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    pathname === '/sedes'
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sedes
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="bg-transparent">
        {getComponent()}
      </main>
    </div>
  );
}