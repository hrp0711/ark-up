import { ShoppingBag, Star, Check, ArrowRight, Package, BookOpen, Gamepad2, Gift } from 'lucide-react';
import { useScrollAnimation } from '@/hooks';
import { Button } from '@/components/ui/button';
import { products } from '@/data';

const categoryIcons: Record<string, React.ElementType> = {
  kit: Package,
  book: BookOpen,
  game: Gamepad2,
  bundle: Gift,
};

const categoryLabels: Record<string, string> = {
  kit: 'Kit Educativo',
  book: 'Libro',
  game: 'Juego',
  bundle: 'Bundle',
};

export function ProductsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} id="productos" className="ark-section bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-ark-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ark-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="ark-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-green/10 text-ark-green text-sm font-medium mb-4">
            <ShoppingBag className="w-4 h-4" />
            Productos Educativos
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ark-navy mb-4">
            Lleva el aprendizaje a casa
          </h2>
          <p className="text-lg text-gray-600">
            Complementa los cursos con nuestros productos físicos diseñados para hacer 
            del aprendizaje financiero una experiencia tangible y divertida.
          </p>
        </div>

        {/* Featured Image */}
        <div className={`mb-16 rounded-3xl overflow-hidden shadow-ark-xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <img 
            src="/images/products.jpg" 
            alt="Productos educativos Ark-Up"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const Icon = categoryIcons[product.category];
            
            return (
              <div
                key={product.id}
                className={`group bg-white rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-ark-xl transition-all duration-300 overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-ark-yellow to-ark-orange text-white text-xs font-semibold">
                      <Star className="w-3 h-3 fill-white" />
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:from-ark-blue/5 group-hover:to-ark-green/5 transition-colors">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium mb-2">
                    {categoryLabels[product.category]}
                  </span>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-bold text-ark-navy mb-2 group-hover:text-ark-blue transition-colors">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-ark-yellow text-ark-yellow' : 'text-gray-200'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  {/* Features */}
                  {product.features && (
                    <div className="space-y-1 mb-4">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Check className="w-3 h-3 text-ark-green" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-ark-navy">
                        ${product.price}
                      </span>
                      <span className="text-gray-500 text-sm"> {product.currency}</span>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-ark-blue hover:bg-ark-blue-700 text-white"
                    >
                      Ver
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bundle CTA */}
        <div className={`mt-16 p-8 lg:p-12 rounded-3xl bg-gradient-to-r from-ark-blue to-ark-purple text-white transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 mb-4">
                <Gift className="w-4 h-4" />
                <span className="text-sm font-medium">Mejor valor</span>
              </div>
              <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-3">
                Bundle Familia Completa
              </h3>
              <p className="text-white/80 mb-4">
                Obtén todos nuestros productos educativos más 3 meses de acceso premium a la plataforma. 
                La experiencia completa de Ark-Up para tu familia.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Kit de inicio', 'Juego La Moneda Mágica', 'Libro El Pequeño Emprendedor', '3 meses premium'].map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-sm">
                    <Check className="w-3 h-3" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-4xl lg:text-5xl font-bold mb-2">$1,299</div>
              <div className="text-white/60 line-through mb-4">$1,899</div>
              <Button 
                size="lg" 
                className="bg-white text-ark-blue hover:bg-gray-100"
              >
                Comprar Bundle
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
