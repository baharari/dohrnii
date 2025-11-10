import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { lightTheme, darkTheme } from '../constants/themes';
import { updateThemeForStyles } from '../theme/extendedStyleSheet';
import { View } from 'react-native';

// Tema bağlamı oluştur
const ThemeContext = createContext({
  theme: lightTheme,
  setTheme: () => {},
  toggleTheme: () => {},
});

/**
 * Tema sağlayıcısı bileşeni
 */
export const ThemeProvider = ({ children, mode = 'light', theme: userTheme = null, initialTheme = lightTheme }) => {
  const [currentMode, setCurrentMode] = useState(mode);

  // Başlangıç teması: kullanıcı geçerli mode için tema sağladıysa onu kullan, yoksa defaults
  const [theme, setThemeState] = useState(() => {
    if (userTheme && (userTheme[currentMode] || (userTheme.light && userTheme.dark))) {
      return userTheme[currentMode] || (currentMode === 'dark' ? userTheme.dark : userTheme.light);
    }
    return currentMode === 'dark' ? darkTheme : initialTheme;
  });

  // Tema değiştiğinde extendedStyleSheet'i güncelle
  useEffect(() => {
    updateThemeForStyles(theme);
  }, [theme]);

  // Dışarıdan mode veya userTheme değişirse seçili temayı güncelle
  useEffect(() => {
    setCurrentMode(mode);
    if (userTheme && (userTheme[mode] || (userTheme.light && userTheme.dark))) {
      setThemeState(userTheme[mode] || (mode === 'dark' ? userTheme.dark : userTheme.light));
    } else {
      setThemeState(mode === 'dark' ? darkTheme : lightTheme);
    }
  }, [mode, userTheme]);

  // Tema değiştirme fonksiyonu (modlar arasında geçiş)
  const toggleTheme = useCallback(() => {
    setCurrentMode((prevMode) => {
      const next = prevMode === 'light' ? 'dark' : 'light';
      if (userTheme && (userTheme[next] || (userTheme.light && userTheme.dark))) {
        setThemeState(userTheme[next] || (next === 'dark' ? userTheme.dark : userTheme.light));
      } else {
        setThemeState(next === 'dark' ? darkTheme : lightTheme);
      }
      return next;
    });
  }, [userTheme]);

  // Manuel olarak tüm tema objesini set etmek isteyenler için
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <View style={{flex: 1, backgroundColor: theme.colors.background.primary}}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

/**
 * Tema hook'u
 */
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;