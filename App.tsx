import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "./src/styles/ThemeContext";
import ErrorBoundary from "./src/components/common/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
