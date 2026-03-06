import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  Play,
  Award,
  Calendar,
  Target,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { courses } from '@/data';
import { useScrollAnimation } from '@/hooks';
import { SEOHead, createCourseSchema, organizationSchema } from '@/components/SEOHead';

const ageGroups = [
  {
    id: '6-9',
    range: '6-9 años',
    title: 'Pequeños Exploradores',
    description: 'Los primeros pasos en el mundo del dinero de forma divertida y práctica.',
    color: 'blue',
    features: ['Identificar monedas y billetes', 'Concepto básico de ahorro', 'Diferenciar necesidades y deseos', 'Metas de ahorro simples'],
  },
  {
    id: '10-13',
    range: '10-13 años',
    title: 'Jóvenes Ahorradores',
    description: 'Profundizan en el ahorro, presupuesto e introducción a las inversiones.',
    color: 'green',
    features: ['Crear un presupuesto personal', 'Metas de ahorro a mediano plazo', 'Interés compuesto básico', 'Diversificación simple'],
  },
  {
    id: '14-17',
    range: '14-17 años',
    title: 'Futuros Financieros',
    description: 'Preparación para la independencia financiera completa.',
    color: 'purple',
    features: ['Cuentas bancarias y tarjetas', 'Crédito e historial crediticio', 'Emprendimiento y negocios', 'Planificación financiera avanzada'],
  },
];

const benefits = [
  { icon: Play, title: 'Contenido 100% en video', description: 'Lecciones interactivas y divertidas' },
  { icon: Award, title: 'Certificado oficial', description: 'Reconocimiento al completar cada nivel' },
  { icon: Calendar, title: 'Acceso de por vida', description: 'Vuelve a ver las lecciones cuando quieras' },
  { icon: Users, title: 'Para toda la familia', description: 'Involucra a padres en el aprendizaje' },
];

export function CursosPage() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('6-9');

  const filteredCourses = courses.filter(course => 
    course.ageRange[0] <= parseInt(activeTab.split('-')[1]) && 
    course.ageRange[1] >= parseInt(activeTab.split('-')[0])
  );

  const activeGroup = ageGroups.find(g => g.id === activeTab);

  // Generate course schemas for all courses
  const courseSchemas = courses.map(course => createCourseSchema({
    name: course.title,
    description: course.description,
    price: course.price,
    duration: course.duration,
    ageRange: course.ageLabel,
  }));

  return (
    <>
      <SEOHead
        title="Cursos de Educación Financiera para Niños y Jóvenes"
        description="Descubre nuestros programas de educación financiera diseñados para cada edad. Cursos interactivos para niños de 6-9, 10-13 y 14-17 años. Certificación oficial incluida."
        canonical="/cursos"
        ogType="website"
        schema={[organizationSchema, ...courseSchemas]}
      />
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-ark-blue-50 via-white to-ark-green-50">
          <div className="ark-container">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-blue/10 text-ark-blue text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                <span>Nuestros Programas</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ark-navy mb-6">
                Cursos de Educación Financiera
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Programas diseñados por expertos para cada etapa del desarrollo de tu hijo. 
                Desde los primeros conceptos hasta la independencia financiera completa.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="ark-container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-gray-50">
                  <div className="w-14 h-14 rounded-xl bg-ark-blue/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-ark-blue" />
                  </div>
                  <h3 className="font-heading font-bold text-ark-navy mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Age Groups Tabs */}
        <section ref={ref} className="py-20 bg-gray-50">
          <div className="ark-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ark-navy mb-4">
                Programas por Edades
              </h2>
              <p className="text-gray-600">
                Cada programa está diseñado específicamente para el desarrollo cognitivo de tu hijo.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {ageGroups.map((group) => {
                const isActive = activeTab === group.id;
                const colorClasses: Record<string, { active: string; inactive: string }> = {
                  blue: { active: 'bg-ark-blue text-white', inactive: 'bg-ark-blue/10 text-ark-blue hover:bg-ark-blue/20' },
                  green: { active: 'bg-ark-green text-white', inactive: 'bg-ark-green/10 text-ark-green hover:bg-ark-green/20' },
                  purple: { active: 'bg-ark-purple text-white', inactive: 'bg-ark-purple/10 text-ark-purple hover:bg-ark-purple/20' },
                };

                return (
                  <button
                    key={group.id}
                    onClick={() => setActiveTab(group.id)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all ${
                      isActive ? colorClasses[group.color].active : colorClasses[group.color].inactive
                    }`}
                  >
                    <span className="text-lg font-bold">{group.range}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Group Info */}
            {activeGroup && (
              <div className={`mb-12 p-8 rounded-3xl bg-white shadow-soft transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-ark-navy mb-3">
                      {activeGroup.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{activeGroup.description}</p>
                    <div className="space-y-3">
                      {activeGroup.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className={`w-5 h-5 text-ark-${activeGroup.color}`} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`p-6 rounded-2xl bg-ark-${activeGroup.color}/5 text-center`}>
                    <div className={`text-5xl font-bold text-ark-${activeGroup.color} mb-2`}>
                      {filteredCourses.length}
                    </div>
                    <div className="text-gray-600">cursos disponibles</div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCourses.map((course, index) => (
                <article
                  key={course.id}
                  className={`bg-white rounded-3xl border-2 border-gray-100 hover:border-transparent hover:shadow-ark-xl transition-all duration-300 overflow-hidden ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  itemScope
                  itemType="https://schema.org/Course"
                >
                  {course.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-ark-yellow to-ark-orange text-white text-sm font-semibold">
                        <Star className="w-4 h-4 fill-white" />
                        Más Popular
                      </span>
                    </div>
                  )}

                  <div className={`h-2 bg-gradient-to-r from-ark-${course.color} to-ark-${course.color}-600`} />

                  <div className="p-6 lg:p-8">
                    <meta itemProp="name" content={course.title} />
                    <meta itemProp="description" content={course.description} />
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-ark-${course.color}/10 text-ark-${course.color}`}>
                        {course.ageLabel}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span itemProp="timeRequired">{course.duration}</span>
                      </span>
                    </div>

                    <h3 className="font-heading text-xl lg:text-2xl font-bold text-ark-navy mb-3">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-6" itemProp="description">{course.description}</p>

                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.modules} módulos
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.ageLabel}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      {course.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 text-ark-${course.color}`} />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                      <meta itemProp="priceCurrency" content="MXN" />
                      <meta itemProp="availability" content="https://schema.org/InStock" />
                      <div>
                        <span className="text-3xl font-bold text-ark-navy" itemProp="price">
                          ${course.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-sm"> {course.currency}</span>
                      </div>
                      <Button 
                        className={`bg-ark-${course.color} hover:bg-ark-${course.color}-700 text-white`}
                        aria-label={`Inscribirse en ${course.title}`}
                      >
                        Inscribir Ahora
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-ark-blue via-ark-purple to-ark-green">
          <div className="ark-container">
            <div className="max-w-3xl mx-auto text-center text-white">
              <Sparkles className="w-12 h-12 mx-auto mb-6 text-ark-yellow" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                ¿No estás seguro de qué curso elegir?
              </h2>
              <p className="text-white/80 mb-8">
                Haz nuestro quiz de diagnóstico gratuito y descubre el nivel de educación financiera de tu hijo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/?quiz=true">
                  <Button size="lg" className="bg-white text-ark-blue hover:bg-gray-100">
                    <Target className="w-5 h-5 mr-2" />
                    Hacer Quiz de Nivel
                  </Button>
                </Link>
                <Link to="/contacto">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                    Hablar con un Asesor
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
