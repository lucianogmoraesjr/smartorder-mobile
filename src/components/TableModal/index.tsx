import { useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';

import { Form, ModalBody, Header, Overlay, Input } from './styles';

import { Text } from '../Text';
import { Close } from '../Icons/Close';
import { Button } from '../Button';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave(table: string) {
    setTable('');
    onSave(table);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
            />

            <Button onPress={() => handleSave(table)} disabled={!table}>
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
