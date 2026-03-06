import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { Chatbot } from '@/components/ui-custom';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import './App.css';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const CursosPage = lazy(() => import('@/pages/CursosPage').then(m => ({ default: m.CursosPage })));
const ProductosPage = lazy(() => import('@/pages/ProductosPage').then(m => ({ default: m.ProductosPage })));
const ColegiosPage = lazy(() => import('@/pages/ColegiosPage').then(m => ({ default: m.ColegiosPage })));
const NosotrosPage = lazy(() => import('@/pages/NosotrosPage').then(m => ({ default: m.NosotrosPage })));
const FAQPage = lazy(() => import('@/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const ContactoPage = lazy(() => import('@/pages/ContactoPage').then(m => ({ default: m.ContactoPage })));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div 
          className="w-12 h-12 border-4 border-ark-blue border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
        <span className="text-gray-600 font-medium">Cargando...</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <ScrollProgressBar />
        <Navbar />
        
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cursos" element={<CursosPage />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route path="/colegios" element={<ColegiosPage />} />
              <Route path="/nosotros" element={<NosotrosPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
