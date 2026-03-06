import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  BarChart3, 
  Award, 
  Clock,
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useScrollAnimation } from '@/hooks';
import { SEOHead, organizationSchema } from '@/components/SEOHead';

const benefits = [
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
  'Descuentos por volumen',
  'Garantía de satisfacción',
];

const stats = [
  { value: '85+', label: 'Colegios aliados' },
  { value: '12,000+', label: 'Estudiantes beneficiados' },
  { value: '98%', label: 'Satisfacción' },
  { value: '4.9/5', label: 'Calificación promedio' },
];

export function ColegiosPage() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    studentsCount: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        schoolName: '',
        studentsCount: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <>
      <SEOHead
        title="Programas para Colegios - Educación Financiera Institucional"
        description="Implementa educación financiera en tu escuela con Ark-Up. Programas institucionales con dashboard para profesores, reportes y certificación. Precio por estudiante: $149 MXN/año."
        canonical="/colegios"
        ogType="website"
        schema={[organizationSchema]}
      />
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-ark-purple-50 via-white to-ark-blue-50">
          <div className="ark-container">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-purple/10 text-ark-purple text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                <span>Programas Institucionales</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ark-navy mb-6">
                Lleva Ark-Up a tu Colegio
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Programas institucionales diseñados para integrar la educación financiera 
                en el currículo escolar de forma efectiva y divertida.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-ark-navy">
          <div className="ark-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center text-white">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section ref={ref} className="py-20 bg-white">
          <div className="ark-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ark-navy mb-4">
                Beneficios para tu institución
              </h2>
              <p className="text-gray-600">
                Todo lo que necesitas para implementar educación financiera de calidad en tu escuela.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-ark transition-all ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-ark-purple/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-7 h-7 text-ark-purple" />
                  </div>
                  <h3 className="font-heading font-bold text-ark-navy mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-gray-50">
          <div className="ark-container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-ark-xl overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  {/* Left - Pricing */}
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

                    <div className="p-4 rounded-xl bg-white/10 mb-8">
                      <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-ark-green" />
                        <div>
                          <p className="font-medium">Descuentos por volumen</p>
                          <p className="text-sm text-white/70">+100 estudiantes: 20% off</p>
                        </div>
                      </div>
                    </div>

                    <Link to="/contacto">
                      <Button className="bg-white text-ark-navy hover:bg-gray-100 w-full">
                        Solicitar información
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 bg-white">
          <div className="ark-container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-ark-yellow text-ark-yellow" />
                ))}
              </div>
              <blockquote className="text-xl lg:text-2xl text-gray-700 italic mb-8">
                "Implementar Ark-Up en nuestra escuela ha sido una de las mejores decisiones. 
                Los estudiantes están más comprometidos y los padres muy agradecidos. 
                La educación financiera debería ser parte de todo currículo escolar."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center text-white text-xl font-bold">
                  D
                </div>
                <div className="text-left">
                  <div className="font-heading font-bold text-ark-navy">Dra. María González</div>
                  <div className="text-gray-500">Directora, Colegio Vista Alegre</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gradient-to-br from-ark-purple via-ark-blue to-ark-green">
          <div className="ark-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Info */}
              <div className="text-white">
                <Sparkles className="w-12 h-12 mb-6 text-ark-yellow" />
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  ¿Listo para transformar la educación financiera en tu colegio?
                </h2>
                <p className="text-white/80 mb-8">
                  Completa el formulario y un asesor especializado se pondrá en contacto 
                  contigo en menos de 24 horas.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Teléfono</p>
                      <p className="font-medium">+52 1 234 567 890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <p className="font-medium">colegios@arkup.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Ubicación</p>
                      <p className="font-medium">Ciudad de México, México</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Form */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="font-heading text-2xl font-bold text-ark-navy mb-6">
                  Solicitar información
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+52 1 234 567 890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del colegio</label>
                      <Input
                        value={formData.schoolName}
                        onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                        placeholder="Colegio..."
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de estudiantes</label>
                    <Input
                      value={formData.studentsCount}
                      onChange={(e) => setFormData({ ...formData, studentsCount: e.target.value })}
                      placeholder="Aproximadamente..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Cuéntanos sobre tus necesidades..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ark-blue focus:ring-2 focus:ring-ark-blue/20 outline-none resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full ark-button-primary"
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        ¡Enviado! Te contactaremos pronto
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar solicitud
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
