// Export all language components and utilities
export { default as LanguageFlag } from './LanguageFlag';
export { default as LanguageOption } from './LanguageOption';
export { 
  default as languagesRegistry,
  availableLanguages,
  allLanguages,
  getLanguageByCode,
  getAvailableLanguages,
  getAllLanguages,
  isLanguageAvailable,
  getDefaultLanguage,
  validateLanguageCode
} from './LanguageRegistry';

// Re-export for easier imports
export * from './LanguageRegistry';
