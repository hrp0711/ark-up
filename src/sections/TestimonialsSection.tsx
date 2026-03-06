import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/data';

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={ref} className="ark-section bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ark-yellow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-ark-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="ark-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-yellow/20 text-ark-yellow-700 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Testimonios
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ark-navy mb-4">
            Lo que dicen las familias
          </h2>
          <p className="text-lg text-gray-600">
            Miles de padres han visto el cambio en sus hijos. Estas son algunas de sus historias.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative bg-white rounded-3xl shadow-ark-xl p-8 lg:p-12">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-2xl bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="pt-4">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${i < activeTestimonial.rating ? 'fill-ark-yellow text-ark-yellow' : 'text-gray-200'}`} 
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                "{activeTestimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center text-white text-xl font-bold">
                    {activeTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-heading text-lg font-bold text-ark-navy">
                      {activeTestimonial.name}
                    </div>
                    <div className="text-gray-500">{activeTestimonial.role}</div>
                    <div className="text-sm text-gray-400">{activeTestimonial.location}</div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="rounded-full border-gray-200 hover:border-ark-blue hover:text-ark-blue"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="rounded-full border-gray-200 hover:border-ark-blue hover:text-ark-blue"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex 
                      ? 'w-8 bg-ark-blue' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`p-6 rounded-2xl bg-white hover:shadow-ark transition-all cursor-pointer ${
                activeIndex === index ? 'ring-2 ring-ark-blue' : ''
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-ark-yellow text-ark-yellow" />
                ))}
              </div>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ark-blue to-ark-purple flex items-center justify-center text-white text-sm font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-ark-navy text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { value: '4.9/5', label: 'Calificación promedio' },
            { value: '2,500+', label: 'Opiniones verificadas' },
            { value: '96%', label: 'Recomendarían Ark-Up' },
            { value: '85%', label: 'Ven mejoras en 3 meses' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-white">
              <div className="font-heading text-2xl font-bold text-ark-navy mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
