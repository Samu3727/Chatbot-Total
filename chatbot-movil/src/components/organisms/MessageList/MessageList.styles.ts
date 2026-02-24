import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    // Esto asegura que el contenido empiece desde abajo 
    // si usas la propiedad 'inverted'
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
    color: '#999',
  }
});