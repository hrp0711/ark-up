import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  Search,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { faqs } from '@/data';
import { useScrollAnimation } from '@/hooks';
import { SEOHead, createFAQSchema, organizationSchema } from '@/components/SEOHead';

const categories = [
  { id: 'all', label: 'Todas', count: faqs.length },
  { id: 'general', label: 'General', count: faqs.filter(f => f.category === 'general').length },
  { id: 'cursos', label: 'Cursos', count: faqs.filter(f => f.category === 'cursos').length },
  { id: 'padres', label: 'Para Padres', count: faqs.filter(f => f.category === 'padres').length },
  { id: 'pagos', label: 'Pagos', count: faqs.filter(f => f.category === 'pagos').length },
  { id: 'colegios', label: 'Colegios', count: faqs.filter(f => f.category === 'colegios').length },
];

const categoryLabels: Record<string, string> = {
  general: 'General',
  cursos: 'Cursos',
  padres: 'Para Padres',
  pagos: 'Pagos',
  colegios: 'Colegios',
};

export function FAQPage() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  // Generate FAQ schema for structured data
  const faqSchema = createFAQSchema(faqs.map(f => ({ question: f.question, answer: f.answer })));

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <SEOHead
        title="Preguntas Frecuentes - Ark-Up"
        description="Encuentra respuestas a las preguntas más comunes sobre Ark-Up, nuestros cursos de educación financiera para niños, precios, métodos de pago y más."
        canonical="/faq"
        schema={[organizationSchema, faqSchema]}
      />
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-ark-blue-50 via-white to-ark-green-50">
        <div className="ark-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-blue/10 text-ark-blue text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              <span>Centro de Ayuda</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ark-navy mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Encuentra respuestas a las preguntas más comunes sobre Ark-Up, nuestros cursos y servicios.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar preguntas..."
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section ref={ref} className="py-20 bg-white">
        <div className="ark-container">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-ark-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeCategory === category.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openItems.includes(faq.id);
                
                return (
                  <div
                    key={faq.id}
                    className={`bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen ? 'ring-2 ring-ark-blue/20' : ''
                    } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 rounded-full bg-white text-xs text-gray-500">
                          {categoryLabels[faq.category]}
                        </span>
                        <span className="font-heading font-semibold text-ark-navy">
                          {faq.question}
                        </span>
                      </div>
                      <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-5 h-5 text-ark-blue" />
                      </div>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-ark-navy mb-2">
                  No encontramos resultados
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta con otras palabras o contacta directamente con nuestro equipo de soporte.
                </p>
                <Link to="/contacto">
                  <Button>Contactar Soporte</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-50">
        <div className="ark-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-ark-blue to-ark-purple text-white">
                <MessageCircle className="w-12 h-12 mb-6" />
                <h3 className="font-heading text-2xl font-bold mb-4">
                  ¿No encontraste tu respuesta?
                </h3>
                <p className="text-white/80 mb-8">
                  Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <p className="font-medium">soporte@arkup.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Teléfono</p>
                      <p className="font-medium">+52 1 234 567 890</p>
                    </div>
                  </div>
                </div>

                <Link to="/contacto" className="mt-8 inline-block">
                  <Button className="bg-white text-ark-blue hover:bg-gray-100">
                    Contactar Soporte
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Quick Links */}
              <div className="p-8 rounded-3xl bg-white shadow-soft">
                <h3 className="font-heading text-xl font-bold text-ark-navy mb-6">
                 Enlaces útiles
                </h3>
                <div className="space-y-3">
                  <Link to="/cursos" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-ark-blue/5 transition-colors">
                    <span className="text-gray-700">Ver todos los cursos</span>
                    <ArrowRight className="w-5 h-5 text-ark-blue" />
                  </Link>
                  <Link to="/productos" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-ark-blue/5 transition-colors">
                    <span className="text-gray-700">Explorar productos</span>
                    <ArrowRight className="w-5 h-5 text-ark-blue" />
                  </Link>
                  <Link to="/colegios" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-ark-blue/5 transition-colors">
                    <span className="text-gray-700">Programas para colegios</span>
                    <ArrowRight className="w-5 h-5 text-ark-blue" />
                  </Link>
                  <Link to="/contacto" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-ark-blue/5 transition-colors">
                    <span className="text-gray-700">Centro de contacto</span>
                    <ArrowRight className="w-5 h-5 text-ark-blue" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
