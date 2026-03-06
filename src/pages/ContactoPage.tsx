import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2,
  MessageCircle,
  Users,
  Building2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEOHead, organizationSchema } from '@/components/SEOHead';
const contactReasons = [
  { id: 'general', label: 'Consulta general', icon: HelpCircle },
  { id: 'courses', label: 'Información de cursos', icon: Users },
  { id: 'schools', label: 'Programas para colegios', icon: Building2 },
  { id: 'support', label: 'Soporte técnico', icon: MessageCircle },
];

export function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: 'general',
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
        reason: 'general',
        message: '',
      });
    }, 3000);
  };

  return (
    <>
      <SEOHead
        title="Contacto - Ark-Up"
        description="¿Tienes preguntas sobre nuestros cursos de educación financiera para niños? Contáctanos por email, teléfono o WhatsApp. Te responderemos en menos de 24 horas."
        canonical="/contacto"
        schema={[organizationSchema]}
      />
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-ark-blue-50 via-white to-ark-green-50">
        <div className="ark-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-blue/10 text-ark-blue text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              <span>Contáctanos</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ark-navy mb-6">
              Estamos aquí para ayudarte
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              ¿Tienes preguntas? Nuestro equipo está listo para ayudarte. 
              Completa el formulario o contáctanos directamente.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="ark-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-gray-50 text-center">
              <div className="w-14 h-14 rounded-xl bg-ark-blue/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-ark-blue" />
              </div>
              <h3 className="font-heading font-bold text-ark-navy mb-1">Email</h3>
              <p className="text-gray-600 text-sm">hola@arkup.com</p>
              <p className="text-gray-500 text-xs">soporte@arkup.com</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 text-center">
              <div className="w-14 h-14 rounded-xl bg-ark-green/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-ark-green" />
              </div>
              <h3 className="font-heading font-bold text-ark-navy mb-1">Teléfono</h3>
              <p className="text-gray-600 text-sm">+52 1 234 567 890</p>
              <p className="text-gray-500 text-xs">WhatsApp disponible</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 text-center">
              <div className="w-14 h-14 rounded-xl bg-ark-purple/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-ark-purple" />
              </div>
              <h3 className="font-heading font-bold text-ark-navy mb-1">Horario</h3>
              <p className="text-gray-600 text-sm">Lun - Vie: 9am - 6pm</p>
              <p className="text-gray-500 text-xs">Sáb: 10am - 2pm</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 text-center">
              <div className="w-14 h-14 rounded-xl bg-ark-yellow/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-ark-yellow-600" />
              </div>
              <h3 className="font-heading font-bold text-ark-navy mb-1">Ubicación</h3>
              <p className="text-gray-600 text-sm">Ciudad de México</p>
              <p className="text-gray-500 text-xs">México</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="ark-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left - Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-ark-navy mb-4">
                    Envíanos un mensaje
                  </h2>
                  <p className="text-gray-600">
                    Completa el formulario y te responderemos en menos de 24 horas. 
                    Para consultas urgentes, contáctanos por WhatsApp.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-ark-blue to-ark-purple text-white">
                  <h3 className="font-heading font-bold mb-4">¿Prefieres hablar?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Nuestros asesores están listos para atenderte por WhatsApp.
                  </p>
                  <a 
                    href="https://wa.me/521234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chatear por WhatsApp</span>
                  </a>
                </div>

                <div className="p-6 rounded-2xl bg-white shadow-soft">
                  <h3 className="font-heading font-bold text-ark-navy mb-4">Respuesta garantizada</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-ark-green" />
                      <span className="text-gray-600">Respuesta en menos de 24h</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-ark-green" />
                      <span className="text-gray-600">Atención personalizada</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-ark-green" />
                      <span className="text-gray-600">Soporte en español</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl p-8 shadow-soft">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre completo *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono (opcional)
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+52 1 234 567 890"
                      />
                    </div>

                    {/* Reason */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Motivo de contacto *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {contactReasons.map((reason) => (
                          <button
                            key={reason.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, reason: reason.id })}
                            className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                              formData.reason === reason.id
                                ? 'border-ark-blue bg-ark-blue/5'
                                : 'border-gray-100 hover:border-ark-blue/30'
                            }`}
                          >
                            <reason.icon className={`w-5 h-5 ${
                              formData.reason === reason.id ? 'text-ark-blue' : 'text-gray-400'
                            }`} />
                            <span className={`text-sm ${
                              formData.reason === reason.id ? 'text-ark-blue font-medium' : 'text-gray-600'
                            }`}>
                              {reason.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ark-blue focus:ring-2 focus:ring-ark-blue/20 outline-none resize-none"
                        required
                      />
                    </div>

                    {/* Submit */}
                    <Button 
                      type="submit" 
                      className="w-full ark-button-primary h-14 text-lg"
                      disabled={isSubmitted}
                    >
                      {isSubmitted ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                          ¡Mensaje enviado! Te contactaremos pronto
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar mensaje
                        </>
                      )}
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                      Al enviar, aceptas nuestra{' '}
                      <a href="#" className="text-ark-blue hover:underline">política de privacidad</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="ark-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-2xl font-bold text-ark-navy mb-4">
              ¿Buscas algo específico?
            </h2>
            <p className="text-gray-600">
              Explora estas secciones para encontrar lo que necesitas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a 
              href="/cursos" 
              className="p-6 rounded-2xl bg-gray-50 hover:bg-ark-blue/5 transition-colors group"
            >
              <Users className="w-10 h-10 text-ark-blue mb-4" />
              <h3 className="font-heading font-bold text-ark-navy mb-2 group-hover:text-ark-blue transition-colors">
                Explorar cursos
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Conoce todos nuestros programas por edades.
              </p>
              <span className="inline-flex items-center text-ark-blue text-sm font-medium">
                Ver cursos <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </a>

            <a 
              href="/faq" 
              className="p-6 rounded-2xl bg-gray-50 hover:bg-ark-blue/5 transition-colors group"
            >
              <HelpCircle className="w-10 h-10 text-ark-green mb-4" />
              <h3 className="font-heading font-bold text-ark-navy mb-2 group-hover:text-ark-green transition-colors">
                Preguntas frecuentes
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Encuentra respuestas a las dudas más comunes.
              </p>
              <span className="inline-flex items-center text-ark-green text-sm font-medium">
                Ver FAQ <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </a>

            <a 
              href="/colegios" 
              className="p-6 rounded-2xl bg-gray-50 hover:bg-ark-blue/5 transition-colors group"
            >
              <Building2 className="w-10 h-10 text-ark-purple mb-4" />
              <h3 className="font-heading font-bold text-ark-navy mb-2 group-hover:text-ark-purple transition-colors">
                Programas para colegios
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Descubre nuestras soluciones institucionales.
              </p>
              <span className="inline-flex items-center text-ark-purple text-sm font-medium">
                Ver más <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
