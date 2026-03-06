import { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks';
import { Button } from '@/components/ui/button';
import { faqs } from '@/data';

const categories = ['Todas', 'general', 'cursos', 'padres', 'pagos', 'colegios'];

const categoryLabels: Record<string, string> = {
  'Todas': 'Todas',
  'general': 'General',
  'cursos': 'Cursos',
  'padres': 'Para Padres',
  'pagos': 'Pagos',
  'colegios': 'Colegios',
};

export function FAQSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [openItems, setOpenItems] = useState<string[]>(['1']);

  const filteredFaqs = activeCategory === 'Todas' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section ref={ref} id="faq" className="ark-section bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-ark-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ark-green/5 rounded-full blur-3xl" />
      </div>

      <div className="ark-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-blue/10 text-ark-blue text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Preguntas Frecuentes
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ark-navy mb-4">
            ¿Tienes dudas?
          </h2>
          <p className="text-lg text-gray-600">
            Aquí respondemos las preguntas más comunes. Si no encuentras lo que buscas, 
            contáctanos directamente.
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-ark-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => {
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
                  <span className="font-heading font-semibold text-ark-navy pr-4">
                    {faq.question}
                  </span>
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
          })}
        </div>

        {/* Contact CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gray-50">
            <div className="w-14 h-14 rounded-full bg-ark-green/10 flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-ark-green" />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-heading font-semibold text-ark-navy mb-1">
                ¿No encontraste tu respuesta?
              </p>
              <p className="text-gray-600 text-sm mb-3">
                Nuestro equipo está listo para ayudarte
              </p>
            </div>
            <Button className="ark-button-secondary">
              Contactar Soporte
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
