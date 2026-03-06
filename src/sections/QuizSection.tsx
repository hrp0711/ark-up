import { HelpCircle, Sparkles, ArrowRight, Lightbulb, TrendingUp, Award } from 'lucide-react';
import { useScrollAnimation } from '@/hooks';
import { Button } from '@/components/ui/button';
import { FinancialQuiz } from '@/components/ui-custom';

export function QuizSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} id="quiz" className="ark-section bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ark-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-ark-yellow/5 rounded-full blur-3xl" />
      </div>

      <div className="ark-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className={`space-y-8 lg:sticky lg:top-32 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-purple/10 text-ark-purple text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Evaluación gratuita</span>
            </div>

            <div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ark-navy mb-4">
                ¿Cuál es el nivel financiero de tu hijo?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Responde 8 preguntas simples y descubre el nivel de educación financiera 
                de tu hijo. Recibe una recomendación personalizada del curso más adecuado.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: HelpCircle, text: '8 preguntas rápidas (2 minutos)' },
                { icon: Lightbulb, text: 'Descubre áreas de mejora' },
                { icon: TrendingUp, text: 'Recibe recomendaciones personalizadas' },
                { icon: Award, text: 'Identifica el curso perfecto para su edad' },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-ark-purple/10 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-ark-purple" />
                  </div>
                  <span className="text-gray-700">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-white shadow-soft">
              <div className="text-center">
                <div className="text-3xl font-bold text-ark-purple">10K+</div>
                <div className="text-sm text-gray-500">Evaluaciones</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ark-purple">92%</div>
                <div className="text-sm text-gray-500">Precisión</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ark-purple">4.8</div>
                <div className="text-sm text-gray-500">Calificación</div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="ark-button-primary"
              onClick={() => scrollToSection('cursos')}
            >
              Explorar todos los cursos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right - Quiz */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FinancialQuiz />
          </div>
        </div>

        {/* Result Levels Preview */}
        <div className={`mt-20 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-2xl font-bold text-ark-navy text-center mb-8">
            Tres niveles de conocimiento financiero
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Nivel Inicial',
                description: 'Comenzando el viaje financiero. Necesita bases sólidas.',
                color: 'blue',
                icon: Lightbulb,
                range: '0-5 puntos',
              },
              {
                name: 'Nivel en Desarrollo',
                description: 'Buenas bases mostrando interés. Listo para avanzar.',
                color: 'green',
                icon: TrendingUp,
                range: '6-11 puntos',
              },
              {
                name: 'Nivel Avanzado',
                description: 'Madurez financiera destacada. Listo para conceptos complejos.',
                color: 'purple',
                icon: Award,
                range: '12-16 puntos',
              },
            ].map((level, index) => {
              const colorClasses: Record<string, string> = {
                blue: 'from-ark-blue to-ark-blue-600',
                green: 'from-ark-green to-ark-green-600',
                purple: 'from-ark-purple to-ark-purple-600',
              };

              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-ark transition-all text-center"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[level.color]} flex items-center justify-center mx-auto mb-4`}>
                    <level.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-ark-navy mb-2">{level.name}</h4>
                  <p className="text-sm text-gray-500 mb-3">{level.range}</p>
                  <p className="text-gray-600 text-sm">{level.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
