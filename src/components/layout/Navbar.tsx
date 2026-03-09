import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap, ShoppingBag, Building2, Users, HelpCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useScrollDirection } from '@/hooks';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Cursos',
    href: '/cursos',
    icon: <GraduationCap className="w-4 h-4" />,
    children: [
      { label: '6-9 años', href: '/cursos#edad-6-9', description: 'Primeros pasos con el dinero' },
      { label: '10-13 años', href: '/cursos#edad-10-13', description: 'Ahorro y presupuesto' },
      { label: '14-17 años', href: '/cursos#edad-14-17', description: 'Inversión y emprendimiento' },
    ],
  },
  {
    label: 'Productos',
    href: '/productos',
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    label: 'Colegios',
    href: '/colegios',
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    label: 'Nosotros',
    href: '/nosotros',
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: 'FAQ',
    href: '/faq',
    icon: <HelpCircle className="w-4 h-4" />,
  },
  {
    label: 'Contacto',
    href: '/contacto',
    icon: <Phone className="w-4 h-4" />,
  },
];

export function Navbar() {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isScrolled = scrollY > 20;
  const isHidden = scrollDirection === 'down' && scrollY > 100;
  const isHome = location.pathname === '/';

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = (href: string) => {
    setIsOpen(false);

    // Handle hash links for same-page navigation
    if (href.startsWith('#') || href.includes('#')) {
      const hashIndex = href.indexOf('#');
      const hash = hashIndex >= 0 ? href.slice(hashIndex) : href;
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-soft'
          : 'bg-transparent'
        }`}
      role="banner"
    >
      <nav className="ark-container" role="navigation" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Ark-Up - Inicio"
          >
            <img
              src="/logo.png"
              alt="ArkUp Logo"
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isScrolled
                        ? 'text-gray-700 hover:text-ark-blue hover:bg-ark-blue/5'
                        : 'text-gray-700 hover:text-ark-blue hover:bg-ark-blue/5'
                        }`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.label} asChild>
                        <Link
                          to={child.href}
                          onClick={() => scrollToSection(child.href)}
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{child.label}</span>
                            {child.description && (
                              <span className="text-xs text-gray-500">{child.description}</span>
                            )}
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isScrolled
                    ? 'text-gray-700 hover:text-ark-blue hover:bg-ark-blue/5'
                    : 'text-gray-700 hover:text-ark-blue hover:bg-ark-blue/5'
                    }`}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isHome ? (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-ark-blue"
                  onClick={() => scrollToSection('#simulador')}
                >
                  Simulador
                </Button>
                <Button
                  className="ark-button-primary"
                  onClick={() => scrollToSection('#cursos')}
                >
                  Comenzar Ahora
                </Button>
              </>
            ) : (
              <Link to="/cursos">
                <Button className="ark-button-primary">
                  Comenzar Ahora
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-0" id="mobile-menu" role="dialog" aria-label="Menú de navegación móvil">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)} aria-label="Ark-Up - Inicio">
                    <img
                      src="/logo.png"
                      alt="ArkUp Logo"
                      className="h-10 w-auto"
                    />
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Cerrar menú">
                      <X className="w-6 h-6" aria-hidden="true" />
                    </Button>
                  </SheetClose>
                </div>

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-auto py-4">
                  <nav className="px-4 space-y-1">
                    {navItems.map((item) => (
                      <div key={item.label}>
                        {item.children ? (
                          <div className="space-y-1">
                            <div className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                              {item.label}
                            </div>
                            {item.children.map((child) => (
                              <SheetClose asChild key={child.label}>
                                <Link
                                  to={child.href}
                                  onClick={() => scrollToSection(child.href)}
                                  className="flex flex-col px-3 py-3 rounded-lg text-gray-700 hover:bg-ark-blue/5 hover:text-ark-blue transition-colors"
                                >
                                  <span className="font-medium">{child.label}</span>
                                  {child.description && (
                                    <span className="text-xs text-gray-500">{child.description}</span>
                                  )}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        ) : (
                          <SheetClose asChild>
                            <Link
                              to={item.href}
                              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-ark-blue/5 hover:text-ark-blue transition-colors"
                            >
                              {item.icon}
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          </SheetClose>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Mobile CTA */}
                <div className="p-4 border-t space-y-3">
                  <Link to="/cursos" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-center ark-button-primary">
                      Comenzar Ahora
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
