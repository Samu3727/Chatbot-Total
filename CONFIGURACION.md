# Guía de Configuración - Conectar Frontends al Backend

## Configuración del Backend

1. **Crear archivo de variables de entorno:**
   ```bash
   cd Backend
   cp .env.example .env
   ```

2. **Configurar tu API Key de OpenRouter:**
   Edita el archivo `.env` y añade tu API key:
   ```
   OPENROUTER_API_KEY=tu_api_key_aqui
   DEFAULT_MODEL=openrouter/auto
   ```

3. **Iniciar el servidor:**
   ```bash
   pip install -r requirements.txt
   python main.py
   ```
   
   El servidor estará corriendo en `http://localhost:8000`

## Configuración del Frontend Web

1. **Crear archivo de variables de entorno:**
   ```bash
   cd chatbot-web
   cp .env.example .env
   ```

2. **Configurar la URL del backend (opcional):**
   El archivo `.env` ya tiene la configuración por defecto:
   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```

3. **Instalar dependencias e iniciar:**
   ```bash
   npm install
   npm run dev
   ```
   
   La aplicación web estará corriendo en `http://localhost:5173`

## Configuración del Frontend Móvil

1. **Crear archivo de variables de entorno:**
   ```bash
   cd chatbot-movil
   cp .env.example .env
   ```

2. **Configurar la URL del backend según tu entorno:**
   
   Edita el archivo `.env`:
   
   - **Para iOS Simulator:**
     ```
     EXPO_PUBLIC_API_URL=http://localhost:8000
     ```
   
   - **Para Android Emulator:**
     ```
     EXPO_PUBLIC_API_URL=http://10.0.2.2:8000
     ```
   
   - **Para Dispositivo Físico:**
     Usa tu IP local (ejecuta `ipconfig` en Windows o `ifconfig` en Mac/Linux):
     ```
     EXPO_PUBLIC_API_URL=http://192.168.1.XXX:8000
     ```

3. **Instalar dependencias e iniciar:**
   ```bash
   npm install
   npm start
   ```

## Verificación de la Conexión

### Backend
- Abre `http://localhost:8000/docs` para ver la documentación de la API
- Verifica el endpoint de health: `http://localhost:8000/api/v1/health`

### Frontend Web
- Abre la aplicación en `http://localhost:5173`
- Envía un mensaje de prueba
- Revisa la consola del navegador para verificar las peticiones

### Frontend Móvil
- Escanea el código QR con Expo Go
- Envía un mensaje de prueba
- Revisa los logs de Expo para verificar las peticiones

## Rutas de la API

Todos los endpoints están bajo el prefijo `/api/v1`:

- **Health Check:** `GET /api/v1/health`
- **Chat:** `POST /api/v1/chat`
  ```json
  {
    "message": "Tu mensaje aquí",
    "conversation_id": "opcional"
  }
  ```

## Solución de Problemas

### Error de CORS
Si ves errores de CORS en la consola:
- Verifica que el backend esté corriendo
- El CORS ya está configurado para permitir todos los orígenes en desarrollo

### No se puede conectar desde el móvil
- Asegúrate de que tu computadora y dispositivo móvil están en la misma red WiFi
- Verifica que el firewall no esté bloqueando el puerto 8000
- En Windows, puede ser necesario permitir Python en el firewall

### Errores de timeout
- Aumenta el timeout en el servicio de chat si es necesario
- Verifica que el backend esté respondiendo correctamente

## Estructura de URLs

| Componente | URL por Defecto |
|------------|----------------|
| Backend API | http://localhost:8000 |
| Frontend Web | http://localhost:5173 |
| Frontend Móvil | Expo Go (variable) |

## 🐳 Configuración con Docker (Recomendado)

### ¿Por qué usar Docker?
Docker permite ejecutar el proyecto en cualquier equipo sin problemas de dependencias, versiones de Python/Node, o configuración del entorno.

### Inicio Rápido con Docker

#### Opción 1: Script Automático (Más Fácil)

**PowerShell (Windows):**
```powershell
.\verify-docker.bat    # Verificar que todo esté listo
.\start-docker.bat     # Iniciar el proyecto
.\stop-docker.bat      # Detener el proyecto
```

**CMD (Windows):**
```cmd
verify-docker.bat    # Verificar que todo esté listo
start-docker.bat     # Iniciar el proyecto
stop-docker.bat      # Detener el proyecto
```

**Linux/Mac:**
```bash
chmod +x *.sh
./verify-docker.sh   # Verificar que todo esté listo
./start-docker.sh    # Iniciar el proyecto
./stop-docker.sh     # Detener el proyecto
```

#### Opción 2: Docker Compose Manual

```bash
# 1. Configurar variables de entorno
cd Backend
cp .env.example .env
# Editar .env con tu OPENROUTER_API_KEY

# 2. Construir imágenes
docker-compose build

# 3. Iniciar servicios
docker-compose up -d

# 4. Verificar estado
docker-compose ps

# 5. Ver logs
docker-compose logs -f

# 6. Detener servicios
docker-compose down
```

### URLs con Docker
- **Frontend Web:** http://localhost
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

### Documentación Completa de Docker
- 📖 **Guía completa:** [DOCKER.md](DOCKER.md)
- 🚀 **Inicio rápido:** [README.docker.md](README.docker.md)
- 📦 **Resumen setup:** [DOCKER-SETUP.md](DOCKER-SETUP.md)

---

## Notas Importantes

- **El backend debe estar corriendo** antes de iniciar los frontends
- Las variables de entorno en Expo deben empezar con `EXPO_PUBLIC_`
- En producción, asegúrate de cambiar el CORS para permitir solo orígenes específicos
- Nunca subas archivos `.env` al repositorio (ya están en `.gitignore`)
- **Con Docker, todo el proceso de instalación y configuración es automático** ✨
