import axios from "axios";
import { User } from "../../types";

const API_URL = "https://dummyjson.com";

// Mock user data for development
const mockUser: User = {
  id: 1,
  username: "demo_user",
  email: "demo@routelider.com",
  firstName: "Demo",
  lastName: "User",
};

export const authService = {
  login: async (username: string, password: string) => {
    try {
      // Try real API first
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      // Fallback to mock authentication for development
      console.log("Using mock authentication for development");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      return {
        id: mockUser.id,
        username: username,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        token: "mock_jwt_token_" + Date.now(),
      };
    }
  },

  register: async (userData: any) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  getUser: async (id: number): Promise<User> => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  }
};
