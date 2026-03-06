import { UserPlus, BookOpen, Gamepad2, TrendingUp, Award, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    title: 'Crea una cuenta gratuita',
    description: 'Regístrate en menos de 2 minutos. Solo necesitas un correo electrónico y la edad de tu hijo para personalizar su experiencia.',
    icon: UserPlus,
    color: 'blue',
  },
  {
    number: '02',
    title: 'Elige el curso por edad',
    description: 'Selecciona entre nuestros programas diseñados específicamente para 6-9, 10-13 o 14-17 años. Cada uno adaptado a su nivel de desarrollo.',
    icon: BookOpen,
    color: 'green',
  },
  {
    number: '03',
    title: 'Aprende jugando',
    description: 'Tu hijo accede a lecciones interactivas, juegos educativos, videos animados y actividades prácticas que hacen del aprendizaje algo divertido.',
    icon: Gamepad2,
    color: 'purple',
  },
  {
    number: '04',
    title: 'Practica con el simulador',
    description: 'Usa nuestro simulador de ahorro para que tu hijo visualice sus metas y vea cómo sus pequeños ahorros se convierten en grandes logros.',
    icon: TrendingUp,
    color: 'yellow',
  },
  {
    number: '05',
    title: 'Monitorea el progreso',
    description: 'Recibe reportes semanales del avance de tu hijo, áreas de mejora y logros alcanzados. Sé parte de su crecimiento financiero.',
    icon: Users,
    color: 'orange',
  },
  {
    number: '06',
    title: 'Obtén certificación',
    description: 'Al completar cada nivel, tu hijo recibe un certificado oficial que reconoce sus nuevas habilidades financieras.',
    icon: Award,
    color: 'blue',
  },
];

export function HowItWorksSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} id="como-funciona" className="ark-section bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ark-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ark-green/5 rounded-full blur-3xl" />

      <div className="ark-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-purple/10 text-ark-purple text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Proceso simple
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ark-navy mb-4">
            ¿Cómo funciona Ark-Up?
          </h2>
          <p className="text-lg text-gray-600">
            En solo 6 pasos, tu hijo comenzará su viaje hacia la independencia financiera. 
            Sin complicaciones, 100% en línea.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const colorClasses: Record<string, string> = {
              blue: 'from-ark-blue to-ark-blue-600',
              green: 'from-ark-green to-ark-green-600',
              purple: 'from-ark-purple to-ark-purple-600',
              yellow: 'from-ark-yellow to-ark-orange',
              orange: 'from-ark-orange to-ark-orange-600',
            };

            return (
              <div
                key={step.number}
                className={`group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-transparent hover:shadow-ark transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-heading font-bold text-gray-400 group-hover:bg-gradient-to-br group-hover:from-ark-blue group-hover:to-ark-purple group-hover:text-white transition-all">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[step.color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-bold text-ark-navy mb-3 group-hover:text-ark-blue transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector Line (not for last item in row) */}
                {(index + 1) % 3 !== 0 && index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Family Image */}
        <div className={`mt-16 relative rounded-3xl overflow-hidden shadow-ark-xl transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <img 
            src="/images/family-learning.jpg" 
            alt="Familia aprendiendo juntos con Ark-Up"
            className="w-full h-auto"
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-ark-navy/80 via-transparent to-transparent flex items-end">
            <div className="p-8 md:p-12 text-white max-w-2xl">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                Aprendizaje en familia
              </h3>
              <p className="text-white/80 mb-6">
                Ark-Up no solo educa a los niños, también involucra a los padres en el proceso, 
                creando conversaciones saludables sobre dinero en casa.
              </p>
              <Button 
                className="bg-white text-ark-blue hover:bg-gray-100"
                onClick={() => scrollToSection('cursos')}
              >
                Explorar Cursos
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-600 mb-4">
            ¿Tienes dudas sobre cómo empezar?
          </p>
          <Button 
            variant="outline" 
            className="border-2 border-ark-blue text-ark-blue hover:bg-ark-blue hover:text-white"
            onClick={() => scrollToSection('faq')}
          >
            Ver Preguntas Frecuentes
          </Button>
        </div>
      </div>
    </section>
  );
}
