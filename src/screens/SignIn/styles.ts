import { Platform, StatusBar } from 'react-native';
import { styled } from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  flex: 1;
`;

export const MainContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 118px;
  padding: 0 24px;
`;

export const Logo = styled.View`
  align-items: center;
`;

export const SignInForm = styled.View`
  width: 320px;
  gap: 24px;
`;

export const InputGroup = styled.View`
  gap: 8px;
`;

export const Input = styled.TextInput`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
`;

export const Footer = styled.View`
  padding: 16px 24px;
`;
