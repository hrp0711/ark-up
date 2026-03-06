import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  ChevronRight,
  Sparkles,
  BookOpen,
  Building2,
  DollarSign,
  UserPlus,
  Headphones,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Types
interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: QuickOption[];
  action?: string;
}

interface QuickOption {
  id: string;
  label: string;
  icon: React.ElementType;
  response: string;
  action?: string;
  link?: string;
}

// Quick options configuration
const quickOptions: QuickOption[] = [
  {
    id: 'courses',
    label: 'Conocer cursos para mi hijo',
    icon: BookOpen,
    response: '¡Perfecto! Tenemos cursos diseñados para cada edad:\n\n• **6-9 años**: Pequeños Exploradores - Conceptos básicos de dinero y ahorro\n• **10-13 años**: Jóvenes Ahorradores - Presupuesto e inversión básica\n• **14-17 años**: Futuros Financieros - Independencia financiera y emprendimiento\n\n¿Te gustaría ver más detalles de algún curso en particular?',
    action: 'scrollToCourses',
  },
  {
    id: 'schools',
    label: 'Ver programas para colegios',
    icon: Building2,
    response: 'Ofrecemos programas institucionales para escuelas con:\n\n• Acceso ilimitado a todos los cursos\n• Dashboard para profesores\n• Reportes de progreso mensuales\n• Capacitación docente incluida\n• Precio por estudiante: $149 MXN/año\n\n¿Te gustaría solicitar información para tu institución?',
    action: 'scrollToSchools',
  },
  {
    id: 'pricing',
    label: 'Preguntar sobre precios',
    icon: DollarSign,
    response: 'Nuestros planes son muy accesibles:\n\n• **Básico**: $299/mes - 3 cursos básicos\n• **Premium**: $599/mes - Todos los cursos (Más popular)\n• **Familiar**: $999/mes - Hasta 4 perfiles\n\nTodos incluyen garantía de 30 días. ¿Te gustaría comenzar con una prueba gratuita?',
    action: 'scrollToPricing',
  },
  {
    id: 'enroll',
    label: 'Saber cómo inscribir a mi hijo',
    icon: UserPlus,
    response: 'Inscribir a tu hijo es muy sencillo:\n\n1. **Crea una cuenta gratuita** (menos de 2 minutos)\n2. **Selecciona el curso** según la edad de tu hijo\n3. **Comienza el aprendizaje** con lecciones interactivas\n\n¿Quieres que te guíe al formulario de registro?',
    action: 'scrollToEnroll',
  },
  {
    id: 'advisor',
    label: 'Hablar con un asesor',
    icon: Headphones,
    response: '¡Con gusto! Nuestros asesores están disponibles para ayudarte:\n\n• **Horario**: Lunes a Viernes, 9am - 6pm\n• **WhatsApp**: +52 1 234 567 890\n• **Email**: hola@arkup.com\n\nTambién puedo responder preguntas básicas ahora mismo. ¿Qué te gustaría saber?',
    action: 'showContact',
  },
];

// FAQ responses
const faqResponses: Record<string, string> = {
  'edad': 'Nuestros cursos están diseñados para niños y jóvenes de 6 a 17 años, divididos en tres grupos: 6-9 años, 10-13 años y 14-17 años.',
  'mesada': 'Recomendamos una mesada apropiada a la edad del niño. Lo importante es la consistencia y usarla como herramienta de aprendizaje.',
  'prueba': '¡Sí! Ofrecemos 7 días de prueba gratuita en todos nuestros planes. Sin tarjeta de crédito requerida.',
  'certificado': 'Sí, al completar cada curso, tu hijo recibe un certificado oficial que reconoce sus habilidades financieras.',
  'cancelar': 'Puedes cancelar tu suscripción en cualquier momento, sin penalizaciones. Tendrás acceso hasta el final del período pagado.',
  'pago': 'Aceptamos tarjetas de crédito/débito, transferencias bancarias y pagos en OXXO.',
  'colegio': 'Sí, tenemos programas especiales para colegios con precios institucionales. Contáctanos para más información.',
  'padres': 'Ofrecemos una guía gratuita para padres y webinars mensuales sobre educación financiera infantil.',
};

// Initial welcome message
const welcomeMessage: Message = {
  id: 'welcome',
  type: 'bot',
  content: '¡Hola! Soy el asistente virtual de Ark-Up. 🎓\n\nEstoy aquí para ayudarte a encontrar el mejor programa de educación financiera para tu hijo.\n\n¿Cómo puedo ayudarte hoy?',
  options: quickOptions,
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle option click
  const handleOptionClick = (option: QuickOption) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: option.label,
    };
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: option.response,
        action: option.action,
      };
      setMessages(prev => [...prev, botMessage]);

      // Execute action if provided
      if (option.action) {
        handleAction(option.action);
      }
    }, 800);
  };

  // Handle text input submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
    };
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Process user input and generate response
    setTimeout(() => {
      setIsTyping(false);
      const response = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue('');
  };

  // Generate response based on user input
  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Check for FAQ keywords
    for (const [keyword, response] of Object.entries(faqResponses)) {
      if (lowerInput.includes(keyword)) {
        return response;
      }
    }

    // Default responses
    if (lowerInput.includes('hola') || lowerInput.includes('buenos') || lowerInput.includes('buenas')) {
      return '¡Hola! ¿En qué puedo ayudarte hoy? Selecciona una opción o hazme una pregunta.';
    }

    if (lowerInput.includes('gracias')) {
      return '¡De nada! 😊 Estoy aquí para lo que necesites. ¿Hay algo más en lo que pueda ayudarte?';
    }

    if (lowerInput.includes('adios') || lowerInput.includes('hasta luego')) {
      return '¡Hasta luego! Que tengas un excelente día. Recuerda que estoy aquí cuando me necesites. 👋';
    }

    // Fallback response
    return 'Entiendo. Para darte la mejor ayuda, te sugiero seleccionar una de las opciones rápidas o si prefieres, puedes contactar directamente con uno de nuestros asesores.\n\n¿Te gustaría hablar con un asesor?';
  };

  // Handle actions
  const handleAction = (action: string) => {
    switch (action) {
      case 'scrollToCourses':
        setTimeout(() => {
          document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
        break;
      case 'scrollToSchools':
        setTimeout(() => {
          document.getElementById('colegios')?.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
        break;
      case 'scrollToPricing':
        setTimeout(() => {
          document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
        break;
      case 'scrollToEnroll':
        setTimeout(() => {
          document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
        break;
      case 'showContact':
        // Show contact info in chat
        break;
    }
  };

  // Reset chat
  const handleReset = () => {
    setMessages([welcomeMessage]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-ark-xl flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-gray-800 rotate-90' 
            : 'bg-gradient-to-r from-ark-blue to-ark-purple hover:scale-110 animate-pulse-soft'
        }`}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-full max-w-sm bg-white rounded-3xl shadow-ark-xl overflow-hidden transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
        style={{ maxHeight: isOpen ? '600px' : '0' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-ark-blue to-ark-purple p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white">Asistente Ark-Up</h3>
                <div className="flex items-center gap-1 text-white/70 text-sm">
                  <span className="w-2 h-2 rounded-full bg-ark-green animate-pulse" />
                  En línea
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Reiniciar conversación"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'bot'
                    ? 'bg-gradient-to-br from-ark-blue to-ark-purple'
                    : 'bg-gray-200'
                }`}
              >
                {message.type === 'bot' ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-gray-600" />
                )}
              </div>

              {/* Message Content */}
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  message.type === 'bot'
                    ? 'bg-white shadow-soft text-gray-700 rounded-tl-none'
                    : 'bg-ark-blue text-white rounded-tr-none'
                }`}
              >
                <div className="whitespace-pre-line">{message.content}</div>

                {/* Quick Options */}
                {message.options && (
                  <div className="mt-3 space-y-2">
                    {message.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionClick(option)}
                        className="w-full flex items-center gap-2 p-2 rounded-xl bg-gray-50 hover:bg-ark-blue/10 text-left transition-colors text-gray-700 hover:text-ark-blue"
                      >
                        <option.icon className="w-4 h-4" />
                        <span className="flex-1 text-xs">{option.label}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Action Link */}
                {message.action && (
                  <button
                    onClick={() => handleAction(message.action!)}
                    className="mt-3 flex items-center gap-2 text-ark-blue hover:underline text-xs"
                  >
                    Ver más información
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white shadow-soft p-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon"
              className="bg-ark-blue hover:bg-ark-blue-700"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Presiona Enter para enviar
          </p>
        </form>
      </div>
    </>
  );
}
