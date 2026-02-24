import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1c5eed',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Pantalla principal del Chat */}
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Asistente Virtual',
        }} 
      />
      {/* Configuración del Modal */}
      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: 'modal', 
          title: 'Información' 
        }} 
      />
    </Stack>
  );
}