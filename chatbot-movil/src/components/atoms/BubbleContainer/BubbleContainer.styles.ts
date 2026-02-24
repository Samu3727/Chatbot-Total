import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  user: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  bot: {
    backgroundColor: '#E9ECEF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
});