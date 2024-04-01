import { useState } from 'react';
import { FlatList } from 'react-native';

import { CategoryContainer, Icon } from './styles';

import { Category } from '../../types/Category';
import { Text } from '../Text';

interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;

    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(category) => category.id}
      contentContainerStyle={{ paddingRight: 24 }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category.id;

        return (
          <CategoryContainer onPress={() => handleSelectCategory(category.id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.emoji}</Text>
            </Icon>

            <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </CategoryContainer>
        );
      }}
    />
  );
}
