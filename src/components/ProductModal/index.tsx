import { FlatList, Modal } from 'react-native';

import { Product } from '../../types/Product';

import {
  CloseButton,
  Cover,
  Footer,
  FooterContainer,
  Header,
  Ingredient,
  IngredientsContainer,
  ModalBody,
  PriceContainer,
} from './styles';

import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({
  visible,
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  if (!product) {
    return null;
  }

  function handleAddToCart() {
    if (!product) {
      return;
    }

    onAddToCart(product);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Cover
        source={{
          uri: product.imagePath,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Cover>

      <ModalBody>
        <Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text color="#666" style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight="600" color="#666">
              Ingredientes
            </Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={(ingredients) => ingredients.ingredient.id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item }) => (
                <Ingredient>
                  <Text>{item.ingredient.emoji}</Text>
                  <Text size={14} color="#666">
                    {item.ingredient.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text>Preço</Text>
            <Text size={20} weight="600">
              {formatCurrency(product.priceInCents / 100)}
            </Text>
          </PriceContainer>

          <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
