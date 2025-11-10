# Dohrnii UI

React Native UI kütüphanesi.

## Kurulum

GitHub üzerinden:
`npm i git+https://github.com/kullaniciadi/dohrnii.git#v0.1.0`

## Kullanım

```jsx
import React from 'react';
import { ThemeProvider, Button, CreateTheme } from 'dohrnii';

const userTheme = CreateTheme({
  themeColors: {
    brand: '#4F46E5',
    success: '#10B981'
  },
  colors: {
    // component bazlı overrides
    tabs: {
      outline: { indicatorColor: 'brand.5' }
    }
  }
});

export default function App() {
  return (
    <ThemeProvider mode="light" theme={userTheme}>
      <Button variant="solid" color="brand">Merhaba</Button>
    </ThemeProvider>
  );
}
```

## Geliştirme

- `npm run build` → `src/` içeriğini `lib/` dizinine transpile eder.
- Yerel örnek için root’taki `App.jsx` ve `index.js` kullanılır (publish edilmez).

## Lisans

MIT
