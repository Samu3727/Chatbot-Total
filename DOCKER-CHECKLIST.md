# ✅ Checklist: Ejecutar Chatbot-Total con Docker

Sigue estos pasos en orden para poner en marcha tu proyecto.

## 📋 Pre-requisitos

- [ ] **Docker Desktop instalado y corriendo**
  - Windows/Mac: https://www.docker.com/products/docker-desktop
  - Linux: Docker Engine + Docker Compose
  
- [ ] **Verificar instalación:**
  ```bash
  docker --version
  docker-compose --version
  ```

## 🚀 Pasos de Configuración

### 1️⃣ Configurar Variables de Entorno

- [ ] Navegar a la carpeta Backend:
  ```bash
  cd Backend
  ```

- [ ] Crear archivo .env desde el ejemplo:
  ```bash
  # Windows
  copy .env.example .env
  
  # Linux/Mac
  cp .env.example .env
  ```

- [ ] Editar `Backend/.env` y agregar tu API key:
  ```env
  OPENROUTER_API_KEY=tu_api_key_real_aqui
  DEFAULT_MODEL=openrouter/auto
  ```

- [ ] Guardar y cerrar el archivo

### 2️⃣ Verificar Sistema (Opcional pero Recomendado)

- [ ] Ejecutar script de verificación:
  ```bash
  # PowerShell (Windows)
  .\verify-docker.bat
  
  # CMD (Windows)
  verify-docker.bat
  
  # Linux/Mac
  chmod +x verify-docker.sh
  ./verify-docker.sh
  ```

- [ ] Resolver cualquier problema indicado

### 3️⃣ Construir las Imágenes Docker

- [ ] Volver a la raíz del proyecto:
  ```bash
  cd ..
  ```

- [ ] Construir las imágenes:
  ```bash
  docker-compose build
  ```

- [ ] Esperar a que termine (puede tomar 5-10 minutos la primera vez)

### 4️⃣ Iniciar los Servicios

Elige UNA de estas opciones:

**Opción A: Script Automático (Recomendado)**
- [ ] Ejecutar script de inicio:
  ```bash
  # PowerShell (Windows)
  .\start-docker.bat
  
  # CMD (Windows)
  start-docker.bat
  
  # Linux/Mac
  ./start-docker.sh
  ```

**Opción B: Comando Manual**
- [ ] Iniciar con docker-compose:
  ```bash
  docker-compose up -d
  ```

### 5️⃣ Verificar que Todo Funcione

- [ ] Verificar estado de contenedores:
  ```bash
  docker-compose ps
  ```
  Deberías ver `backend` y `frontend` con estado "Up"

- [ ] Abrir en navegador: http://localhost
  - Deberías ver la interfaz del chatbot web

- [ ] Abrir en navegador: http://localhost:8000/docs
  - Deberías ver la documentación de la API

- [ ] Enviar un mensaje de prueba en el chatbot
  - Debería recibir una respuesta

### 6️⃣ Ver Logs (Opcional)

- [ ] Ver logs de todos los servicios:
  ```bash
  docker-compose logs -f
  ```

- [ ] Ver logs solo del backend:
  ```bash
  docker-compose logs -f backend
  ```

- [ ] Presionar `Ctrl+C` para salir de los logs

## 🛑 Detener el Proyecto

Cuando termines de trabajar:

- [ ] Detener todos los servicios:
  ```bash
  # Opción 1: Script
  # PowerShell: .\stop-docker.bat
  # CMD: stop-docker.bat
  # Linux/Mac: ./stop-docker.sh
  
  # Opción 2: Manual
  docker-compose down
  ```

## 🔄 Reiniciar el Proyecto

Para trabajar de nuevo:

- [ ] Simplemente volver a iniciar:
  ```bash
  docker-compose up -d
  ```
  (No necesitas reconstruir si no cambiaste el código)

## 📱 Configurar App Móvil (Opcional)

El proyecto React Native NO corre en Docker. Para usarlo:

- [ ] Navegar a chatbot-movil:
  ```bash
  cd chatbot-movil
  ```

- [ ] Copiar .env.example:
  ```bash
  cp .env.example .env
  ```

- [ ] Editar .env con la URL del backend:
  ```env
  # Para dispositivo físico (usa tu IP)
  EXPO_PUBLIC_API_URL=http://192.168.X.X:8000
  
  # Para emulador Android
  EXPO_PUBLIC_API_URL=http://10.0.2.2:8000
  ```

- [ ] Instalar dependencias:
  ```bash
  npm install
  ```

- [ ] Iniciar Expo:
  ```bash
  npm start
  ```

## ✨ ¡Listo!

Si completaste todos los pasos con ✅, deberías tener:
- ✅ Backend corriendo en http://localhost:8000
- ✅ Frontend corriendo en http://localhost
- ✅ Documentación API en http://localhost:8000/docs

## 🆘 Si Algo Sale Mal

| Problema | Solución |
|----------|----------|
| Docker no inicia | Asegúrate de que Docker Desktop esté corriendo |
| Puerto 80 ocupado | Cambia `"80:80"` a `"8080:80"` en docker-compose.yml |
| Puerto 8000 ocupado | Cambia `"8000:8000"` a `"8001:8000"` en docker-compose.yml |
| Error de API key | Verifica que `Backend/.env` tenga `OPENROUTER_API_KEY` correcto |
| Cambios no se ven | Ejecuta `docker-compose restart` |
| Error de build | Ejecuta `docker-compose build --no-cache` |

## 📚 Documentación Adicional

- 📖 Guía completa: [DOCKER.md](DOCKER.md)
- 🚀 Inicio rápido: [README.docker.md](README.docker.md)
- 📦 Resumen: [DOCKER-SETUP.md](DOCKER-SETUP.md)
- 🔧 Configuración: [CONFIGURACION.md](CONFIGURACION.md)

---

**¿Todo funcionando?** ¡Felicidades! 🎉 Ahora puedes desarrollar sin preocuparte por dependencias o configuraciones.
