import { useState } from 'react';
import { Gift, CheckCircle2, Mail, Download, FileText, Star, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const guideFeatures = [
  'Cómo iniciar conversaciones sobre dinero según la edad',
  'Actividades prácticas para hacer en casa',
  'Estrategias para enseñar ahorro sin frustración',
  'Cómo responder las preguntas difíciles sobre dinero',
  'Checklist de habilidades financieras por edad',
  'Plantillas descargables para presupuesto familiar',
];

const testimonials = [
  { text: 'Me cambió la forma de hablar de dinero con mis hijos', author: 'Ana M.' },
  { text: 'Práctico, claro y fácil de aplicar', author: 'Carlos R.' },
  { text: 'Las actividades son divertidas y educativas', author: 'Laura S.' },
];

export function FreeResourceSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section ref={ref} className="ark-section bg-gradient-to-br from-ark-blue via-ark-purple to-ark-green relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="ark-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`text-white space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <Gift className="w-4 h-4" />
              <span className="text-sm font-medium">Recurso gratuito</span>
            </div>

            <div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Guía gratuita para padres
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                "Cómo hablar de dinero con tus hijos: Una guía práctica por edades" 
                con estrategias probadas y actividades descargables.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {guideFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            {/* Mini Testimonials */}
            <div className="flex flex-wrap gap-4">
              {testimonials.map((t, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <Star className="w-4 h-4 fill-ark-yellow text-ark-yellow" />
                  <span className="text-sm text-white/90">"{t.text}"</span>
                  <span className="text-sm text-white/60">— {t.author}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-white/70" />
                <span className="text-white/90"><strong>25,000+</strong> descargas</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white/70" />
                <span className="text-white/90"><strong>4.9/5</strong> valoración</span>
              </div>
            </div>
          </div>

          {/* Right - Form Card */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
              {/* Guide Preview */}
              <div className="mb-8 text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-40 mx-auto rounded-xl bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center shadow-lg transform rotate-3">
                    <FileText className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-ark-yellow flex items-center justify-center">
                    <span className="text-lg font-bold text-white">FREE</span>
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-ark-navy mt-6 mb-2">
                  Guía para Padres
                </h3>
                <p className="text-gray-500 text-sm">
                  PDF de 45 páginas con actividades descargables
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tu correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="nombre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 text-base"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full ark-button-primary h-14 text-lg"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      ¡Enviado! Revisa tu correo
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Descargar Gratis Ahora
                    </>
                  )}
                </Button>
              </form>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-ark-green" />
                    Sin spam
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-ark-green" />
                    Cancela cuando quieras
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
