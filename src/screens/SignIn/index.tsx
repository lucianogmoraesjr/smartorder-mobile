import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { useAuth } from '../../hooks/useAuth';
import {
  Container,
  Footer,
  Input,
  InputGroup,
  Logo,
  MainContent,
  SignInForm,
} from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn({ email, password });
    } catch {
      Alert.alert('E-mail ou senha inválidos');
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Container>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        >
          <MainContent>
            <Logo>
              <Text size={14} opacity={0.9}>
                Bem vindo(a) ao
              </Text>
              <Text size={24} weight="700">
                SMART
                <Text size={24}>ORDER</Text>
              </Text>
            </Logo>

            <SignInForm>
              <InputGroup>
                <Text size={14}>E-mail</Text>
                <Input
                  placeholder="Seu e-mail de acesso"
                  value={email}
                  onChangeText={setEmail}
                  inputMode="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </InputGroup>

              <InputGroup>
                <Text size={14}>Senha</Text>
                <Input
                  placeholder="Informe sua senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </InputGroup>
            </SignInForm>
          </MainContent>
        </KeyboardAvoidingView>

        <Footer>
          <Button onPress={handleSignIn}>Fazer Login</Button>
        </Footer>
      </Container>
    </ScrollView>
  );
}
