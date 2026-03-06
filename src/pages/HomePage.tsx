import { useEffect, useState } from 'react';
import { 
  HeroSection,
  ProblemSolutionSection,
  HowItWorksSection,
  CoursesSection,
  SavingsSimulatorSection,
  QuizSection,
  TestimonialsSection,
  ProductsSection,
  SchoolsSection,
  FreeResourceSection,
  FAQSection,
  FinalCTASection,
} from '@/sections';
import { SEOHead, organizationSchema, websiteSchema } from '@/components/SEOHead';

export function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEOHead
        title="Ark-Up - Educación Financiera para Niños y Jóvenes"
        description="Cursos divertidos y prácticos de educación financiera para niños y jóvenes de 6 a 17 años. Preparando a la nueva generación para un futuro financiero brillante en Latinoamérica."
        canonical="/"
        ogType="website"
        schema={[organizationSchema, websiteSchema]}
      />
      <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* 1. Hero Section */}
        <HeroSection />
        
        {/* 2. Problem/Solution Section */}
        <ProblemSolutionSection />
        
        {/* 3. How It Works Section */}
        <HowItWorksSection />
        
        {/* 4. Courses by Age Section */}
        <CoursesSection />
        
        {/* 5. Savings Simulator Preview */}
        <SavingsSimulatorSection />
        
        {/* 6. Quiz Section */}
        <QuizSection />
        
        {/* 7. Testimonials Section */}
        <TestimonialsSection />
        
        {/* 8. Products Section */}
        <ProductsSection />
        
        {/* 9. Schools Section */}
        <SchoolsSection />
        
        {/* 10. Free Resource Section */}
        <FreeResourceSection />
        
        {/* 11. FAQ Section */}
        <FAQSection />
        
        {/* 12. Final CTA Section */}
        <FinalCTASection />
      </div>
    </>
  );
}
