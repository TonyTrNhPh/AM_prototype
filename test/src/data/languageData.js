import VN from 'country-flag-icons/react/3x2/VN';
import US from 'country-flag-icons/react/3x2/US';
import CN from 'country-flag-icons/react/3x2/CN';
import JP from 'country-flag-icons/react/3x2/JP';
import KR from 'country-flag-icons/react/3x2/KR';

// Language Registry
export const languageData = {
  VI: {
    code: 'VI',
    name: 'Tiếng Việt',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    flagComponent: VN,
    countryCode: 'VN',
    direction: 'ltr',
    locale: 'vi-VN'
  },
  EN: {
    code: 'EN',
    name: 'Tiếng Anh',
    nativeName: 'English',
    flag: '🇺🇸',
    flagComponent: US,
    countryCode: 'US',
    direction: 'ltr',
    locale: 'en-US'
  },
  ZH: {
    code: 'ZH',
    name: 'Tiếng Trung',
    nativeName: '中文',
    flag: '🇨🇳',
    flagComponent: CN,
    countryCode: 'CN',
    direction: 'ltr',
    locale: 'zh-CN'
  },
  JA: {
    code: 'JA',
    name: 'Tiếng Nhật',
    nativeName: '日本語',
    flag: '🇯🇵',
    flagComponent: JP,
    countryCode: 'JP',
    direction: 'ltr',
    locale: 'ja-JP'
  },
  KO: {
    code: 'KO',
    name: 'Tiếng Hàn',
    nativeName: '한국어',
    flag: '🇰🇷',
    flagComponent: KR,
    countryCode: 'KR',
    direction: 'ltr',
    locale: 'ko-KR'
  }
};

// Available languages for the application
export const availableLanguages = ['VI', 'EN', 'ZH', 'JA', 'KO'];

// Extended languages (all supported languages)
export const allLanguages = Object.keys(languageData);

// Helper functions
export const getLanguageByCode = (code) => {
  return languageData[code] || languageData.VI;
};

export const getAvailableLanguages = () => {
  return availableLanguages.map(code => languageData[code]);
};

export const getAllLanguages = () => {
  return allLanguages.map(code => languageData[code]);
};

export const isLanguageAvailable = (code) => {
  return availableLanguages.includes(code);
};

export const getDefaultLanguage = () => {
  return languageData.VI;
};

export const validateLanguageCode = (code) => {
  return Object.keys(languageData).includes(code);
};

export default languageData;
