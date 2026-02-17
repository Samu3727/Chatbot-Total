# 🌐 Chatbot Web - React + TypeScript + Vite

Aplicación web del chatbot que se conecta al backend FastAPI con OpenRouter.

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crea el archivo `.env` con la URL del backend:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Build para producción
```bash
npm run build
npm run preview  # Para previsualizar el build
```

---

## 📁 Estructura del Proyecto

```
chatbot-web/
├── src/
│   ├── apis/              # Servicios de API
│   │   └── ChatService.ts # Servicio para comunicación con backend
│   ├── components/        # Componentes React
│   │   ├── ChatInput/     # Input para enviar mensajes
│   │   ├── MessageList/   # Lista de mensajes
│   │   └── MessageBubble/ # Burbuja de mensaje individual
│   ├── services/          # Lógica de negocio
│   ├── utils/             # Utilidades
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Entry point
├── public/                # Assets estáticos
├── .env                   # Variables de entorno (crear manualmente)
└── vite.config.ts         # Configuración de Vite
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

## 🔑 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | URL del backend | `http://localhost:8000` |

**IMPORTANTE:** Las variables en Vite DEBEN empezar con `VITE_` para ser accesibles en el código.

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

### "Network Error" o CORS errors
- ✅ Verifica que el backend esté corriendo (`http://localhost:8000/api/v1/health`)
- ✅ Reinicia el servidor de desarrollo después de cambiar `.env`
- ✅ El backend ya tiene CORS configurado para `localhost:5173`

### Error 400 Bad Request
- Verifica que estés enviando `conversation_id` (no `user_id`)
- Revisa el formato del request en `ChatService.ts`

### Timeout errors
- Aumenta el `timeout` en el servicio de Axios
- La API de OpenRouter puede tardar en responder

---

## 🏗️ Stack Tecnológico

- **React 18+** - Library de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Vitest** - Testing framework
- **Axios** - Cliente HTTP
- **CSS Modules** - Estilos con scope

---

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vitest Documentation](https://vitest.dev/)

---

## 🤝 Contribuir

1. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Haz commit de tus cambios: `git commit -m 'Agrega nueva funcionalidad'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es parte del Chatbot-Total y sigue la misma licencia del proyecto principal.

