# Hamba — React Native (Expo)

Mobile version of the Qurbani Calculator, ported from the Next.js web app.

## Features

- Yes/No multiple Sams flow
- Contributor validation (1–7 single, sum 1–7 multiple)
- Meat, kolija, tel quantity input
- Sorkari (1/3) on meat, kolija, and tel
- English & Bengali (i18n)
- LinkedIn footer link

## Setup

```bash
cd mobile
npm install
npx expo start
```

Then press:
- `a` — Android emulator
- `i` — iOS simulator
- Scan QR — Expo Go on your phone

## Project structure

```
mobile/
├── App.tsx                 # Main app & step navigation
├── src/
│   ├── lib/calculate.ts    # Shared calculation logic
│   ├── i18n/               # EN + BN translations
│   ├── theme.ts            # Colors & spacing
│   └── components/         # Screens & UI
```

## Notes

- Uses **Expo SDK 52** — run `npx expo install` if you see version mismatches.
- Default Expo assets are used; replace `assets/icon.png` etc. for production.
- Calculation logic matches `../lib/calculate.ts` in the web app.
