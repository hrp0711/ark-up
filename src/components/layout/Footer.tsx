import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const footerLinks = {
  cursos: [
    { label: '6-9 años', href: '/cursos#edad-6-9' },
    { label: '10-13 años', href: '/cursos#edad-10-13' },
    { label: '14-17 años', href: '/cursos#edad-14-17' },
    { label: 'Todos los cursos', href: '/cursos' },
  ],
  empresa: [
    { label: 'Sobre Nosotros', href: '/nosotros' },
    { label: 'Para Colegios', href: '/colegios' },
    { label: 'Carreras', href: '/carreras' },
    { label: 'Prensa', href: '/prensa' },
  ],
  recursos: [
    { label: 'Blog Educativo', href: '/blog' },
    { label: 'Guías Gratuitas', href: '/recursos' },
    { label: 'Simulador de Ahorro', href: '/#simulador' },
    { label: 'Quiz Financiero', href: '/#quiz' },
  ],
  soporte: [
    { label: 'Centro de Ayuda', href: '/faq' },
    { label: 'Contacto', href: '/contacto' },
    { label: 'Términos de Servicio', href: '/terminos' },
    { label: 'Política de Privacidad', href: '/privacidad' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/arkup', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/arkup', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/arkup', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/arkup', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/arkup', label: 'YouTube' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-ark-navy text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="ark-container py-12 md:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="lg:max-w-md">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                Únete a nuestra comunidad de padres
              </h3>
              <p className="text-gray-400">
                Recibe consejos financieros, recursos educativos y ofertas exclusivas para tu familia.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-[400px]">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-ark-blue focus:ring-ark-blue"
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-6 bg-ark-blue hover:bg-ark-blue-700 text-white font-semibold"
              >
                {isSubscribed ? '¡Suscrito!' : 'Suscribirme'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="ark-container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl">Ark-Up</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Educación financiera divertida y efectiva para niños y jóvenes. 
              Preparando a la nueva generación para un futuro financiero brillante.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href="mailto:hola@arkup.com" 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>hola@arkup.com</span>
              </a>
              <a 
                href="tel:+521234567890" 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+52 1 234 567 890</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>Ciudad de México, México</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-ark-blue hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Cursos</h4>
            <ul className="space-y-3">
              {footerLinks.cursos.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Soporte</h4>
            <ul className="space-y-3">
              {footerLinks.soporte.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="ark-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Ark-Up. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Hecho con <Heart className="w-4 h-4 text-red-500 fill-red-500" /> para las familias de Latinoamérica
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
