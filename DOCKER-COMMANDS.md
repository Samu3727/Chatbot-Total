# 📚 Referencia Rápida de Comandos Docker

Comandos más utilizados para trabajar con el proyecto.

---

## 🚀 Iniciar y Detener

```bash
# Iniciar todos los servicios
docker-compose up -d

# Iniciar y ver logs
docker-compose up

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reiniciar todos los servicios
docker-compose restart

# Reiniciar un servicio específico
docker-compose restart backend
```

---

## 🏗️ Build y Rebuild

```bash
# Construir todas las imágenes
docker-compose build

# Construir sin usar caché
docker-compose build --no-cache

# Construir un servicio específico
docker-compose build backend

# Construir y reiniciar
docker-compose up -d --build
```

---

## 📊 Monitoreo y Logs

```bash
# Ver estado de contenedores
docker-compose ps

# Ver logs de todos los servicios
docker-compose logs

# Ver logs en tiempo real
docker-compose logs -f

# Logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Últimas N líneas de logs
docker-compose logs --tail=50 backend

# Logs con timestamps
docker-compose logs -t backend
```

---

## 🔍 Inspección y Debugging

```bash
# Acceder al shell del backend
docker-compose exec backend bash

# Ejecutar comando en contenedor
docker-compose exec backend python --version

# Ver procesos dentro del contenedor
docker-compose exec backend ps aux

# Ver variables de entorno
docker-compose exec backend env

# Inspeccionar configuración del servicio
docker-compose config

# Ver uso de recursos
docker stats
```

---

## 🧹 Limpieza

```bash
# Eliminar contenedores detenidos
docker-compose down

# Eliminar contenedores, redes y volúmenes
docker-compose down -v

# Limpiar imágenes no utilizadas
docker image prune -a

# Limpiar todo el sistema Docker
docker system prune -a --volumes

# Ver espacio usado por Docker
docker system df
```

---

## 🔧 Mantenimiento

```bash
# Actualizar imagen de un servicio
docker-compose build --no-cache backend
docker-compose up -d backend

# Recrear contenedores sin reconstruir
docker-compose up -d --force-recreate

# Escalar servicios (ejecutar múltiples instancias)
docker-compose up -d --scale backend=3

# Ver configuración compilada
docker-compose config

# Validar docker-compose.yml
docker-compose config --quiet
```

---

## 🌐 Redes

```bash
# Listar redes Docker
docker network ls

# Inspeccionar red del proyecto
docker network inspect chatbot-total_chatbot-network

# Probar conectividad entre servicios
docker-compose exec frontend ping backend

# Ver puertos expuestos
docker-compose port backend 8000
```

---

## 💾 Volúmenes

```bash
# Listar volúmenes
docker volume ls

# Inspeccionar volumen
docker volume inspect chatbot-total_backend_data

# Eliminar volúmenes no usados
docker volume prune

# Backup de volumen
docker run --rm -v chatbot-total_backend_data:/data -v $(pwd):/backup ubuntu tar czf /backup/backup.tar.gz /data
```

---

## 🐛 Troubleshooting

```bash
# Ver logs de error
docker-compose logs --tail=100 | grep -i error

# Ver últimos eventos de Docker
docker events --since 1h

# Verificar salud de servicios
curl http://localhost:8000/health

# Ver información detallada de contenedor
docker inspect chatbot-backend

# Ver procesos de Docker
docker ps -a
```

---

## ⚡ Comandos de Producción

```bash
# Iniciar con configuración de producción
docker-compose -f docker-compose.prod.yml up -d

# Ver logs sin seguir
docker-compose logs --tail=100 > logs.txt

# Reinicio con límite de tiempo
docker-compose restart -t 30

# Actualización sin downtime (si tienes réplicas)
docker-compose up -d --no-deps --build backend
```

---

## 📦 Gestión de Imágenes

```bash
# Listar imágenes
docker images

# Eliminar imagen específica
docker rmi chatbot-total-backend

# Eliminar imágenes sin tag
docker image prune

# Ver historial de una imagen
docker history chatbot-total-backend

# Guardar imagen a archivo
docker save chatbot-total-backend > backend.tar

# Cargar imagen desde archivo
docker load < backend.tar
```

---

## 🔐 Seguridad

```bash
# Ver vulnerabilidades en imagen
docker scan chatbot-total-backend

# Ver información de usuario en contenedor
docker-compose exec backend whoami

# Ver procesos con permisos
docker-compose exec backend ps aux
```

---

## 📱 Comandos Específicos del Proyecto

```bash
# Ejecutar tests en backend
docker-compose exec backend pytest

# Instalar nueva dependencia de Python
docker-compose exec backend pip install nombre-paquete

# Ejecutar migraciones (si hay base de datos)
docker-compose exec backend python manage.py migrate

# Acceder a consola Python
docker-compose exec backend python

# Ver versión de Python
docker-compose exec backend python --version

# Verificar conexión a servicios externos
docker-compose exec backend curl -I https://openrouter.ai
```

---

## 🎯 One-liners Útiles

```bash
# Reiniciar todo desde cero
docker-compose down -v && docker-compose build --no-cache && docker-compose up -d

# Ver logs de errores de todos los servicios
docker-compose logs | grep -i "error\|exception\|failed"

# Verificar que todo esté funcionando
docker-compose ps && curl http://localhost:8000/health && curl -I http://localhost

# Backup rápido de configuración
tar czf backup-$(date +%Y%m%d).tar.gz Backend/.env docker-compose.yml

# Ver uso de memoria de cada contenedor
docker stats --no-stream --format "table {{.Container}}\t{{.MemUsage}}"

# Detener y limpiar todo
docker-compose down -v && docker system prune -a -f
```

---

## 🔄 Workflow de Desarrollo

```bash
# 1. Inicio del día
docker-compose up -d
docker-compose logs -f

# 2. Durante desarrollo
# - Editar código (los cambios se reflejan automáticamente en backend)
# - Para frontend: docker-compose restart frontend

# 3. Si agregaste dependencias
docker-compose build backend
docker-compose up -d backend

# 4. Verificar cambios
docker-compose logs -f backend

# 5. Final del día
docker-compose down
```

---

## 💡 Tips

1. **Alias útiles (agregar a ~/.bashrc o ~/.zshrc):**
   ```bash
   alias dc='docker-compose'
   alias dcup='docker-compose up -d'
   alias dcdown='docker-compose down'
   alias dclogs='docker-compose logs -f'
   alias dcps='docker-compose ps'
   alias dcrestart='docker-compose restart'
   ```

2. **Make commands (si usas Makefile):**
   ```bash
   make up      # Iniciar
   make down    # Detener
   make logs    # Ver logs
   make restart # Reiniciar
   make clean   # Limpiar todo
   ```

3. **Scripts personalizados:**
   ```bash
   ./start-docker.bat   # Windows
   ./start-docker.sh    # Linux/Mac
   ```

---

## 📖 Documentación Relacionada

- 📘 Guía completa: [DOCKER.md](DOCKER.md)
- 🚀 Inicio rápido: [README.docker.md](README.docker.md)
- ✅ Checklist: [DOCKER-CHECKLIST.md](DOCKER-CHECKLIST.md)
- 🐛 Troubleshooting: [DOCKER-TROUBLESHOOTING.md](DOCKER-TROUBLESHOOTING.md)
- ⚙️ Configuración: [CONFIGURACION.md](CONFIGURACION.md)

---

**Última actualización:** Febrero 2026
