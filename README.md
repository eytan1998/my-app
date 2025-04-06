# 🌟 Welcome to My-App

`my-app` is a feature-rich, multi-platform application designed to provide a seamless user experience. It integrates advanced calendar functionalities, location-based services, and user authentication, all wrapped in a clean and intuitive interface.

---

## 📖 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [Configuration](#configuration)
- [File Structure](#file-structure)
- [Learn More](#learn-more)
- [Contributing](#contributing)

---

## 🚀 Features

- **Dynamic Calendar**: View Jewish and Gregorian dates with support for holidays, Parasha, and Omer counting.
- **User Authentication**: Secure login, signup, and password reset using Firebase.
- **Location Services**: Manage and select locations with geocoding support.
- **Multi-Language Support**: Switch between English and Hebrew with RTL support.
- **Customizable Themes**: Light and dark themes for a personalized experience.

---

## 🛠️ Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/my-app.git
   cd my-app
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Start the app**  
   ```bash
   npx expo start
   ```

4. **Run on your device**  
   - Use the QR code to open the app in Expo Go.
   - Or run it on an emulator using:
     ```bash
     npx expo start --android
     npx expo start --ios
     ```

---

## 🌟 Development

### File Structure
The project is organized into two main directories: `app` and `assets`. Here's a breakdown of their contents and relationships:

#### **`/app`**
This directory contains the core application logic, including screens, hooks, utilities, and navigation.

- **`/screens`**:  
  Contains all the UI screens for the app, organized into subdirectories based on functionality (e.g., `Auth`, `CalanderScreen`, `LocationScreen`). Each screen represents a specific feature or page in the app.

- **`/hooks`**:  
  Contains custom React hooks for managing global state and context. Examples include:
  - `AuthContext.tsx`: Manages user authentication state.
  - `LanguageContext.tsx`: Handles language settings and translations.
  - `LocationContext.tsx`: Manages location-related data and coordinates.
  - `CalendarSettings.tsx`: Stores calendar preferences like type and visibility of specific features.
  - `ThemeContext.tsx`: Manages light and dark themes.

- **`/navigations`**:  
  Contains navigation logic for the app.
  - `AppNavigator.tsx`: Defines the stack navigation for authentication and the main app.
  - `DrawerLayout.tsx`: Implements the drawer navigation for accessing different screens.

- **`/utils`**:  
  Contains utility functions and services. Examples:
  - `DateUtils.tsx`: Provides date-related utilities, including Jewish calendar calculations.
  - `StorageService.ts`: Handles persistent storage using `AsyncStorage`.

- **`_layout.tsx`**:  
  The root layout file that wraps the app with all necessary providers (e.g., `AuthProvider`, `LanguageProvider`).

#### **`/assets`**
This directory contains static resources and shared configurations.

- **`/Models`**:  
  Contains TypeScript models and enums for structured data. Examples:
  - `UserData.ts`: Defines the structure of user-related data.
  - `Prisha.ts`: Enum for different types of `Prisha` (Jewish calendar events).
  - `Events.ts`: Enum and metadata for calendar events.

- **`/translations.ts`**:  
  Contains translations for different languages (e.g., English, Hebrew). Used by `LanguageContext` to provide localized strings.

- **`/LanguageConfig.ts`**:  
  Defines supported languages and their layout directions (LTR or RTL).

- **`/firebase`**:  
  Contains Firebase configuration and services. Examples:
  - `firebaseConfig.ts`: Initializes Firebase with project credentials.
  - `firebaseService.ts`: Provides functions for interacting with Firestore (e.g., saving and retrieving user data).

- **`/colors.ts`**:  
  Defines color themes for light and dark modes.

- **`/images`**:  
  Stores static image assets (e.g., icons, splash screens).

#### **Relationships Between Files**
1. **Context Providers (`/hooks`)**:  
   Provide global state and functionality to the app.  
   Example: `AuthContext` manages user authentication and is used in screens like `LoginScreen` and `SignupScreen`.

2. **Screens (`/screens`)**:  
   Consume context and utilities to render UI and handle user interactions.  
   Example: `CalendarScreen` uses `DateUtils` for date calculations and `CalendarSettingsContext` for user preferences.

3. **Utilities (`/utils`)**:  
   Provide reusable logic and helper functions.  
   Example: `StorageService` is used by `LocationContext` and `CalendarSettingsContext` to persist data.

4. **Assets (`/assets`)**:  
   Serve as a centralized location for static resources and shared configurations.  
   Example: `translations.ts` is used by `LanguageContext` to provide localized strings.

This structure ensures modularity, reusability, and maintainability, making it easier to scale and manage the app.

---

## ⚙️ Configuration

### Firebase
Ensure you have a valid Firebase configuration in `assets/firebase/firebaseConfig.ts`. Replace the placeholder values with your Firebase project credentials.

### Environment Variables
Create a `.env` file for sensitive configurations (e.g., API keys). Ensure `.env` is added to `.gitignore`.

---

## 📚 Learn More

Explore these resources to learn more about the technologies used in this project:

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)

---

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

🎉 **Thank you for using My-App!** Build something amazing!
