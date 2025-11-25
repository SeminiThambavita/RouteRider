import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../styles/ThemeContext';

const RegisterScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.textDark]}>Create Account</Text>
      <Text style={[styles.subtitle, theme === 'dark' && styles.textDark]}>
        Registration screen - To be implemented
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  textDark: {
    color: '#fff',
  },
});

export default RegisterScreen;