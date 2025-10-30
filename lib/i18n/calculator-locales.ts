export type Language = 'en' | 'de' | 'ur' | 'zh' | 'hi' | 'es' | 'ar';

export const languages = {
  en: {
    title: 'Calculator',
    description: 'Perform calculations in multiple languages.',
    cardTitle: 'Standard Calculator',
    cardDescription: 'A simple tool for your calculations.',
    language: 'Language',
    clear: 'C',
  },
  de: {
    title: 'Rechner',
    description: 'Führen Sie Berechnungen in mehreren Sprachen durch.',
    cardTitle: 'Standardrechner',
    cardDescription: 'Ein einfaches Werkzeug für Ihre Berechnungen.',
    language: 'Sprache',
    clear: 'C',
  },
  ur: {
    title: 'کیلکولیٹر',
    description: 'متعدد زبانوں میں حساب کتاب کریں۔',
    cardTitle: 'معیاری کیلکولیٹر',
    cardDescription: 'آپ کے حساب کتاب کے لیے ایک سادہ ٹول۔',
    language: 'زبان',
    clear: 'C',
  },
  zh: {
    title: '计算器',
    description: '用多种语言进行计算。',
    cardTitle: '标准计算器',
    cardDescription: '一个简单的计算工具。',
    language: '语言',
    clear: 'C',
  },
  hi: {
    title: 'कैलकुलेटर',
    description: 'कई भाषाओं में गणना करें।',
    cardTitle: 'मानक कैलकुलेटर',
    cardDescription: 'आपकी गणना के लिए एक सरल उपकरण।',
    language: 'भाषा',
    clear: 'C',
  },
  es: {
    title: 'Calculadora',
    description: 'Realiza cálculos en varios idiomas.',
    cardTitle: 'Calculadora Estándar',
    cardDescription: 'Una herramienta sencilla para tus cálculos.',
    language: 'Idioma',
    clear: 'C',
  },
  ar: {
    title: 'آلة حاسبة',
    description: 'قم بإجراء العمليات الحسابية بلغات متعددة.',
    cardTitle: 'آلة حاسبة قياسية',
    cardDescription: 'أداة بسيطة لحساباتك.',
    language: 'لغة',
    clear: 'C',
  },
};

export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'German (Deutsch)' },
  { value: 'ur', label: 'Urdu (اردو)' },
  { value: 'zh', label: 'Mandarin (中文)' },
  { value: 'hi', label: 'Hindi (हिन्दी)' },
  { value: 'es', label: 'Spanish (Español)' },
  { value: 'ar', label: 'Arabic (العربية)' },
];
