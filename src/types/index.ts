// Ark-Up Type Definitions

// Navigation
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  ageRange: [number, number];
  ageLabel: string;
  duration: string;
  modules: number;
  price: number;
  currency: string;
  image?: string;
  features: string[];
  color: 'blue' | 'green' | 'yellow' | 'orange' | 'purple';
  popular?: boolean;
}

export interface CourseCategory {
  id: string;
  name: string;
  description: string;
  courses: Course[];
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: 'kit' | 'book' | 'game' | 'bundle';
  inStock: boolean;
  rating: number;
  reviews: number;
  features?: string[];
  badge?: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  content: string;
  rating: number;
  location: string;
  childrenAges: string;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Blog/Resource Types
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'ebook' | 'guide' | 'video' | 'tool' | 'article';
  thumbnail?: string;
  downloadUrl?: string;
  category: string;
  readTime?: string;
  publishedAt: string;
  featured?: boolean;
}

// Team Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  childAge?: string;
  interest: string;
}

// Lead Capture
export interface LeadData {
  email: string;
  name?: string;
  childAge?: string;
  source: string;
  interests: string[];
}

// Savings Simulator
export interface SavingsGoal {
  name: string;
  targetAmount: number;
  currentAmount: number;
  weeklyContribution: number;
  startDate: string;
  targetDate?: string;
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  ageGroup: '6-9' | '10-13' | '14-17';
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  recommendations: string[];
  suggestedCourses: string[];
}

// Chatbot Types
export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

// Stats Types
export interface PlatformStats {
  studentsCount: number;
  parentsCount: number;
  schoolsCount: number;
  coursesCount: number;
  satisfactionRate: number;
}

// Age Group
export type AgeGroup = '6-9' | '10-13' | '14-17';

// Pricing Plan
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  ctaText: string;
  color: 'blue' | 'green' | 'purple';
}

// School Partnership
export interface SchoolPartnership {
  id: string;
  schoolName: string;
  logo?: string;
  location: string;
  studentsEnrolled: number;
  testimonial?: string;
}

// Feature Highlight
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'orange' | 'purple';
}
