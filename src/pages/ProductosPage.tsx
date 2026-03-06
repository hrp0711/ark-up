import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Star, 
  Check, 
  ArrowRight, 
  Package, 
  BookOpen, 
  Gamepad2, 
  Gift,
  ShoppingCart,
  Heart,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data';
import { useScrollAnimation } from '@/hooks';
import { SEOHead, createProductSchema, organizationSchema } from '@/components/SEOHead';

const categoryIcons: Record<string, React.ElementType> = {
  kit: Package,
  book: BookOpen,
  game: Gamepad2,
  bundle: Gift,
};

const categoryLabels: Record<string, string> = {
  kit: 'Kits Educativos',
  book: 'Libros',
  game: 'Juegos',
  bundle: 'Bundles',
};

const benefits = [
  { icon: Truck, title: 'Envío gratis', description: 'En compras mayores a $999' },
  { icon: ShieldCheck, title: 'Garantía', description: '30 días de devolución' },
  { icon: RotateCcw, title: 'Soporte', description: 'Atención al cliente 24/7' },
];

export function ProductosPage() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  // Generate product schemas
  const productSchemas = products.map(product => createProductSchema({
    name: product.name,
    description: product.description,
    price: product.price,
    rating: product.rating,
    reviews: product.reviews,
  }));

  return (
    <>
      <SEOHead
        title="Tienda Ark-Up - Productos Educativos de Finanzas"
        description="Compra kits educativos, libros y juegos para enseñar finanzas a tus hijos. Envío gratis en compras mayores a $999. Garantía de 30 días."
        canonical="/productos"
        ogType="website"
        schema={[organizationSchema, ...productSchemas]}
      />
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-ark-green-50 via-white to-ark-blue-50">
          <div className="ark-container">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-green/10 text-ark-green text-sm font-medium mb-6">
                <ShoppingBag className="w-4 h-4" />
                <span>Tienda Ark-Up</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ark-navy mb-6">
                Productos Educativos
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Lleva el aprendizaje financiero a casa con nuestros productos físicos 
                diseñados para hacer del ahorro una experiencia tangible y divertida.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="ark-container">
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ark-green/10 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-ark-green" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-ark-navy">{benefit.title}</h3>
                    <p className="text-sm text-gray-500">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section ref={ref} className="py-20 bg-gray-50">
          <div className="ark-container">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === null
                    ? 'bg-ark-blue text-white'
                    : 'bg-white text-gray-600 hover:bg-ark-blue/10'
                }`}
              >
                Todos
              </button>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === key
                      ? 'bg-ark-blue text-white'
                      : 'bg-white text-gray-600 hover:bg-ark-blue/10'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => {
                const Icon = categoryIcons[product.category];
                const isInCart = cart.includes(product.id);

                return (
                  <article
                    key={product.id}
                    className={`group bg-white rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-ark-xl transition-all duration-300 overflow-hidden ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    itemScope
                    itemType="https://schema.org/Product"
                  >
                    <meta itemProp="name" content={product.name} />
                    <meta itemProp="description" content={product.description} />
                    
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-ark-yellow to-ark-orange text-white text-xs font-semibold">
                          <Sparkles className="w-3 h-3" />
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Wishlist */}
                    <button 
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 transition-colors"
                      aria-label={`Agregar ${product.name} a favoritos`}
                    >
                      <Heart className="w-5 h-5" />
                    </button>

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
                      <h3 className="font-heading text-lg font-bold text-ark-navy mb-2 group-hover:text-ark-blue transition-colors" itemProp="name">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4" itemProp="description">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                        <meta itemProp="ratingValue" content={product.rating.toString()} />
                        <meta itemProp="reviewCount" content={product.reviews.toString()} />
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
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <meta itemProp="priceCurrency" content="MXN" />
                        <meta itemProp="availability" content="https://schema.org/InStock" />
                        <div>
                          <span className="text-2xl font-bold text-ark-navy" itemProp="price">
                            ${product.price}
                          </span>
                          <span className="text-gray-500 text-sm"> {product.currency}</span>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => addToCart(product.id)}
                          className={isInCart ? 'bg-ark-green' : 'bg-ark-blue'}
                          aria-label={isInCart ? 'Producto en carrito' : `Agregar ${product.name} al carrito`}
                        >
                          {isInCart ? (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Agregado
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              Agregar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </article>
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
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Kit de inicio', 'Juego La Moneda Mágica', 'Libro', '3 meses premium'].map((item, idx) => (
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
                  <Button className="bg-white text-ark-blue hover:bg-gray-100">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Comprar Bundle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-ark-navy">
          <div className="ark-container">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                ¿Tienes dudas sobre nuestros productos?
              </h2>
              <p className="text-white/70 mb-8">
                Nuestro equipo está listo para ayudarte a elegir los productos perfectos para tu familia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contacto">
                  <Button size="lg" className="bg-white text-ark-navy hover:bg-gray-100">
                    Contactar Ventas
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/faq">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10">
                    Ver Preguntas Frecuentes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
