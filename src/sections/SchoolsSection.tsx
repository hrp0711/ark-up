import { Building2, Users, GraduationCap, CheckCircle2, ArrowRight, BookOpen, BarChart3, Award, Clock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks';
import { Button } from '@/components/ui/button';

const schoolBenefits = [
  {
    icon: BookOpen,
    title: 'Currículo completo',
    description: 'Programas estructurados por edad con materiales didácticos incluidos',
  },
  {
    icon: BarChart3,
    title: 'Reportes detallados',
    description: 'Seguimiento del progreso de cada estudiante y del grupo',
  },
  {
    icon: Award,
    title: 'Certificación oficial',
    description: 'Los estudiantes reciben certificados al completar cada nivel',
  },
  {
    icon: Clock,
    title: 'Flexibilidad horaria',
    description: 'Adaptamos el programa al horario escolar de tu institución',
  },
];

const planFeatures = [
  'Acceso ilimitado a todos los cursos',
  'Dashboard para profesores',
  'Reportes de progreso mensuales',
  'Capacitación docente incluida',
  'Soporte técnico prioritario',
  'Material complementario físico',
];

export function SchoolsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} id="colegios" className="ark-section bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ark-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-ark-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="ark-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-purple/10 text-ark-purple text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            Para Colegios
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ark-navy mb-4">
            Lleva Ark-Up a tu escuela
          </h2>
          <p className="text-lg text-gray-600">
            Programas institucionales diseñados para integrar la educación financiera 
            en el currículo escolar de forma efectiva y divertida.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Image */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-ark-xl">
              <img 
                src="/images/school-program.jpg" 
                alt="Programa Ark-Up en colegios"
                className="w-full h-auto"
              />
              
              {/* Overlay Stats */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ark-navy/90 to-transparent p-6">
                <div className="grid grid-cols-3 gap-4 text-white text-center">
                  <div>
                    <div className="text-2xl font-bold">85+</div>
                    <div className="text-xs text-white/70">Colegios</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">12K+</div>
                    <div className="text-xs text-white/70">Estudiantes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-xs text-white/70">Satisfacción</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="font-heading text-2xl font-bold text-ark-navy">
              Beneficios para tu institución
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {schoolBenefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="p-5 rounded-2xl bg-white border border-gray-100 hover:border-ark-purple/30 hover:shadow-soft transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-ark-purple/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-ark-purple" />
                  </div>
                  <h4 className="font-heading font-bold text-ark-navy mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-3xl shadow-ark-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left - Info */}
              <div className="p-8 lg:p-12 bg-gradient-to-br from-ark-navy to-ark-navy/90 text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 mb-6">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm font-medium">Plan Institucional</span>
                </div>
                
                <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-4">
                  Todo incluido para tu colegio
                </h3>
                
                <p className="text-white/80 mb-8">
                  Precio por estudiante con acceso completo a la plataforma, 
                  materiales y soporte durante todo el año escolar.
                </p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-bold">$149</span>
                  <span className="text-white/60">/estudiante/año</span>
                </div>

                <Button 
                  size="lg" 
                  className="bg-white text-ark-navy hover:bg-gray-100 w-full sm:w-auto"
                >
                  Solicitar información
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Right - Features */}
              <div className="p-8 lg:p-12">
                <h4 className="font-heading font-bold text-ark-navy mb-6">
                  ¿Qué incluye?
                </h4>
                
                <div className="space-y-4">
                  {planFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-ark-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-ark-green" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-ark-blue/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-ark-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-ark-navy">Descuentos por volumen</p>
                      <p className="text-sm text-gray-500">+100 estudiantes: 20% off</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className={`mt-16 max-w-3xl mx-auto text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <blockquote className="text-xl lg:text-2xl text-gray-700 italic mb-6">
            "Implementar Ark-Up en nuestra escuela ha sido una de las mejores decisiones. 
            Los estudiantes están más comprometidos y los padres muy agradecidos."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center text-white font-bold text-xl">
              D
            </div>
            <div className="text-left">
              <div className="font-heading font-bold text-ark-navy">Dra. María González</div>
              <div className="text-sm text-gray-500">Directora, Colegio Vista Alegre</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
