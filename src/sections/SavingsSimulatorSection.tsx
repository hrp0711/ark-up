import { Calculator, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks';
import { Button } from '@/components/ui/button';
import { SavingsSimulator } from '@/components/ui-custom';

export function SavingsSimulatorSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} id="simulador" className="ark-section bg-gradient-to-br from-ark-blue via-ark-purple to-ark-green relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="ark-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className={`text-white space-y-8 lg:sticky lg:top-32 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Herramienta gratuita</span>
            </div>

            <div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Simulador de Ahorro Infantil
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                Ayuda a tus hijos a visualizar sus metas de ahorro. Muestra cómo pequeñas 
                contribuciones semanales se convierten en grandes logros.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: Calculator, text: 'Calcula el tiempo exacto para alcanzar la meta' },
                { icon: TrendingUp, text: 'Visualiza el progreso con gráficos animados' },
                { icon: Sparkles, text: 'Recibe consejos educativos personalizados' },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <span className="text-white/90">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-white/70">Metas creadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">85%</div>
                <div className="text-sm text-white/70">Alcanzan su meta</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.9</div>
                <div className="text-sm text-white/70">Calificación</div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-white text-ark-blue hover:bg-gray-100 h-14 px-8 text-lg font-semibold"
              onClick={() => scrollToSection('cursos')}
            >
              Explorar Cursos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right - Simulator */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SavingsSimulator />
          </div>
        </div>
      </div>
    </section>
  );
}
