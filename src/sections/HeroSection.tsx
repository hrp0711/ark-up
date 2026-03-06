import { useState, useEffect } from 'react';
import { ArrowRight, Play, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks';

const heroStats = [
  { value: '15K+', label: 'Estudiantes activos' },
  { value: '96%', label: 'Satisfacción' },
  { value: '4.9', label: 'Calificación' },
];

const heroBenefits = [
  'Método probado con +15,000 familias',
  'Certificado al completar cada nivel',
  'Garantía de satisfacción 30 días',
];

export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [currentStat, setCurrentStat] = useState(0);

  // Rotating stats animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % heroStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-ark-blue-50/80 via-white to-ark-green-50/60" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-ark-blue/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ark-green/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ark-purple/5 rounded-full blur-3xl" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-32 right-[15%] w-16 h-16 bg-ark-yellow/30 rounded-2xl rotate-12 animate-float" />
      <div className="absolute top-48 right-[25%] w-10 h-10 bg-ark-green/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-40 left-[10%] w-12 h-12 bg-ark-purple/20 rounded-lg -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 right-[20%] w-8 h-8 bg-ark-blue/30 rounded-xl rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Coin Decorations */}
      <div className="absolute top-1/4 left-[5%] text-ark-yellow/40 text-4xl animate-bounce-soft">$</div>
      <div className="absolute bottom-1/3 right-[8%] text-ark-green/40 text-3xl animate-bounce-soft" style={{ animationDelay: '0.7s' }}>$</div>
      <div className="absolute top-1/3 right-[5%] text-ark-blue/30 text-2xl animate-bounce-soft" style={{ animationDelay: '1.2s' }}>$</div>

      <div className="ark-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-ark-blue/10 to-ark-purple/10 border border-ark-blue/20">
              <Sparkles className="w-4 h-4 text-ark-blue" />
              <span className="text-sm font-medium text-ark-blue">#1 en Educación Financiera Infantil en LATAM</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-ark-navy leading-[1.1]">
                Enseña a tus hijos a ser{' '}
                <span className="relative inline-block">
                  <span className="ark-text-gradient">inteligentes</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 2 150 2 198 8" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                        <stop stopColor="#2563EB"/>
                        <stop offset="1" stopColor="#10B981"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{' '}
                con el dinero
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
                Cursos divertidos y prácticos que preparan a niños y jóvenes para un futuro financiero brillante. 
                <span className="text-ark-blue font-medium"> Desde los 6 años.</span>
              </p>
            </div>

            {/* Benefits List */}
            <div className="flex flex-wrap gap-3">
              {heroBenefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-soft border border-gray-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-ark-green" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="ark-button-primary text-base h-14 px-8 text-lg"
                onClick={() => scrollToSection('cursos')}
              >
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-lg border-2 border-gray-300 hover:border-ark-blue hover:text-ark-blue"
                onClick={() => scrollToSection('como-funciona')}
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Ver Cómo Funciona
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              {/* Avatars */}
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((_, i) => (
                  <div 
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-ark-blue to-ark-purple border-3 border-white flex items-center justify-center text-white font-bold text-sm shadow-lg"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full bg-ark-navy border-3 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  +15K
                </div>
              </div>
              
              {/* Rating */}
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-ark-yellow text-ark-yellow" />
                  ))}
                  <span className="ml-2 font-bold text-ark-navy">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600">
                  Basado en <span className="font-semibold text-ark-navy">+2,500 opiniones</span> de padres
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-ark-xl bg-white">
                <img 
                  src="/images/hero-kid-saving.jpg" 
                  alt="Niño feliz aprendiendo sobre ahorro"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ark-blue/20 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-ark-lg p-5 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ark-green to-ark-green-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{heroStats[currentStat].value}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{heroStats[currentStat].label}</p>
                    <p className="text-xs text-ark-green font-medium">↑ Creciendo</p>
                  </div>
                </div>
              </div>

              {/* Success Badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-ark-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ark-yellow/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-ark-yellow-600 fill-ark-yellow" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ark-navy">Meta Alcanzada</p>
                    <p className="text-xs text-gray-500">¡Felicidades!</p>
                  </div>
                </div>
              </div>

              {/* Decorative Ring */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-dashed border-ark-blue/20 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
