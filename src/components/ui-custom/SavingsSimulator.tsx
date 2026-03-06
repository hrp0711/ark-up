import { useState, useEffect, useCallback } from 'react';
import { 
  PiggyBank, 
  TrendingUp, 
  Calendar, 
  Target, 
  Sparkles,
  Lightbulb,
  CheckCircle2,
  RefreshCw,
  Coins,
  Wallet,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

// Educational tips based on progress
const educationalTips = [
  {
    threshold: 0,
    title: '¡Comienza hoy!',
    message: 'Cada pequeño ahorro suma. Incluso $20 pesos a la semana pueden convertirse en $1,040 al año.',
    icon: Lightbulb,
    color: 'blue',
  },
  {
    threshold: 10,
    title: '¡Vas por buen camino!',
    message: 'El hábito del ahorro es más importante que la cantidad. ¡Tu hijo está aprendiendo una habilidad valiosa!',
    icon: CheckCircle2,
    color: 'green',
  },
  {
    threshold: 25,
    title: '¡Un cuarto del camino!',
    message: 'Fantástico. A este ritmo, tu hijo está construyendo disciplina financiera que durará toda la vida.',
    icon: TrendingUp,
    color: 'purple',
  },
  {
    threshold: 50,
    title: '¡Mitad de camino!',
    message: '¡Increíble! La mitad de la meta está alcanzada. Tu hijo está viendo cómo el esfuerzo constante da resultados.',
    icon: Sparkles,
    color: 'yellow',
  },
  {
    threshold: 75,
    title: '¡Casi llegas!',
    message: '¡Estás muy cerca! Este es el momento de mantener el momentum y celebrar el progreso logrado.',
    icon: Target,
    color: 'orange',
  },
  {
    threshold: 100,
    title: '¡Meta Alcanzada! 🎉',
    message: '¡Felicidades! Tu hijo ha alcanzado su meta. Es momento de celebrar y planificar la siguiente.',
    icon: PiggyBank,
    color: 'green',
  },
];

// Predefined goals for kids
const predefinedGoals = [
  { name: 'Juguete', amount: 500, icon: '🎮' },
  { name: 'Bicicleta', amount: 2000, icon: '🚲' },
  { name: 'Tablet', amount: 5000, icon: '📱' },
  { name: 'Videojuego', amount: 1500, icon: '🎮' },
  { name: 'Ropa', amount: 800, icon: '👕' },
  { name: 'Libros', amount: 600, icon: '📚' },
];

// Weekly savings presets
const weeklyPresets = [20, 50, 100, 200, 500];

interface SavingsSimulatorProps {
  compact?: boolean;
}

export function SavingsSimulator({ compact = false }: SavingsSimulatorProps) {
  // State
  const [goalName, setGoalName] = useState('Bicicleta nueva');
  const [goalAmount, setGoalAmount] = useState(2000);
  const [weeklySavings, setWeeklySavings] = useState(100);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Calculations
  const weeksNeeded = Math.ceil((goalAmount - currentSavings) / weeklySavings);
  const progressPercentage = Math.min((currentSavings / goalAmount) * 100, 100);
  const monthsNeeded = Math.ceil(weeksNeeded / 4);

  // Get current tip based on progress
  const currentTip = educationalTips
    .slice()
    .reverse()
    .find(tip => progressPercentage >= tip.threshold) || educationalTips[0];

  // Celebration effect when goal is reached
  useEffect(() => {
    if (progressPercentage >= 100 && !showCelebration) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [progressPercentage]);

  // Format currency
  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  // Format date
  const formatTargetDate = useCallback((weeks: number) => {
    const date = new Date();
    date.setDate(date.getDate() + weeks * 7);
    return date.toLocaleDateString('es-MX', { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric' 
    });
  }, []);

  // Reset simulator
  const handleReset = () => {
    setGoalAmount(2000);
    setWeeklySavings(100);
    setCurrentSavings(0);
    setGoalName('Bicicleta nueva');
    setShowCelebration(false);
  };

  // Simulate adding savings
  const handleAddSavings = () => {
    const newSavings = Math.min(currentSavings + weeklySavings, goalAmount);
    setCurrentSavings(newSavings);
  };

  // Color based on progress
  const getProgressColor = (progress: number) => {
    if (progress < 25) return 'from-ark-blue to-ark-blue-400';
    if (progress < 50) return 'from-ark-blue to-ark-green';
    if (progress < 75) return 'from-ark-green to-ark-yellow';
    if (progress < 100) return 'from-ark-yellow to-ark-orange';
    return 'from-ark-green to-ark-green-600';
  };

  const TipIcon = currentTip.icon;

  return (
    <div className={`bg-white rounded-3xl shadow-ark-xl overflow-hidden ${compact ? 'p-6' : 'p-8 lg:p-10'}`}>
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-ark-green/90 backdrop-blur-sm rounded-3xl animate-in fade-in duration-300">
          <div className="text-center text-white p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="font-heading text-3xl font-bold mb-2">¡Meta Alcanzada!</h3>
            <p className="text-white/80 mb-6">Tu hijo ha logrado su meta de ahorro</p>
            <Button 
              onClick={() => setShowCelebration(false)}
              className="bg-white text-ark-green hover:bg-gray-100"
            >
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center">
            <PiggyBank className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-ark-navy">Simulador de Ahorro</h3>
            <p className="text-gray-500 text-sm">Planifica las metas de tu hijo</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-ark-blue transition-colors"
          title="Reiniciar simulador"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Goal Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          ¿Qué quiere ahorrar tu hijo?
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
          {predefinedGoals.map((goal) => (
            <button
              key={goal.name}
              onClick={() => {
                setGoalName(goal.name);
                setGoalAmount(goal.amount);
                setCurrentSavings(0);
              }}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                goalName === goal.name
                  ? 'border-ark-blue bg-ark-blue/5'
                  : 'border-gray-100 hover:border-ark-blue/30'
              }`}
            >
              <div className="text-2xl mb-1">{goal.icon}</div>
              <div className="text-xs font-medium text-gray-700">{goal.name}</div>
              <div className="text-xs text-gray-400">${goal.amount}</div>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="Nombre de la meta"
            className="flex-1"
          />
          <div className="relative w-32">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <Input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
              className="pl-7"
            />
          </div>
        </div>
      </div>

      {/* Weekly Savings */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-gray-700">
            ¿Cuánto puede ahorrar por semana?
          </label>
          <span className="text-2xl font-bold text-ark-green">{formatCurrency(weeklySavings)}</span>
        </div>
        
        {/* Preset buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {weeklyPresets.map((amount) => (
            <button
              key={amount}
              onClick={() => setWeeklySavings(amount)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                weeklySavings === amount
                  ? 'bg-ark-green text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-ark-green/10 hover:text-ark-green'
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>

        <Slider
          value={[weeklySavings]}
          onValueChange={(value) => setWeeklySavings(value[0])}
          max={1000}
          min={10}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>$10</span>
          <span>$500</span>
          <span>$1,000</span>
        </div>
      </div>

      {/* Current Savings (for simulation) */}
      {!compact && (
        <div className="mb-8 p-4 rounded-2xl bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-700">
              Ahorro actual (simulación)
            </label>
            <span className="text-xl font-bold text-ark-blue">{formatCurrency(currentSavings)}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddSavings}
              className="flex-1"
            >
              <Coins className="w-4 h-4 mr-2" />
              Agregar ahorro semanal
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentSavings(0)}
              className="px-3"
            >
              Reiniciar
            </Button>
          </div>
        </div>
      )}

      {/* Progress Visualization */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="text-sm text-gray-500 mb-1">Progreso hacia la meta</div>
            <div className="font-heading text-3xl font-bold text-ark-navy">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">{formatCurrency(currentSavings)}</div>
            <div className="text-sm text-gray-400">de {formatCurrency(goalAmount)}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-6 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div 
            className={`h-full bg-gradient-to-r ${getProgressColor(progressPercentage)} rounded-full transition-all duration-700 ease-out relative`}
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Visual Coins Representation */}
        <div className="flex flex-wrap gap-1 justify-center">
          {Array.from({ length: 20 }).map((_, i) => {
            const coinProgress = (i + 1) * 5;
            const isFilled = progressPercentage >= coinProgress;
            return (
              <div
                key={i}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                  isFilled
                    ? 'bg-gradient-to-br from-ark-yellow to-ark-orange text-white'
                    : 'bg-gray-100 text-gray-300'
                }`}
              >
                $
              </div>
            );
          })}
        </div>
      </div>

      {/* Results Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-ark-blue/5 text-center">
          <div className="w-10 h-10 rounded-xl bg-ark-blue/10 flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-5 h-5 text-ark-blue" />
          </div>
          <div className="text-2xl font-bold text-ark-blue">{weeksNeeded}</div>
          <div className="text-xs text-gray-600">semanas</div>
        </div>

        <div className="p-4 rounded-2xl bg-ark-green/5 text-center">
          <div className="w-10 h-10 rounded-xl bg-ark-green/10 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-ark-green" />
          </div>
          <div className="text-2xl font-bold text-ark-green">{monthsNeeded}</div>
          <div className="text-xs text-gray-600">meses</div>
        </div>

        <div className="p-4 rounded-2xl bg-ark-purple/5 text-center">
          <div className="w-10 h-10 rounded-xl bg-ark-purple/10 flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-ark-purple" />
          </div>
          <div className="text-sm font-bold text-ark-purple">{formatTargetDate(weeksNeeded)}</div>
          <div className="text-xs text-gray-600">fecha meta</div>
        </div>

        <div className="p-4 rounded-2xl bg-ark-yellow/10 text-center">
          <div className="w-10 h-10 rounded-xl bg-ark-yellow/20 flex items-center justify-center mx-auto mb-2">
            <Wallet className="w-5 h-5 text-ark-yellow-600" />
          </div>
          <div className="text-lg font-bold text-ark-yellow-700">{formatCurrency(weeklySavings * 4)}</div>
          <div className="text-xs text-gray-600">al mes</div>
        </div>
      </div>

      {/* Educational Tip */}
      <div className={`p-5 rounded-2xl border-2 bg-gradient-to-r ${
        currentTip.color === 'blue' ? 'from-ark-blue/5 to-ark-blue/10 border-ark-blue/20' :
        currentTip.color === 'green' ? 'from-ark-green/5 to-ark-green/10 border-ark-green/20' :
        currentTip.color === 'purple' ? 'from-ark-purple/5 to-ark-purple/10 border-ark-purple/20' :
        currentTip.color === 'yellow' ? 'from-ark-yellow/5 to-ark-yellow/10 border-ark-yellow/20' :
        'from-ark-orange/5 to-ark-orange/10 border-ark-orange/20'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            currentTip.color === 'blue' ? 'bg-ark-blue/10' :
            currentTip.color === 'green' ? 'bg-ark-green/10' :
            currentTip.color === 'purple' ? 'bg-ark-purple/10' :
            currentTip.color === 'yellow' ? 'bg-ark-yellow/20' :
            'bg-ark-orange/10'
          }`}>
            <TipIcon className={`w-6 h-6 ${
              currentTip.color === 'blue' ? 'text-ark-blue' :
              currentTip.color === 'green' ? 'text-ark-green' :
              currentTip.color === 'purple' ? 'text-ark-purple' :
              currentTip.color === 'yellow' ? 'text-ark-yellow-600' :
              'text-ark-orange'
            }`} />
          </div>
          <div>
            <h4 className={`font-heading font-bold mb-1 ${
              currentTip.color === 'blue' ? 'text-ark-blue' :
              currentTip.color === 'green' ? 'text-ark-green' :
              currentTip.color === 'purple' ? 'text-ark-purple' :
              currentTip.color === 'yellow' ? 'text-ark-yellow-700' :
              'text-ark-orange'
            }`}>
              {currentTip.title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {currentTip.message}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {!compact && (
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button className="flex-1 ark-button-primary">
            <Target className="w-5 h-5 mr-2" />
            Guardar esta meta
          </Button>
          <Button variant="outline" className="flex-1">
            <TrendingUp className="w-5 h-5 mr-2" />
            Ver más herramientas
          </Button>
        </div>
      )}
    </div>
  );
}
