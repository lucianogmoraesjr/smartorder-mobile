import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface SignInRequest {
  email: string;
  password: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (data: SignInRequest) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getStoredData() {
      const accessToken = await AsyncStorage.getItem('@smartorder:token');

      if (accessToken) {
        api.defaults.headers.authorization = `Bearer ${accessToken}`;

        setIsAuthenticated(true);
      }

      setIsLoading(false);
    }

    getStoredData();
  }, []);

  useLayoutEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const accessToken = await AsyncStorage.getItem('@smartorder:token');

        if (accessToken && error.response?.status === 401) {
          await AsyncStorage.clear();
          setIsAuthenticated(false);
        }

        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptorId);
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInRequest) => {
    const { data } = await api.post('authenticate', {
      email,
      password,
    });

    await AsyncStorage.setItem('@smartorder:token', data.accessToken);

    api.defaults.headers.authorization = `Bearer ${data.accessToken}`;

    setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
