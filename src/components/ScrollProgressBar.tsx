import { useScrollProgress } from '@/hooks';

export function ScrollProgressBar() {
  const progress = useScrollProgress();
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-[60]">
      <div 
        className="h-full bg-gradient-to-r from-ark-blue to-ark-green transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
