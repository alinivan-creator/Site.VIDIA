# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Formular de contact (Web3Forms)

Formularul din `#contact` trimite lead-urile la `contact@getvidia.ro` prin [Web3Forms](https://web3forms.com) (gratuit, potrivit pentru site static Vite). Dacă lipsește cheia, butonul principal deschide **mailto** cu telefon, e-mail, tip afacere și plan precompletate — poți testa imediat, fără signup.

### Pași (o dată)

1. Intră pe [web3forms.com](https://web3forms.com), creează un Access Key gratuit cu adresa **contact@getvidia.ro** (confirmă e-mailul dacă ți se cere).
2. Copiază `.env.example` → `.env` și setează `VITE_WEB3FORMS_ACCESS_KEY=cheia_ta` (local). Pe **Vercel / Netlify** adaugă aceeași variabilă în Environment Variables din dashboard.
3. Rebuild + redeploy (`npm run build` / push pe host). Fără rebuild, Vite nu include cheia în bundle.

**Important:** nu commit-ui fișierul `.env` (e deja în `.gitignore`). Doar `.env.example` rămâne în repo, fără secret.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
