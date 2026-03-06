import { useState } from 'react';
import { Clock, BookOpen, Users, Star, Check, ChevronRight, PiggyBank, Wallet, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks';
import { Button } from '@/components/ui/button';
import { courses } from '@/data';
import type { Course } from '@/types';

const ageGroups = [
  {
    id: '6-9',
    range: '6-9 años',
    title: 'Pequeños Exploradores',
    description: 'Primeros pasos con el dinero de forma divertida y práctica',
    icon: PiggyBank,
    color: 'blue',
    features: ['Identificar monedas y billetes', 'Concepto básico de ahorro', 'Diferenciar necesidades y deseos'],
  },
  {
    id: '10-13',
    range: '10-13 años',
    title: 'Jóvenes Ahorradores',
    description: 'Ahorro, presupuesto e introducción a las inversiones',
    icon: Wallet,
    color: 'green',
    features: ['Crear un presupuesto personal', 'Metas de ahorro a mediano plazo', 'Interés compuesto básico'],
  },
  {
    id: '14-17',
    range: '14-17 años',
    title: 'Futuros Financieros',
    description: 'Preparación para la independencia financiera completa',
    icon: TrendingUp,
    color: 'purple',
    features: ['Cuentas bancarias y tarjetas', 'Crédito e historial crediticio', 'Emprendimiento y negocios'],
  },
];

export function CoursesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('6-9');

  const filteredCourses = courses.filter(course => 
    course.ageRange[0] <= parseInt(activeTab.split('-')[1]) && 
    course.ageRange[1] >= parseInt(activeTab.split('-')[0])
  );

  const activeGroup = ageGroups.find(g => g.id === activeTab);

  return (
    <section ref={ref} id="cursos" className="ark-section bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />

      <div className="ark-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-blue/10 text-ark-blue text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Nuestros Cursos
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ark-navy mb-4">
            Programas diseñados para cada edad
          </h2>
          <p className="text-lg text-gray-600">
            Desde los primeros conceptos hasta la independencia financiera completa. 
            Cada programa adaptado al desarrollo cognitivo de tu hijo.
          </p>
        </div>

        {/* Age Group Tabs */}
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
                <group.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{group.range}</span>
                <span className="sm:hidden">{group.id}</span>
              </button>
            );
          })}
        </div>

        {/* Active Group Info */}
        {activeGroup && (
          <div className={`mb-12 p-8 rounded-3xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl bg-ark-${activeGroup.color} flex items-center justify-center flex-shrink-0`}>
                <activeGroup.icon className={`w-8 h-8 text-white`} />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-2xl font-bold text-ark-navy mb-2">
                  {activeGroup.title}
                </h3>
                <p className="text-gray-600 mb-4">{activeGroup.description}</p>
                <div className="flex flex-wrap gap-2">
                  {activeGroup.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-ark-${activeGroup.color}/10 text-ark-${activeGroup.color}`}
                    >
                      <Check className="w-3 h-3" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {filteredCourses.map((course, index) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-600 mb-4">
            ¿No estás seguro de qué curso elegir?
          </p>
          <Button 
            variant="outline" 
            className="border-2 border-ark-blue text-ark-blue hover:bg-ark-blue hover:text-white"
          >
            Hacer Test de Nivel
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// Course Card Component
function CourseCard({ course, index, isVisible }: { course: Course; index: number; isVisible: boolean }) {
  const colorClasses: Record<string, string> = {
    blue: 'from-ark-blue to-ark-blue-600',
    green: 'from-ark-green to-ark-green-600',
    yellow: 'from-ark-yellow to-ark-orange',
    orange: 'from-ark-orange to-ark-orange-600',
    purple: 'from-ark-purple to-ark-purple-600',
  };

  const badgeColors: Record<string, string> = {
    blue: 'bg-ark-blue/10 text-ark-blue',
    green: 'bg-ark-green/10 text-ark-green',
    yellow: 'bg-ark-yellow/20 text-ark-yellow-700',
    orange: 'bg-ark-orange/10 text-ark-orange',
    purple: 'bg-ark-purple/10 text-ark-purple',
  };

  return (
    <div
      className={`group relative bg-white rounded-3xl border-2 border-gray-100 hover:border-transparent hover:shadow-ark-xl transition-all duration-300 overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Popular Badge */}
      {course.popular && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-ark-yellow to-ark-orange text-white text-sm font-semibold">
            <Star className="w-4 h-4 fill-white" />
            Más Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className={`h-2 bg-gradient-to-r ${colorClasses[course.color]}`} />

      <div className="p-6 lg:p-8">
        {/* Title & Description */}
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${badgeColors[course.color]}`}>
            {course.ageLabel}
          </span>
          <h3 className="font-heading text-xl lg:text-2xl font-bold text-ark-navy mb-2 group-hover:text-ark-blue transition-colors">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {course.modules} módulos
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {course.ageLabel}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {course.features.slice(0, 4).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm">
              <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 text-ark-${course.color}`} />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div>
            <span className="text-3xl font-bold text-ark-navy">
              ${course.price.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm"> {course.currency}</span>
          </div>
          <Button 
            className={`bg-gradient-to-r ${colorClasses[course.color]} text-white hover:opacity-90`}
          >
            Ver Curso
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
