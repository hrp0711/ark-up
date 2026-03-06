import { ArrowRight, CheckCircle2, Star, Users, Shield, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks';
import { Button } from '@/components/ui/button';

const benefits = [
  'Acceso inmediato a todos los cursos',
  'Simulador de ahorro ilimitado',
  'Certificado en cada nivel completado',
  'Soporte por chat y email',
  'Garantía de satisfacción 30 días',
  'Cancela cuando quieras',
];

export function FinalCTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="py-24 bg-ark-navy relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ark-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ark-green/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ark-purple/10 rounded-full blur-3xl" />
        
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="ark-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Sparkles className="w-4 h-4 text-ark-yellow" />
            <span className="text-sm font-medium text-white">Comienza tu prueba gratuita hoy</span>
          </div>

          {/* Headline */}
          <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Dale a tus hijos la{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ark-yellow to-ark-orange">
              ventaja financiera
            </span>{' '}
            que merecen
          </h2>

          {/* Subheadline */}
          <p className={`text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Únete a más de 15,000 familias que ya están construyendo un futuro financiero 
            brillante para sus hijos con Ark-Up.
          </p>

          {/* Benefits Grid */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-ark-green/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-ark-green" />
                </div>
                <span className="text-white/80 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              size="lg" 
              className="bg-white text-ark-navy hover:bg-gray-100 h-14 px-10 text-lg font-semibold group"
              onClick={() => scrollToSection('cursos')}
            >
              Comenzar Gratis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg"
            >
              Ver Planes y Precios
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className={`flex flex-wrap items-center justify-center gap-6 text-white/60 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Pago seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-ark-yellow text-ark-yellow" />
              <span className="text-sm">4.9/5 calificación</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">15,000+ familias</span>
            </div>
          </div>

          {/* Guarantee */}
          <div className={`mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 max-w-xl mx-auto transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-ark-green/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-ark-green" />
              </div>
              <div className="text-left">
                <div className="font-heading font-bold text-white">Garantía de 30 días</div>
                <div className="text-white/60 text-sm">Sin preguntas, sin complicaciones</div>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              Si no estás completamente satisfecho en los primeros 30 días, 
              te devolvemos tu dinero al 100%. Sin hacer preguntas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
