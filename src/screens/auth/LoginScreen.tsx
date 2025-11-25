import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../styles/ThemeContext";
import { loginSuccess } from "../../store/slices/authSlice";
import { authService } from "../../services/auth/authService";

// Validation schema with Yup
const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
});

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (values: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await authService.login(values.username, values.password);
      
      const user = {
        id: response.id,
        username: response.username,
        email: response.email || `${response.username}@example.com`,
        firstName: response.firstName || "Demo",
        lastName: response.lastName || "User",
      };

      dispatch(loginSuccess({ user, token: response.token }));
      
      // Navigate to Main app after successful login
      navigation.navigate("Main" as never);
      
    } catch (error) {
      Alert.alert("Login Failed", "Please try with any username and password (min 3 chars)");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, theme === "dark" && styles.containerDark]}>
      <Text style={[styles.title, theme === "dark" && styles.textDark]}>RouteRider</Text>
      <Text style={[styles.subtitle, theme === "dark" && styles.textDark]}>Sign in to your account</Text>

      <Formik
        initialValues={{ username: "demo", password: "demo123" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              style={[styles.input, theme === "dark" && styles.inputDark]}
              placeholder="Username"
              placeholderTextColor={theme === "dark" ? "#888" : "#999"}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              autoCapitalize="none"
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={[styles.input, theme === "dark" && styles.inputDark]}
              placeholder="Password"
              placeholderTextColor={theme === "dark" ? "#888" : "#999"}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
              onPress={() => handleSubmit()}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <Text style={[styles.demoText, theme === "dark" && styles.textDark]}>
              Use any username/password (min 3 characters)
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },
  textDark: {
    color: "#fff",
  },
  form: {
    width: "100%",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputDark: {
    backgroundColor: "#333",
    borderColor: "#555",
    color: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  demoText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    color: "#666",
  },
});

export default LoginScreen;
