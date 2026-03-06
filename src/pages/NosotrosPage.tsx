import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Eye, 
  Heart, 
  Lightbulb, 
  Shield, 
  Star,
  ArrowRight,
  GraduationCap,
  Award,
  Globe,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { teamMembers } from '@/data';
import { useScrollAnimation } from '@/hooks';
import { SEOHead, organizationSchema } from '@/components/SEOHead';

const values = [
  {
    icon: Heart,
    title: 'Pasión por la educación',
    description: 'Creemos que la educación financiera es una habilidad fundamental para la vida.',
  },
  {
    icon: Lightbulb,
    title: 'Innovación constante',
    description: 'Desarrollamos métodos lúdicos y efectivos que hacen del aprendizaje algo divertido.',
  },
  {
    icon: Shield,
    title: 'Compromiso con las familias',
    description: 'Trabajamos junto a padres para crear un impacto positivo y duradero.',
  },
  {
    icon: Globe,
    title: 'Accesibilidad para todos',
    description: 'Buscamos que la educación financiera llegue a todas las familias de Latinoamérica.',
  },
];

const milestones = [
  { year: '2020', title: 'Fundación', description: 'Ark-Up nace con la misión de educar financieramente a la nueva generación.' },
  { year: '2021', title: 'Primeros 1,000 estudiantes', description: 'Alcanzamos nuestro primer hito de estudiantes activos en la plataforma.' },
  { year: '2022', title: 'Expansión a colegios', description: 'Lanzamos nuestro programa institucional con 20 colegios aliados.' },
  { year: '2023', title: 'Líderes en LATAM', description: 'Nos convertimos en la plataforma de educación financiera infantil más grande de Latinoamérica.' },
  { year: '2024', title: '50,000+ familias', description: 'Superamos las 50,000 familias beneficiadas con nuestros programas.' },
];

export function NosotrosPage() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <>
      <SEOHead
        title="Sobre Nosotros - Ark-Up"
        description="Conoce al equipo detrás de Ark-Up, la plataforma líder de educación financiera para niños y jóvenes en Latinoamérica. Nuestra misión, visión y valores."
        canonical="/nosotros"
        schema={[organizationSchema]}
      />
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-ark-blue-50 via-white to-ark-green-50">
        <div className="ark-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-blue/10 text-ark-blue text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              <span>Sobre Nosotros</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ark-navy mb-6">
              Construyendo el futuro financiero de Latinoamérica
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Somos un equipo apasionado por la educación, comprometido con preparar 
              a la nueva generación para un futuro financiero brillante.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="ark-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-ark-blue to-ark-blue-600 text-white">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold mb-4">Nuestra Misión</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Democratizar la educación financiera para niños y jóvenes en Latinoamérica, 
                proporcionando herramientas prácticas y divertidas que les permitan desarrollar 
                hábitos financieros saludables desde temprana edad.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-ark-green to-ark-green-600 text-white">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold mb-4">Nuestra Visión</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Ser la plataforma líder en educación financiera infantil en Latinoamérica, 
                formando una generación de jóvenes financieramente responsables y preparados 
                para tomar decisiones inteligentes sobre su dinero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={ref} className="py-20 bg-gray-50">
        <div className="ark-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ark-navy mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-600">
              Los principios que guían cada decisión que tomamos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-white hover:shadow-ark transition-all text-center ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-ark-blue/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-ark-blue" />
                </div>
                <h3 className="font-heading font-bold text-ark-navy mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="ark-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ark-navy mb-4">
              Nuestra Historia
            </h2>
            <p className="text-gray-600">
              Un recorrido por los hitos que han marcado nuestro camino.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center text-white font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-4" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="text-sm text-ark-blue font-medium mb-1">{milestone.year}</div>
                  <h3 className="font-heading text-xl font-bold text-ark-navy mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="ark-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ark-navy mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-gray-600">
              Expertos apasionados por la educación financiera y el desarrollo infantil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-ark transition-all"
              >
                {/* Avatar */}
                <div className="aspect-square bg-gradient-to-br from-ark-blue/10 to-ark-purple/10 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center text-white text-3xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="font-heading font-bold text-ark-navy mb-1">{member.name}</h3>
                  <p className="text-ark-blue text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-ark-navy">
        <div className="ark-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-white/60">Familias beneficiadas</div>
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7" />
              </div>
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-white/60">Cursos disponibles</div>
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7" />
              </div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-white/60">Calificación promedio</div>
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div className="text-4xl font-bold mb-2">85+</div>
              <div className="text-white/60">Colegios aliados</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-ark-blue via-ark-purple to-ark-green">
        <div className="ark-container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              ¿Quieres ser parte de nuestro equipo?
            </h2>
            <p className="text-white/80 mb-8">
              Siempre estamos buscando talento apasionado por la educación financiera. 
              Únete a nuestra misión de transformar el futuro de las familias latinoamericanas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacto">
                <Button size="lg" className="bg-white text-ark-blue hover:bg-gray-100">
                  Ver Vacantes
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10">
                  Contactar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
