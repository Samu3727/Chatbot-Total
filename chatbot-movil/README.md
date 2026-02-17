# 📱 Chatbot Móvil - React Native + Expo

Aplicación móvil multiplataforma del chatbot que se conecta al backend FastAPI con OpenRouter.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

   ```bash
   npm install
   ```

### 2. Configurar variables de entorno
Crea el archivo `.env` con la URL del backend según tu plataforma:

**Para dispositivos físicos Android/iOS (en la misma WiFi):**
```env
EXPO_PUBLIC_API_URL=http://10.189.249.192:8000
```

**Para emulador Android:**
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8000
```

**Para iOS Simulator:**
```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

### 3. Iniciar el servidor de desarrollo

   ```bash
   npx expo start --clear
   ```

**Nota:** Usa `--clear` siempre que cambies variables de entorno.

### 4. Abrir la app
- **📱 Dispositivo físico:** Escanea el QR con Expo Go
- **🤖 Emulador Android:** Presiona `a`
- **🍎 iOS Simulator:** Presiona `i`
- **🌐 Web:** Presiona `w`

---

## 🔧 Configuración de Red para Android

### Error: "Network Error" en dispositivo móvil

#### Solución 1: Para Emulador Android (Recomendada)
Usa `adb reverse` para redirigir el puerto:
```bash
# Ejecutar después de iniciar el emulador
.\setup-android-port.bat
```

#### Solución 2: Para Dispositivo Físico
1. **Configura el Firewall de Windows:**
   - Ejecuta como administrador: `add-firewall-rule.bat` (en raíz del proyecto)
   
2. **Asegúrate de estar en la misma WiFi:**
   - PC y móvil deben estar en la misma red

3. **Actualiza el `.env`:**
   ```env
   EXPO_PUBLIC_API_URL=http://TU_IP_LOCAL:8000
   ```

4. **Obtén tu IP local:**
   ```bash
   ipconfig
   ```
   Busca "Dirección IPv4" (ej: `10.189.249.192`)

**Ver guía completa:** [../SOLUCION-ANDROID-NETWORK.md](../SOLUCION-ANDROID-NETWORK.md)

---

## 📁 Estructura del Proyecto

```
chatbot-movil/
├── app/                    # Rutas de la aplicación (Expo Router)
│   └── (tabs)/
│       ├── ChatScreen.tsx  # Pantalla principal del chat
│       └── index.tsx       # Exporta ChatScreen
├── components/             # Componentes reutilizables
│   ├── ChatInput.tsx       # Input para enviar mensajes
│   ├── MessageBubble.tsx   # Burbuja de mensaje individual
│   └── MessageList.tsx     # Lista de mensajes
├── services/               # Servicios de API
│   ├── IChatService.tsx    # Interface del servicio
│   └── AxiosChatService.tsx # Implementación con Axios
├── hooks/                  # Custom hooks
│   └── useChat.tsx         # Hook para manejar lógica del chat
├── models/                 # Modelos de datos TypeScript
│   ├── Message.tsx         # Modelo de mensaje
│   └── ChatResponse.tsx    # Modelo de respuesta del backend
└── .env                    # Variables de entorno (crear manualmente)
```

---

## 🧪 Testing

### Ejecutar Tests
```bash
npm test                    # Ejecutar todos los tests
npm run test:watch          # Modo watch
npm run test:coverage       # Con coverage
```

### Tests E2E
```bash
npm run test:e2e
```

---

## 🏗️ Arquitectura

### Principios SOLID implementados:
- **Single Responsibility:** Cada componente tiene una única responsabilidad
- **Open/Closed:** Extensible vía nuevas implementaciones de `IChatService`
- **Liskov Substitution:** Cualquier implementación de `IChatService` funciona
- **Interface Segregation:** Interfaces específicas y pequeñas
- **Dependency Inversion:** Componentes dependen de abstracciones (`IChatService`)

### Flujo de datos:
```
ChatScreen → useChat → IChatService → AxiosChatService → Backend API
```

---

## 🔑 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `EXPO_PUBLIC_API_URL` | URL del backend | `http://10.189.249.192:8000` |

**IMPORTANTE:** Las variables en Expo DEBEN empezar con `EXPO_PUBLIC_` para ser accesibles en el código.

---

## 📝 Formato de API

### Request al backend:
```typescript
POST /api/v1/chat
{
  "message": "Tu mensaje aquí",
  "conversation_id": "user123"
}
```

### Response del backend:
```typescript
{
  "response": "Respuesta del chatbot",
  "status": "success",
  "conversation_id": "user123"
}
```

---

## 🐛 Solución de Problemas

### "Network Error" al enviar mensajes
- ✅ Verifica que el backend esté corriendo (`http://localhost:8000/api/v1/health`)
- ✅ Reinicia Expo con `--clear` después de cambiar `.env`
- ✅ Verifica la URL en `.env` según tu plataforma
- ✅ Para dispositivos físicos: asegúrate de estar en la misma WiFi
- ✅ Para Android: ejecuta `setup-android-port.bat` o configura el firewall

### Error 400 Bad Request
- Verifica que estés enviando `conversation_id` (no `user_id`)
- Revisa el formato del request en `ChatScreen.tsx`

### Timeout errors
- Aumenta el `timeout` en `AxiosChatService.tsx` o `ChatScreen.tsx`
- La API de OpenRouter puede tardar 20-60 segundos en responder

### Props.pointerEvents deprecated warning
- Ya resuelto: `KeyboardAvoidingView` solo se usa en iOS/Android, no en web

---

## 📚 Recursos

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🤝 Contribuir

1. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Haz commit de tus cambios: `git commit -m 'Agrega nueva funcionalidad'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es parte del Chatbot-Total y sigue la misma licencia del proyecto principal.

