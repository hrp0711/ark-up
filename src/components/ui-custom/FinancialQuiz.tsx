import { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Target, 
  TrendingUp, 
  Award,
  Sparkles,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Quiz questions
const questions = [
  {
    id: 1,
    question: '¿Tu hijo recibe mesada o dinero de regalo regularmente?',
    description: 'Esto incluye mesada semanal, dinero de cumpleaños, o recompensas por tareas.',
    options: [
      { value: 0, label: 'No recibe dinero', icon: '❌' },
      { value: 1, label: 'A veces, de forma irregular', icon: '🎁' },
      { value: 2, label: 'Sí, recibe mesada semanal/mensual', icon: '💰' },
    ],
  },
  {
    id: 2,
    question: '¿Sabe tu hijo diferenciar entre necesidades y deseos?',
    description: 'Por ejemplo, entiende que la comida es necesidad y un juguete es deseo.',
    options: [
      { value: 0, label: 'No lo distingue', icon: '🤔' },
      { value: 1, label: 'Lo entiende con ayuda', icon: '💡' },
      { value: 2, label: 'Sí, lo identifica claramente', icon: '✅' },
    ],
  },
  {
    id: 3,
    question: '¿Tu hijo tiene algún hábito de ahorro?',
    description: 'Guarda dinero en una alcancía o tiene un lugar especial para sus ahorros.',
    options: [
      { value: 0, label: 'No ahorra nada', icon: '💸' },
      { value: 1, label: 'Ahorra ocasionalmente', icon: '🐷' },
      { value: 2, label: 'Tiene un hábito de ahorro regular', icon: '🏦' },
    ],
  },
  {
    id: 4,
    question: '¿Hablan de dinero y finanzas en casa?',
    description: 'Conversaciones sobre ahorro, presupuesto, o decisiones de compra.',
    options: [
      { value: 0, label: 'Casi nunca hablamos del tema', icon: '🤐' },
      { value: 1, label: 'A veces, de forma casual', icon: '💬' },
      { value: 2, label: 'Sí, es un tema recurrente', icon: '🗣️' },
    ],
  },
  {
    id: 5,
    question: '¿Tu hijo establece metas de ahorro?',
    description: 'Por ejemplo: "Quiero juntar $500 para un juguete" o tiene objetivos claros.',
    options: [
      { value: 0, label: 'No establece metas', icon: '🎯' },
      { value: 1, label: 'Metas a corto plazo', icon: '📅' },
      { value: 2, label: 'Metas claras a mediano plazo', icon: '🚀' },
    ],
  },
  {
    id: 6,
    question: '¿Comprende el valor del dinero y el esfuerzo para ganarlo?',
    description: 'Entiende que el dinero se gana con trabajo y no es ilimitado.',
    options: [
      { value: 0, label: 'Cree que el dinero es ilimitado', icon: '♾️' },
      { value: 1, label: 'Lo empieza a entender', icon: '💭' },
      { value: 2, label: 'Sí, comprende el esfuerzo', icon: '💪' },
    ],
  },
  {
    id: 7,
    question: '¿Ha tenido experiencias con compras propias?',
    description: 'Ha pagado por algo él mismo, manejado dinero en una tienda, etc.',
    options: [
      { value: 0, label: 'Nunca ha comprado solo', icon: '🛒' },
      { value: 1, label: 'Compras con supervisión', icon: '👨‍👩‍👧' },
      { value: 2, label: 'Sí, compra de forma independiente', icon: '💳' },
    ],
  },
  {
    id: 8,
    question: '¿Tu hijo muestra interés en aprender sobre finanzas?',
    description: 'Pregunta sobre dinero, ahorro, o muestra curiosidad por el tema.',
    options: [
      { value: 0, label: 'No muestra interés', icon: '😴' },
      { value: 1, label: 'Algo de curiosidad', icon: '🤨' },
      { value: 2, label: 'Sí, es muy curioso', icon: '🤓' },
    ],
  },
];

// Result levels
const resultLevels = {
  inicial: {
    name: 'Nivel Inicial',
    description: 'Tu hijo está comenzando su viaje financiero. Tiene mucho potencial por descubrir y necesita una base sólida para desarrollar hábitos saludables.',
    color: 'blue',
    icon: Lightbulb,
    minScore: 0,
    maxScore: 5,
    recommendation: 'Pequeños Exploradores (6-9 años)',
    courseId: 'pequenos-ahorradores',
    tips: [
      'Comienza con conceptos básicos: identificar monedas y billetes',
      'Usa una alcancía visible para hacer el ahorro tangible',
      'Establece una mesada pequeña y consistente',
      'Habla abiertamente sobre dinero en casa',
    ],
  },
  desarrollo: {
    name: 'Nivel en Desarrollo',
    description: 'Tu hijo tiene buenas bases y está mostrando interés en el tema. Con la orientación adecuada, puede desarrollar hábitos financieros sólidos.',
    color: 'green',
    icon: TrendingUp,
    minScore: 6,
    maxScore: 11,
    recommendation: 'Jóvenes Ahorradores (10-13 años)',
    courseId: 'maestros-presupuesto',
    tips: [
      'Refuerza el hábito del ahorro con metas concretas',
      'Enseña a crear un presupuesto simple',
      'Involúcralo en decisiones de compra familiares',
      'Introduce el concepto de interés e inversión básica',
    ],
  },
  avanzado: {
    name: 'Nivel Avanzado',
    description: '¡Excelente! Tu hijo demuestra madurez financiera para su edad. Está listo para conceptos más avanzados y puede convertirse en un referente para otros.',
    color: 'purple',
    icon: Award,
    minScore: 12,
    maxScore: 16,
    recommendation: 'Futuros Financieros (14-17 años)',
    courseId: 'finanzas-adolescentes',
    tips: [
      'Introduce conceptos de inversión y crecimiento',
      'Anima el emprendimiento y la creación de valor',
      'Enseña sobre crédito, deudas y responsabilidad financiera',
      'Considera abrir una cuenta bancaria juvenil',
    ],
  },
};

interface FinancialQuizProps {
  onComplete?: (result: typeof resultLevels.inicial) => void;
  compact?: boolean;
}

export function FinancialQuiz({ onComplete, compact = false }: FinancialQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Calculate total score
  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);

  // Determine result level
  const getResultLevel = () => {
    if (totalScore <= 5) return resultLevels.inicial;
    if (totalScore <= 11) return resultLevels.desarrollo;
    return resultLevels.avanzado;
  };

  const result = getResultLevel();
  const ResultIcon = result.icon;

  // Handle answer selection
  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: value }));
    
    if (currentQuestion < totalQuestions - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      setShowResults(true);
      onComplete?.(result);
    }
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Reset quiz
  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  // Get color classes based on result
  const getColorClasses = (color: string) => {
    const classes: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
      blue: {
        bg: 'bg-ark-blue/10',
        text: 'text-ark-blue',
        border: 'border-ark-blue/20',
        gradient: 'from-ark-blue to-ark-blue-600',
      },
      green: {
        bg: 'bg-ark-green/10',
        text: 'text-ark-green',
        border: 'border-ark-green/20',
        gradient: 'from-ark-green to-ark-green-600',
      },
      purple: {
        bg: 'bg-ark-purple/10',
        text: 'text-ark-purple',
        border: 'border-ark-purple/20',
        gradient: 'from-ark-purple to-ark-purple-600',
      },
    };
    return classes[color];
  };

  // Results View
  if (showResults) {
    const colors = getColorClasses(result.color);

    return (
      <div className={`bg-white rounded-3xl shadow-ark-xl overflow-hidden ${compact ? 'p-6' : 'p-8 lg:p-10'}`}>
        {/* Result Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${colors.bg} mb-4`}>
            <ResultIcon className={`w-10 h-10 ${colors.text}`} />
          </div>
          <h3 className={`font-heading text-2xl lg:text-3xl font-bold ${colors.text} mb-2`}>
            {result.name}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {result.description}
          </p>
        </div>

        {/* Score */}
        <div className="flex justify-center mb-8">
          <div className={`px-6 py-3 rounded-2xl ${colors.bg}`}>
            <span className="text-sm text-gray-600">Puntuación: </span>
            <span className={`font-heading text-2xl font-bold ${colors.text}`}>
              {totalScore}/{totalQuestions * 2}
            </span>
          </div>
        </div>

        {/* Recommendation */}
        <div className={`p-6 rounded-2xl bg-gradient-to-r ${colors.gradient} text-white mb-8`}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Curso recomendado</p>
              <h4 className="font-heading text-xl font-bold">{result.recommendation}</h4>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mb-8">
          <h4 className="font-heading font-bold text-ark-navy mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-ark-yellow" />
            Consejos para tu hijo
          </h4>
          <div className="space-y-3">
            {result.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                <div className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                </div>
                <span className="text-gray-700 text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className={`flex-1 bg-gradient-to-r ${colors.gradient} text-white`}
          >
            Ver curso recomendado
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="flex-1"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Hacer el quiz de nuevo
          </Button>
        </div>
      </div>
    );
  }

  // Quiz View
  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];

  return (
    <div className={`bg-white rounded-3xl shadow-ark-xl overflow-hidden ${compact ? 'p-6' : 'p-8 lg:p-10'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center">
            <span className="text-white font-bold">{currentQuestion + 1}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Pregunta</span>
            <span className="text-sm font-medium text-ark-navy ml-1">
              {currentQuestion + 1} de {totalQuestions}
            </span>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-ark-blue transition-colors"
          title="Reiniciar quiz"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Inicio</span>
          <span>{Math.round(progress)}% completado</span>
          <span>Fin</span>
        </div>
      </div>

      {/* Question */}
      <div className={`mb-8 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
        <h3 className="font-heading text-xl lg:text-2xl font-bold text-ark-navy mb-3">
          {question.question}
        </h3>
        <p className="text-gray-500 text-sm">
          {question.description}
        </p>
      </div>

      {/* Options */}
      <div className={`space-y-3 mb-8 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
              currentAnswer === option.value
                ? 'border-ark-blue bg-ark-blue/5'
                : 'border-gray-100 hover:border-ark-blue/30 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl">{option.icon}</span>
            <span className="flex-1 font-medium text-gray-700">{option.label}</span>
            {currentAnswer === option.value && (
              <CheckCircle2 className="w-6 h-6 text-ark-blue" />
            )}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Anterior
        </Button>
        
        <div className="flex items-center gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentQuestion
                  ? 'w-6 bg-ark-blue'
                  : index < currentQuestion
                  ? 'bg-ark-blue'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          disabled={currentQuestion === totalQuestions - 1}
          className="disabled:opacity-50"
          onClick={() => {
            if (currentAnswer !== undefined) {
              handleAnswer(currentAnswer);
            }
          }}
        >
          Siguiente
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
