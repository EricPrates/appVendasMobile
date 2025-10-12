## Purpose

Quick, actionable instructions for AI coding agents working on this Expo React Native project. Focus on the specific structure, patterns, run/debug commands and a few examples to make edits predictable and safe.

## Big picture

- This is an Expo React Native app (see `package.json`). App entry is `App.js` which wires an Auth context and a native-stack NavigationContainer.
- UI is implemented with functional components + hooks and `react-native-paper` for key controls.
- State is local + light context: `src/components/Provider.jsx` (AuthProvider) is the only global provider. There is no Redux or remote backend wired in—controllers under `src/components/controller/` are mostly placeholders.
- Layout wrapper `src/view/ViewBase.jsx` provides common header (`Cabecalho`) and bottom bar (`BarraBaixa`). Most screens use `ViewBase` and accept `tabAtiva` prop.

## Key files and what to inspect first

- `App.js` — navigation routes and startup flow (Splash → Login → Home). Add new screens here.
- `src/components/Provider.jsx` — auth context (fake hard-coded users). Use `useAuth()` to access login/signOut.
- `src/view/ViewBase.jsx` — base layout wrapper used by most screens.
- `src/components/CompCard.jsx` — example card component showing image usage and styling conventions. It composes `Card.Cover` and constructs a picsum URL from the `source` prop.
- `src/view/*.jsx` — app screens. Follow existing screen signatures: export default function X({ navigation }) { ... }
- `model/` — data model classes (Usuario, Produto, Carrinho) used by controllers or future API layers.

## How to run and debug (concrete commands)

- Install deps: `npm install`
- Start Expo dev server: `npm start` (runs `expo start` from `package.json`).
- Quick device runs:
  - Android emulator / device: `npm run android` (alias for `expo start --android`)
  - iOS simulator: `npm run ios` (alias for `expo start --ios`) — macOS only.
  - Web: `npm run web`
  - If device/connection problems, use tunnel: `npm run tunel`
- Debugging: use Expo DevTools (opened by `expo start`), console.log, and React Native Debugger. On Windows prefer Android device/emulator.

## Project conventions & examples

- Screens: place new screens in `src/view`. Minimal screen uses `ViewBase`:

- Navigation: add the screen to `App.js`'s Stack.Navigator (screen names are used elsewhere, keep them stable). Example navigation calls used in code: `navigation.navigate('DetalhesProduto')` and `navigation.replace('Home')`.
- Auth: `useAuth()` returns `{ logado, nome, login, signOut }`. Login screen calls `login(usuario, senha)` and then `navigation.replace('Home')` on success.
- Components: UI components use `react-native-paper` patterns (Card, TextInput, Button). Look at `CompCard.jsx` for an example of image `source` generation: `source={{ uri: `https://picsum.photos/200/300?random=${source}` }}`.

## Data flow & integration points

- There is no remote API currently. Business logic hints are in `src/components/controller/*.controller.js` but they are inconsistent (see gotchas). Models under `model/` exist to hold domain objects.
- If you add a backend call, put fetch logic inside a controller module and have screens import the controller; keep UI code focused on rendering and navigation.

## Gotchas and non-obvious rules discovered in code

- Controller files (`components/controller/*.js`) sometimes use browser-style events (e.g. `e.target`) which don't exist in RN TextInput `onChangeText`. Prefer hook state + `onChangeText` when modifying screen code.
- The app uses absolute-like imports from `src/...` in many files; when moving files, update imports accordingly.
- Some screens expect string route names exactly as declared in `App.js`. Do not rename route keys without updating all callers.
- Images: there are local images under `src/view/img` and a mix of remote placeholder images used by `CompCard`. Prefer local assets for production images.

## Quick checklist for common edits

- Add a new screen: create file in `src/view`, use `export default function MyScreen({ navigation })`, wrap in `ViewBase`, import in `App.js` and add `<Stack.Screen name="MyScreen" component={MyScreen} />`.
- Add a global action (auth-like): modify `src/components/Provider.jsx` and expose via `useAuth()`.
- Fix a form: use `useState` + `TextInput` `onChangeText` (do not rely on `e.target.value`).

## Files to search when doing changes

- App.js, src/components/Provider.jsx, src/view/ViewBase.jsx, src/components/CompCard.jsx, src/components/BarraBaixa.jsx, src/components/Cabecalho.jsx, src/components/controller/*, model/*

If anything here is unclear or you want more examples (e.g. canonical screen template, standard style tokens), tell me which section to expand and I'll iterate.
