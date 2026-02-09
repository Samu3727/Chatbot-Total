# 🐳 Guía de Docker para Chatbot-Total

Esta guía te ayudará a ejecutar el proyecto completo usando Docker en cualquier equipo.

## 📋 Requisitos Previos

1. **Docker Desktop** instalado en tu equipo
   - Windows: [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Mac: [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Linux: Instalar Docker Engine y Docker Compose

2. **Verificar instalación:**
   ```bash
   docker --version
   docker-compose --version
   ```

## 🚀 Inicio Rápido

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `Backend/` basado en el ejemplo:

```bash
cd Backend
cp .env.example .env
```

Edita el archivo `.env` y agrega tu API key de OpenRouter:
```env
OPENROUTER_API_KEY=tu_api_key_real_aqui
DEFAULT_MODEL=openrouter/auto
```

### 2. Construir y Levantar los Servicios

Desde la raíz del proyecto:

```bash
# Construir las imágenes
docker-compose build

# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### 3. Acceder a las Aplicaciones

- **Frontend Web:** http://localhost
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs
- **Backend Móvil:** http://localhost:8001 (si está habilitado)

## 🎯 Comandos Útiles

### Gestión de Servicios

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Reiniciar servicios
docker-compose restart

# Ver estado de contenedores
docker-compose ps

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Reconstruir Imágenes

```bash
# Reconstruir todo desde cero
docker-compose build --no-cache

# Reconstruir solo un servicio
docker-compose build backend
```

### Limpieza

```bash
# Detener y eliminar contenedores, redes
docker-compose down

# Eliminar también volúmenes
docker-compose down -v

# Limpiar imágenes no usadas
docker system prune -a
```

## 🔧 Desarrollo con Docker

### Modo Desarrollo

Los archivos están montados como volúmenes, por lo que los cambios se reflejan automáticamente:

```bash
# Backend con hot-reload activado
docker-compose up backend

# Ver logs en tiempo real
docker-compose logs -f backend
```

### Ejecutar Comandos dentro del Contenedor

```bash
# Acceder al shell del backend
docker-compose exec backend bash

# Instalar nuevas dependencias
docker-compose exec backend pip install nuevo-paquete

# Ejecutar tests
docker-compose exec backend pytest
```

### Ejecutar Comandos en el Frontend

```bash
# Acceder al contenedor (después del build)
docker run -it chatbot-frontend sh

# Para desarrollo, mejor usar npm localmente
cd chatbot-web
npm install
npm run dev
```

## 🏗️ Estructura de Docker

```
Chatbot-Total/
├── docker-compose.yml          # Orquestación de servicios
├── Backend/
│   ├── Dockerfile             # Imagen del backend
│   ├── .dockerignore          # Archivos a ignorar
│   └── .env                   # Variables de entorno
├── chatbot-web/
│   ├── Dockerfile             # Imagen del frontend
│   ├── .dockerignore          # Archivos a ignorar
│   └── nginx.conf             # Configuración nginx
└── Backend-Movil/
    └── Dockerfile             # Imagen del backend móvil
```

## 🌐 Configuración de Red

Los servicios están en una red privada `chatbot-network`:
- Los contenedores pueden comunicarse entre sí por nombre
- Solo los puertos especificados están expuestos al host

## 🔐 Seguridad

1. **NUNCA** commites el archivo `.env` con tus API keys reales
2. Usa `.env.example` para documentar las variables necesarias
3. En producción, usa Docker secrets o variables de entorno del servidor

## 🐛 Solución de Problemas

### Puerto ya en uso

```bash
# Detener servicios previos
docker-compose down

# Cambiar puertos en docker-compose.yml si es necesario
# Ejemplo: "8080:80" en lugar de "80:80"
```

### Los cambios no se reflejan

```bash
# Reconstruir sin caché
docker-compose build --no-cache backend

# Reiniciar el servicio
docker-compose restart backend
```

### Problemas de permisos (Linux)

```bash
# Dar permisos al usuario actual
sudo chown -R $USER:$USER .
```

### Ver logs detallados

```bash
# Todos los servicios
docker-compose logs -f

# Solo errores
docker-compose logs -f | grep -i error
```

## 📦 Producción

Para desplegar en producción:

1. **Desactiva el modo desarrollo** en los Dockerfiles:
   - Elimina `--reload` de uvicorn
   - Usa builds optimizados

2. **Configura variables de entorno** apropiadamente

3. **Usa un proxy reverso** (nginx/traefik) para SSL

4. **Configura límites de recursos:**
   ```yaml
   services:
     backend:
       deploy:
         resources:
           limits:
             cpus: '0.5'
             memory: 512M
   ```

## 🎓 Backend Móvil (Opcional)

El backend móvil está configurado con un profile. Para activarlo:

```bash
# Levantar también el backend móvil
docker-compose --profile full up -d

# Solo backend y backend-movil
docker-compose up backend backend-movil -d
```

## 📱 Nota sobre chatbot-movil (React Native/Expo)

El proyecto de React Native no se puede ejecutar fácilmente en Docker porque requiere:
- Conexión con emuladores o dispositivos físicos
- Expo CLI con túnel/metro bundler

**Para desarrollo móvil:**
```bash
cd chatbot-movil
npm install
npm start
```

Asegúrate de que el backend esté corriendo en Docker y configura la URL correcta en el código móvil.

## ✅ Verificación de Funcionamiento

1. **Verificar salud del backend:**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Verificar frontend:**
   - Abre http://localhost en tu navegador

3. **Ver documentación de API:**
   - Abre http://localhost:8000/docs

## 🤝 Contribuir

Si necesitas modificar la configuración de Docker:
1. Actualiza los Dockerfiles según sea necesario
2. Actualiza docker-compose.yml
3. Actualiza esta documentación
4. Prueba con `docker-compose build --no-cache`

## 📧 Soporte

Si encuentras problemas:
1. Revisa los logs: `docker-compose logs -f`
2. Verifica la configuración de `.env`
3. Asegúrate de que Docker Desktop esté corriendo
4. Intenta reconstruir: `docker-compose build --no-cache`

---

¡Ahora tu proyecto está completamente dockerizado y listo para funcionar en cualquier equipo! 🎉
