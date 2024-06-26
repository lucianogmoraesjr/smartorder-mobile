import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from './styles';

import { api } from '../../services/api';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { ConfirmedOrderModal } from '../ConfirmedOrderModal';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  onAdd,
  onRemove,
  onConfirmOrder,
  selectedTable,
}: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((total, cartItem) => {
    return (total += (cartItem.product.priceInCents / 100) * cartItem.quantity);
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);

    const payload = {
      table: Number(selectedTable),
      products: cartItems.map((cartItem) => ({
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
      })),
    };

    console.log(payload);

    await api.post('orders', payload);

    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    setIsModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      <ConfirmedOrderModal visible={isModalVisible} onOk={handleOk} />

      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product.id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 140 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.1.125:3333/tmp/${cartItem.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.priceInCents / 100)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity onPress={() => onRemove(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
