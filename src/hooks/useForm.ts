import { useState, useCallback, type FormEvent } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

interface ValidationSchema {
  [key: string]: ValidationRule | undefined;
}

interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T;
  validationSchema?: ValidationSchema;
  onSubmit: (values: T) => void | Promise<void>;
}

interface FormErrors {
  [key: string]: string;
}

export function useForm<T extends Record<string, unknown>>(options: UseFormOptions<T>) {
  const { initialValues, validationSchema = {}, onSubmit } = options;
  
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string, value: unknown): string => {
    const rules = validationSchema[name];
    if (!rules) return '';

    // Required check
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return rules.message || 'Este campo es requerido';
    }

    const stringValue = String(value);

    // Min length check
    if (rules.minLength && stringValue.length < rules.minLength) {
      return `Mínimo ${rules.minLength} caracteres`;
    }

    // Max length check
    if (rules.maxLength && stringValue.length > rules.maxLength) {
      return `Máximo ${rules.maxLength} caracteres`;
    }

    // Pattern check
    if (rules.pattern && !rules.pattern.test(stringValue)) {
      return rules.message || 'Formato inválido';
    }

    return '';
  }, [validationSchema]);

  const validateAll = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validationSchema, values, validateField]);

  const handleChange = useCallback((name: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name as string]) {
      const error = validateField(name as string, value);
      setErrors((prev) => ({ ...prev, [name as string]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name as string]: true }));
    const error = validateField(name as string, values[name]);
    setErrors((prev) => ({ ...prev, [name as string]: error }));
  }, [values, validateField]);

  const handleSubmit = useCallback(async (e?: FormEvent) => {
    if (e) e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [initialValues, validateAll, onSubmit, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback((name: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setValues,
  };
}

// Helper for email validation
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper for phone validation (Latin America)
export const phoneRegex = /^\+?[\d\s-()]{8,}$/;
