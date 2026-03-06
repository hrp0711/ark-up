import { X, Check, AlertTriangle, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks';

const problems = [
  'Los niños no aprenden finanzas en la escuela',
  'Crecen sin entender el valor del dinero',
  'Se endeudan temprano por falta de educación',
  'No saben administrar un presupuesto',
];

const solutions = [
  'Aprenden habilidades financieras desde pequeños',
  'Desarrollan hábitos de ahorro saludables',
  'Entienden la diferencia entre necesidades y deseos',
  'Preparan su futuro financiero con confianza',
];

export function ProblemSolutionSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="ark-section bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`
        }} />
      </div>

      <div className="ark-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4" />
            Un problema real
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ark-navy mb-4">
            La educación financiera no se enseña en las escuelas
          </h2>
          <p className="text-lg text-gray-600">
            Y los padres muchas veces no saben por dónde empezar. El resultado: 
            jóvenes que llegan a la adultez sin las herramientas para manejar su dinero.
          </p>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Problem Side */}
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
              <X className="w-4 h-4" />
              La realidad actual
            </div>
            
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-red-50/50 border border-red-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-gray-700">{problem}</p>
                </div>
              ))}
            </div>

            {/* Stat Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">78%</div>
                <div className="text-sm text-red-100">
                  de los adultos dicen haber cometido errores financieros que podrían haberse evitado con educación temprana
                </div>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-green/10 text-ark-green text-sm font-semibold">
              <Check className="w-4 h-4" />
              La solución Ark-Up
            </div>
            
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-ark-green/5 border border-ark-green/20"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-ark-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-ark-green" />
                  </div>
                  <p className="text-gray-700">{solution}</p>
                </div>
              ))}
            </div>

            {/* Success Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-ark-green to-ark-green-700 text-white">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">96%</div>
                <div className="text-sm text-green-100">
                  de los padres reportan mejoras significativas en los hábitos financieros de sus hijos después de 3 meses
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className={`relative rounded-3xl overflow-hidden shadow-ark-xl transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <img 
            src="/images/problem-solution.jpg" 
            alt="Comparación: antes y después de la educación financiera"
            className="w-full h-auto"
          />
          
          {/* Overlay Labels */}
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold">
            Sin educación financiera
          </div>
          <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-ark-green text-white text-sm font-semibold">
            Con Ark-Up
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { value: '15,000+', label: 'Estudiantes activos', icon: TrendingUp },
            { value: '85+', label: 'Colegios aliados', icon: TrendingUp },
            { value: '50,000+', label: 'Metas de ahorro alcanzadas', icon: TrendingUp },
            { value: '4.9/5', label: 'Calificación promedio', icon: TrendingUp },
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-soft transition-all"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-ark-blue/10 mb-3">
                <stat.icon className="w-6 h-6 text-ark-blue" />
              </div>
              <div className="font-heading text-2xl font-bold text-ark-navy mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
