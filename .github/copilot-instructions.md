# Copilot Instructions for cleaning-app

## Project Overview
- This is a React Native app using Expo (see `app.json` for config).
- The main app code is in the `app/` directory, using file-based routing (see Expo Router docs).
- Backend API integrations are in `backend/` (e.g., `apartmentAPI.js`, `authApi.js`).
- Shared components are in `components/`.
- Context and hooks for state management and data fetching are in `app/context/` and `hooks/`.
- Utility functions are in `utils/` and `lib/`.

## Key Patterns & Conventions
- **Routing:** Pages and nested routes are defined by file structure in `app/`. Use `[param]` for dynamic routes.
- **Context:** Use React Context for auth (`app/context/auth/`).
- **API Calls:** Use `backend/` modules for all network requests. Do not call APIs directly in components.
- **Push Notifications:** Managed via `utils/pushTokenManager.jsx` and `utils/registerForPushNotifications.js`.
- **Custom Hooks:** Data fetching and logic are abstracted into hooks in `hooks/` (e.g., `useFetchTasks.jsx`).
- **Assets:** Images and fonts are in `assets/`.

## Developer Workflows
- **Install dependencies:** `npm install`
- **Start app:** `npx expo start`
- **Reset project:** `npm run reset-project` (moves starter code to `app-example/` and creates a blank `app/`)
- **Android/iOS/Web:** Use Expo CLI options to run on device/emulator/simulator/web.

## Integration & External Dependencies
- Uses Expo plugins: `expo-router`, `expo-splash-screen`, `expo-camera`, `expo-font`, `expo-web-browser` (see `app.json`).
- Android/iOS permissions are set in `app.json`.
- Hermes JS engine enabled for performance.

## Examples
- To add a new screen: create a file in `app/` (e.g., `app/tasks/newTask.jsx`).
- To add a new API: add a module in `backend/` and use it via a custom hook.
- To add a new context: follow the pattern in `app/context/auth/`.

## References
- See `README.md` for getting started and links to Expo docs.
- See `app.json` for Expo and native config.
- See `backend/` for API integration patterns.

---
If you are unsure about a pattern or workflow, check the referenced files or ask for clarification.
