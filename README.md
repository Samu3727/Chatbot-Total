# 🤖 Chatbot-Total

Sistema completo de chatbot con backend FastAPI, frontend web React y aplicación móvil React Native, integrado con OpenRouter para acceso a múltiples modelos de IA.

## 📦 Componentes del Proyecto

### 🔹 Backend (FastAPI + Python)
API REST que se conecta a OpenRouter para procesar mensajes del chatbot.

**Directorio:** `Backend/`  
**Puerto:** `8000`  
**Documentación:** Ver [Backend README](#backend-setup)

### 🔹 Frontend Web (React + Vite + TypeScript)
Aplicación web moderna para interactuar con el chatbot.

**Directorio:** `chatbot-web/`  
**Puerto:** `5173`  
**Documentación:** [chatbot-web/README.md](chatbot-web/README.md)

### 🔹 App Móvil (React Native + Expo + TypeScript)
Aplicación móvil multiplataforma (iOS/Android) del chatbot.

**Directorio:** `chatbot-movil/`  
**Documentación:** [chatbot-movil/README.md](chatbot-movil/README.md)

---

## 🚀 Inicio Rápido

### Prerequisitos
- **Python 3.9+**
- **Node.js 18+**
- **npm o yarn**
- **Cuenta de OpenRouter** (para API key)

### 1️⃣ Backend Setup

```bash
# Ir al directorio del backend
cd Backend

# Crear y activar entorno virtual
python -m venv .venv
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env y agregar tu OPENROUTER_API_KEY

# Iniciar servidor
python main.py
```

El backend estará disponible en `http://localhost:8000`  
Documentación API: `http://localhost:8000/docs`

### 2️⃣ Frontend Web Setup

```bash
# Ir al directorio del frontend web
cd chatbot-web

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env:
echo "VITE_API_BASE_URL=http://localhost:8000" > .env

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación web estará disponible en `http://localhost:5173`

### 3️⃣ App Móvil Setup

```bash
# Ir al directorio de la app móvil
cd chatbot-movil

# Instalar dependencias
npm install

# Configurar variables de entorno según tu plataforma:
# Para dispositivo físico (misma WiFi):
echo "EXPO_PUBLIC_API_URL=http://10.189.249.192:8000" > .env
# Para emulador Android:
echo "EXPO_PUBLIC_API_URL=http://10.0.2.2:8000" > .env
# Para iOS Simulator:
echo "EXPO_PUBLIC_API_URL=http://localhost:8000" > .env

# Iniciar Expo
npx expo start --clear
```

---

## 📱 Configuración para Android

### Dispositivos Físicos
1. **Configura el Firewall:**
   ```bash
   # Ejecutar como administrador
   .\add-firewall-rule.bat
   ```

2. **Obtén tu IP local:**
   ```bash
   ipconfig
   ```
   Busca "Dirección IPv4" (ej: `10.189.249.192`)

3. **Actualiza `.env` en chatbot-movil:**
   ```env
   EXPO_PUBLIC_API_URL=http://TU_IP_LOCAL:8000
   ```

### Emulador Android
**Opción A: Con adb reverse (Recomendada)**
```bash
cd chatbot-movil
.\setup-android-port.bat
```
Luego usa en `.env`:
```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

**Opción B: Sin adb reverse**
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8000
```

**Ver guía completa:** [SOLUCION-ANDROID-NETWORK.md](SOLUCION-ANDROID-NETWORK.md)

---

## 🐳 Docker (Alternativa)

Para ejecutar el proyecto completo con Docker:

```bash
# Verificar instalación
.\verify-docker.bat

# Configurar .env en Backend
cd Backend
cp .env.example .env
# Editar .env con tu OPENROUTER_API_KEY

# Iniciar todos los servicios
.\start-docker.bat

# Detener servicios
.\stop-docker.bat
```

**URLs con Docker:**
- Frontend Web: `http://localhost`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

**Documentación completa:** [DOCKER.md](DOCKER.md)

---

## 📝 Formato de API

### Endpoint de Chat
```http
POST /api/v1/chat
Content-Type: application/json

{
  "message": "Hola, ¿cómo estás?",
  "conversation_id": "user123"
}
```

### Respuesta
```json
{
  "response": "¡Hola! Estoy bien, gracias por preguntar. ¿En qué puedo ayudarte?",
  "status": "success",
  "conversation_id": "user123"
}
```

### Endpoint de Health Check
```http
GET /api/v1/health
```

```json
{
  "status": "online",
  "message": "Chatbot API is running smoothly",
  "version": "1.0.0"
}
```

---

## 🗂️ Estructura del Proyecto

```
Chatbot-Total/
├── Backend/                    # Backend FastAPI
│   ├── config/                 # Configuración
│   ├── models/                 # Modelos Pydantic
│   ├── routes/                 # Endpoints de la API
│   ├── services/               # Lógica de negocio
│   ├── tests/                  # Tests unitarios
│   ├── main.py                 # Entry point
│   └── requirements.txt        # Dependencias Python
│
├── chatbot-web/                # Frontend Web React
│   ├── src/
│   │   ├── apis/              # Servicios de API
│   │   ├── components/        # Componentes React
│   │   ├── services/          # Lógica de negocio
│   │   └── App.tsx            # Componente principal
│   └── package.json
│
├── chatbot-movil/              # App Móvil React Native
│   ├── app/                   # Rutas (Expo Router)
│   ├── components/            # Componentes reutilizables
│   ├── services/              # Servicios de API
│   ├── hooks/                 # Custom hooks
│   ├── models/                # Modelos TypeScript
│   └── package.json
│
├── add-firewall-rule.bat       # Script para configurar firewall
├── setup-android-port.bat      # Script para adb reverse
├── CONFIGURACION.md            # Guía de configuración completa
├── CONFIGURACION-RED.md        # Guía de configuración de red
└── SOLUCION-ANDROID-NETWORK.md # Solución problemas Android
```

---

## 🧪 Testing

### Backend
```bash
cd Backend
pytest
pytest --cov=. --cov-report=html
```

### Frontend Web
```bash
cd chatbot-web
npm test
npm run test:coverage
```

### App Móvil
```bash
cd chatbot-movil
npm test
npm run test:coverage
npm run test:e2e
```

---

## 🐛 Solución de Problemas Comunes

### ❌ "Network Error" en móvil
**Solución:**
- ✅ Verifica que el backend esté corriendo
- ✅ Configura el firewall (ejecuta `add-firewall-rule.bat` como admin)
- ✅ Usa la IP local correcta en `.env`
- ✅ Asegúrate de estar en la misma red WiFi
- ✅ Reinicia Expo con `--clear`

**Ver:** [SOLUCION-ANDROID-NETWORK.md](SOLUCION-ANDROID-NETWORK.md)

### ❌ Error 400 Bad Request
**Causa:** Formato incorrecto del request  
**Solución:** Asegúrate de enviar `conversation_id` (no `user_id`)

### ❌ Timeout errors
**Causa:** OpenRouter tarda en responder  
**Solución:** 
- Aumenta el timeout a 60 segundos
- Espera entre mensajes
- Verifica logs del backend

### ❌ Props.pointerEvents deprecated
**Solución:** Ya resuelto - reinicia Expo con `--clear`

### ❌ CORS errors en web
**Solución:** El CORS ya está configurado. Verifica que el backend esté en `0.0.0.0:8000`

---

## 📚 Documentación Adicional

- 📘 [Configuración Completa](CONFIGURACION.md)
- 🌐 [Configuración de Red](CONFIGURACION-RED.md)
- 📱 [Solución Problemas Android](SOLUCION-ANDROID-NETWORK.md)
- 🐳 [Guía Docker](DOCKER.md)
- 📦 [Docker Setup](DOCKER-SETUP.md)
- 🔧 [Docker Troubleshooting](DOCKER-TROUBLESHOOTING.md)

---

## 🛠️ Stack Tecnológico

### Backend
- **FastAPI** - Framework web moderno para Python
- **Uvicorn** - Servidor ASGI
- **Pydantic** - Validación de datos
- **Axios** - Cliente HTTP
- **OpenRouter** - Gateway para modelos de IA

### Frontend Web
- **React 18+** - Library de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Vitest** - Testing

### App Móvil
- **React Native** - Framework móvil
- **Expo** - Herramientas de desarrollo
- **TypeScript** - Tipado estático
- **Axios** - Cliente HTTP
- **Jest** - Testing

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia especificada en el repositorio.

---

## 👥 Autores

- **Samu3727** - [GitHub](https://github.com/Samu3727)

---

## 📞 Soporte

¿Problemas? Revisa:
1. [SOLUCION-ANDROID-NETWORK.md](SOLUCION-ANDROID-NETWORK.md)
2. [CONFIGURACION.md](CONFIGURACION.md)
3. [DOCKER-TROUBLESHOOTING.md](DOCKER-TROUBLESHOOTING.md)
4. Abre un issue en GitHub

---

**¡Disfruta construyendo con Chatbot-Total! 🚀**
