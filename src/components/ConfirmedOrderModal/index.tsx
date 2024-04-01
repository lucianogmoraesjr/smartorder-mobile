import { Modal } from 'react-native';

import { Container, OkButton } from './styles';

import { Text } from '../Text';
import { CheckCircle } from '../Icons/CheckCircle';

interface ConfirmedOrderModal {
  visible: boolean;
  onOk: () => void;
}

export function ConfirmedOrderModal({ visible, onOk }: ConfirmedOrderModal) {
  return (
    <Modal visible={visible} animationType="fade">
      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>

        <OkButton onPress={onOk}>
          <Text color="#d73035" weight="600">
            OK
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
