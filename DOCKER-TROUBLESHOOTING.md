# 🐛 Solución de Problemas Docker

Guía completa para resolver los problemas más comunes con Docker.

---

## 🔍 Problemas de Instalación

### Docker no está instalado
```bash
# Síntoma
docker: command not found

# Solución
1. Descargar Docker Desktop desde: https://www.docker.com/products/docker-desktop
2. Instalar siguiendo las instrucciones
3. Reiniciar el equipo si es necesario
4. Verificar: docker --version
```

### Docker Compose no funciona
```bash
# Síntoma
docker-compose: command not found

# Solución Windows/Mac
Docker Compose viene incluido con Docker Desktop

# Solución Linux
sudo apt-get install docker-compose
# o
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

---

## 🚫 Problemas al Iniciar Docker

### Docker Desktop no inicia (Windows)
```bash
# Síntoma
Cannot connect to the Docker daemon

# Soluciones
1. Verificar que WSL 2 esté instalado:
   wsl --list --verbose
   
2. Actualizar WSL 2:
   wsl --update
   
3. Habilitar Virtualización en BIOS
   - Reiniciar > Entrar a BIOS > Habilitar VT-x/AMD-V
   
4. Reinstalar Docker Desktop
```

### Docker daemon not running (Mac)
```bash
# Síntoma
Cannot connect to the Docker daemon at unix:///var/run/docker.sock

# Solución
1. Abrir Docker Desktop desde Applications
2. Esperar a que aparezca el ícono en la barra superior
3. Verificar: docker info
```

---

## 🔌 Problemas de Puertos

### Puerto 80 ya está en uso
```bash
# Síntoma
Error: Bind for 0.0.0.0:80 failed: port is already allocated

# Solución 1: Identificar qué está usando el puerto (Windows)
netstat -ano | findstr :80
taskkill /PID <número> /F

# Solución 2: Cambiar el puerto
# Editar docker-compose.yml:
  frontend:
    ports:
      - "8080:80"  # Cambia de 80:80 a 8080:80

# Acceder: http://localhost:8080
```

### Puerto 8000 ya está en uso
```bash
# Síntoma
Error: Bind for 0.0.0.0:8000 failed: port is already allocated

# Solución 1: Detener el proceso
# Windows
netstat -ano | findstr :8000
taskkill /PID <número> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9

# Solución 2: Cambiar el puerto
# Editar docker-compose.yml:
  backend:
    ports:
      - "8001:8000"  # Cambia a otro puerto

# Actualizar URL en frontend
```

---

## 🏗️ Problemas de Build

### Build falla sin mensaje claro
```bash
# Síntoma
ERROR: build failed

# Solución: Limpiar cache y reconstruir
docker-compose down
docker system prune -a -f
docker-compose build --no-cache
```

### Error: No space left on device
```bash
# Síntoma
no space left on device

# Solución: Limpiar imágenes antiguas
docker system prune -a --volumes -f
```

### Error al copiar archivos durante build
```bash
# Síntoma
ERROR: failed to compute cache key: not found

# Solución
1. Verificar que los archivos existan
2. Revisar .dockerignore no excluya archivos necesarios
3. Asegurarse de ejecutar desde la raíz del proyecto
```

---

## 🚀 Problemas al Ejecutar

### Contenedores se detienen inmediatamente
```bash
# Diagnóstico
docker-compose ps      # Ver estado
docker-compose logs -f backend  # Ver logs

# Soluciones comunes
1. Error de sintaxis en código Python/JS
2. Variable de entorno faltante
3. Puerto ya en uso
4. Comando incorrecto en Dockerfile
```

### Backend no responde / Health check failed
```bash
# Síntoma
backend | ERROR: Application startup failed

# Solución 1: Verificar .env
cat Backend/.env
# Debe tener: OPENROUTER_API_KEY=...

# Solución 2: Ver logs detallados
docker-compose logs -f backend

# Solución 3: Acceder al contenedor
docker-compose exec backend bash
python -c "from config import settings; print(settings.openrouter_api_key)"
```

### Frontend muestra página en blanco
```bash
# Solución 1: Verificar que backend esté corriendo
curl http://localhost:8000/health

# Solución 2: Verificar logs de nginx
docker-compose logs -f frontend

# Solución 3: Reconstruir frontend
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

---

## 🔗 Problemas de Conexión

### Frontend no se conecta al backend
```bash
# Síntoma
CORS error / Network error

# Solución 1: Verificar que ambos servicios estén corriendo
docker-compose ps

# Solución 2: Verificar URL del backend
# En navegador: http://localhost:8000/docs

# Solución 3: Verificar CORS en Backend/main.py
# Debe incluir: allow_origins=["*"]
```

### No se puede acceder desde navegador
```bash
# Síntoma
This site can't be reached

# Solución 1: Verificar que contenedores estén UP
docker-compose ps

# Solución 2: Verificar puertos correctos
docker-compose ps  # Ver columna PORTS

# Solución 3: Verificar firewall
# Windows: Permitir Docker Desktop y Python en firewall
```

---

## 📱 Problemas con App Móvil

### Móvil no se conecta al backend dockerizado
```bash
# Síntoma
Network request failed

# Solución 1: Usar IP local, no localhost
ipconfig  # Windows
ifconfig  # Linux/Mac

# En chatbot-movil/.env:
EXPO_PUBLIC_API_URL=http://192.168.1.XXX:8000

# Solución 2: Verificar misma red WiFi
# El móvil y la PC deben estar en la misma red

# Solución 3: Verificar firewall
# Permitir Python en firewall de Windows
```

---

## 🔐 Problemas de Permisos

### Permission denied (Linux/Mac)
```bash
# Síntoma
Got permission denied while trying to connect to Docker daemon

# Solución 1: Agregar usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Solución 2: Usar sudo
sudo docker-compose up -d

# Solución 3: Cambiar permisos del socket
sudo chmod 666 /var/run/docker.sock
```

### No se pueden modificar archivos montados
```bash
# Síntoma
Permission denied al editar archivos

# Solución (Linux)
sudo chown -R $USER:$USER .
```

---

## 💾 Problemas de Datos

### Cambios en código no se reflejan
```bash
# Para Backend (con hot-reload)
docker-compose restart backend

# Para Frontend (requiere rebuild)
docker-compose build frontend
docker-compose up -d frontend

# Forzar recreación completa
docker-compose down
docker-compose up -d --build
```

### Variables de entorno no se actualizan
```bash
# Solución
1. Editar Backend/.env
2. Detener y reiniciar:
   docker-compose down
   docker-compose up -d
```

---

## 🧹 Limpiar y Empezar de Nuevo

### Reset completo del proyecto
```bash
# 1. Detener todo
docker-compose down -v

# 2. Eliminar imágenes del proyecto
docker rmi chatbot-total-backend chatbot-total-frontend

# 3. Limpiar sistema Docker
docker system prune -a --volumes -f

# 4. Reconstruir todo
docker-compose build --no-cache

# 5. Iniciar de nuevo
docker-compose up -d
```

---

## 📊 Comandos de Diagnóstico

### Ver logs en tiempo real
```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Últimas 100 líneas
docker-compose logs --tail=100 backend
```

### Inspeccionar contenedores
```bash
# Estado de contenedores
docker-compose ps

# Recursos usados
docker stats

# Procesos dentro del contenedor
docker-compose exec backend ps aux

# Variables de entorno
docker-compose exec backend env
```

### Acceder al shell del contenedor
```bash
# Backend
docker-compose exec backend bash

# Si bash no está disponible
docker-compose exec backend sh

# Ejecutar comando directo
docker-compose exec backend python -c "import sys; print(sys.version)"
```

### Verificar red
```bash
# Listar redes
docker network ls

# Inspeccionar red del proyecto
docker network inspect chatbot-total_chatbot-network

# Probar conectividad entre contenedores
docker-compose exec frontend ping backend
```

---

## 🔄 Actualizar Docker

### Actualizar Docker Desktop
```bash
# Windows/Mac
1. Abrir Docker Desktop
2. Ir a Settings > Software Updates
3. Click "Update"

# Verificar versión
docker --version
docker-compose --version
```

---

## 📞 Obtener Ayuda

Si ninguna solución funciona:

1. **Verificar versiones:**
   ```bash
   docker --version
   docker-compose --version
   ```

2. **Ver logs completos:**
   ```bash
   docker-compose logs --no-color > docker-logs.txt
   ```

3. **Información del sistema:**
   ```bash
   docker info > docker-info.txt
   ```

4. **Revisar documentación:**
   - [DOCKER.md](DOCKER.md)
   - [Docker Docs](https://docs.docker.com/)

---

## ✅ Checklist de Diagnóstico Rápido

- [ ] Docker Desktop está corriendo
- [ ] `docker info` funciona sin errores
- [ ] Archivo `Backend/.env` existe con OPENROUTER_API_KEY
- [ ] Puertos 80 y 8000 están disponibles
- [ ] `docker-compose ps` muestra servicios "Up"
- [ ] `docker-compose logs` no muestra errores
- [ ] `curl http://localhost:8000/health` responde OK
- [ ] `curl http://localhost` muestra HTML

Si todos los checks pasan, el problema probablemente es de configuración de la aplicación, no de Docker.

---

**Última actualización:** Febrero 2026
