# 📦 Resumen de Configuración Docker

## ✅ Archivos Creados

### Archivos de Configuración Docker:
- ✅ `docker-compose.yml` - Orquestación de todos los servicios
- ✅ `.dockerignore` - Exclusiones globales para Docker
- ✅ `Backend/Dockerfile` - Imagen del backend principal
- ✅ `Backend/.dockerignore` - Exclusiones específicas del backend
- ✅ `Backend-Movil/Dockerfile` - Imagen del backend móvil
- ✅ `chatbot-web/Dockerfile` - Imagen del frontend (multi-stage build)
- ✅ `chatbot-web/.dockerignore` - Exclusiones del frontend
- ✅ `chatbot-web/nginx.conf` - Configuración de nginx para producción

### Documentación:
- ✅ `DOCKER.md` - Documentación completa y detallada
- ✅ `README.docker.md` - Guía rápida de inicio
- ✅ `Makefile` - Comandos simplificados (opcional)

### Scripts de Inicio:
- ✅ `start-docker.bat` - Script automático para Windows
- ✅ `start-docker.sh` - Script automático para Linux/Mac
- ✅ `stop-docker.bat` - Script de parada para Windows
- ✅ `stop-docker.sh` - Script de parada para Linux/Mac

## 🚀 Cómo Usar

### Opción 1: Scripts Automáticos (Recomendado)

**Windows:**
```cmd
start-docker.bat
```

**Linux/Mac:**
```bash
chmod +x start-docker.sh stop-docker.sh
./start-docker.sh
```

### Opción 2: Docker Compose Manual

```bash
# 1. Configurar .env
cd Backend
cp .env.example .env
# Editar .env con tu API key

# 2. Construir
docker-compose build

# 3. Iniciar
docker-compose up -d

# 4. Ver logs
docker-compose logs -f

# 5. Detener
docker-compose down
```

### Opción 3: Con Make

```bash
make build
make up
make logs
```

## 🌐 URLs de Acceso

Una vez iniciado:
- **Frontend Web:** http://localhost
- **Backend API:** http://localhost:8000
- **Documentación API:** http://localhost:8000/docs
- **Backend Móvil:** http://localhost:8001 (profile: full)

## 📋 Estructura de Servicios

```yaml
servicios:
  ├── backend         (Puerto 8000) - API principal
  ├── frontend        (Puerto 80)   - Aplicación web
  └── backend-movil   (Puerto 8001) - API móvil (opcional)
```

## 🔧 Características

### Backend:
- Python 3.11 slim
- FastAPI + Uvicorn
- Hot-reload activado
- Volúmenes montados para desarrollo
- Health checks configurados

### Frontend:
- Multi-stage build (optimizado)
- Nginx Alpine (imagen ligera)
- Compresión gzip activada
- Cache de archivos estáticos
- Headers de seguridad

### Red:
- Red privada `chatbot-network`
- Comunicación interna entre servicios
- Solo puertos necesarios expuestos

## 🛠️ Comandos Útiles

```bash
# Ver estado
docker-compose ps

# Logs de un servicio
docker-compose logs -f backend

# Reiniciar un servicio
docker-compose restart backend

# Reconstruir sin caché
docker-compose build --no-cache

# Acceder al shell
docker-compose exec backend bash

# Limpiar todo
docker-compose down -v
docker system prune -a
```

## 📝 Notas Importantes

1. **Variables de Entorno:**
   - DEBE configurar `OPENROUTER_API_KEY` en `Backend/.env`

2. **Puertos:**
   - Si el puerto 80 está ocupado, cambia `"80:80"` a `"8080:80"` en docker-compose.yml

3. **React Native (chatbot-movil):**
   - No está dockerizado (no es práctico para desarrollo móvil)
   - Ejecutar localmente con: `cd chatbot-movil && npm start`
   - Asegurarse de configurar la URL del backend correctamente

4. **Desarrollo:**
   - Los cambios en el código se reflejan automáticamente
   - Backend tiene hot-reload activado
   - Frontend requiere rebuild (`docker-compose build frontend`)

5. **Producción:**
   - Desactivar `--reload` en Backend/Dockerfile
   - Configurar certificados SSL
   - Ajustar límites de recursos
   - Usar variables de entorno del servidor

## 🐛 Solución de Problemas Rápida

| Problema | Solución |
|----------|----------|
| Puerto en uso | Cambiar puerto en docker-compose.yml |
| Backend no responde | `docker-compose logs backend` |
| Frontend muestra error | Verificar que backend esté corriendo |
| Cambios no se ven | `docker-compose restart` o rebuild |
| Permisos (Linux) | `sudo chown -R $USER:$USER .` |

## ✨ Próximos Pasos

1. Configurar CI/CD con Docker
2. Agregar tests automatizados en containers
3. Implementar Docker secrets para producción
4. Configurar monitoring (Prometheus/Grafana)
5. Agregar base de datos si es necesario

## 📚 Recursos

- **Documentación completa:** [DOCKER.md](DOCKER.md)
- **Guía rápida:** [README.docker.md](README.docker.md)
- **Docker Docs:** https://docs.docker.com/
- **Docker Compose:** https://docs.docker.com/compose/

---

**Estado:** ✅ Configuración completa y lista para usar

**Última actualización:** Febrero 2026
