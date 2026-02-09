# 🐳 Índice Completo de Documentación Docker

Toda la documentación necesaria para trabajar con Docker en el proyecto Chatbot-Total.

---

## 🚀 Para Empezar

Si es tu primera vez con Docker en este proyecto, **empieza aquí**:

1. **[DOCKER-CHECKLIST.md](DOCKER-CHECKLIST.md)** ✅
   - Lista de pasos para configurar todo
   - Perfecto para principiantes
   - Incluye verificaciones en cada paso

2. **[README.docker.md](README.docker.md)** 📘
   - Guía de inicio rápido
   - 4 pasos para poner todo en marcha
   - Lo más conciso posible

---

## 📚 Documentación Completa

### Guías Principales

- **[DOCKER.md](DOCKER.md)** 📖
  - Documentación completa y exhaustiva
  - Cubre todos los casos de uso
  - Incluye ejemplos y mejores prácticas
  - Secciones de desarrollo y producción

- **[DOCKER-SETUP.md](DOCKER-SETUP.md)** 📦
  - Resumen de archivos creados
  - Estructura del proyecto Docker
  - Instrucciones de uso de cada componente
  - Características técnicas

### Referencias Rápidas

- **[DOCKER-COMMANDS.md](DOCKER-COMMANDS.md)** 💻
  - Todos los comandos útiles
  - Comandos de monitoreo y debugging
  - One-liners para tareas comunes
  - Workflows de desarrollo

- **[DOCKER-TROUBLESHOOTING.md](DOCKER-TROUBLESHOOTING.md)** 🐛
  - Soluciones a problemas comunes
  - Guías de diagnóstico
  - Comandos de depuración
  - Checklist de verificación

---

## 🛠️ Archivos de Configuración

| Archivo | Descripción |
|---------|-------------|
| `docker-compose.yml` | Configuración principal (desarrollo) |
| `docker-compose.prod.yml` | Configuración optimizada para producción |
| `.dockerignore` | Archivos excluidos del contexto de build |
| `Backend/Dockerfile` | Imagen del backend (desarrollo) |
| `Backend/Dockerfile.prod` | Imagen del backend (producción) |
| `Backend/.dockerignore` | Exclusiones específicas del backend |
| `Backend/.env.example` | Template de variables de entorno |
| `Backend-Movil/Dockerfile` | Imagen del backend móvil |
| `chatbot-web/Dockerfile` | Imagen del frontend web |
| `chatbot-web/.dockerignore` | Exclusiones del frontend |
| `chatbot-web/nginx.conf` | Configuración de nginx para producción |

---

## 🎯 Scripts Útiles

### Windows PowerShell

```powershell
.\verify-docker.bat    # Verificar requisitos e instalación
.\start-docker.bat     # Iniciar todos los servicios
.\stop-docker.bat      # Detener todos los servicios
```

### Windows CMD

```cmd
verify-docker.bat    # Verificar requisitos e instalación
start-docker.bat     # Iniciar todos los servicios
stop-docker.bat      # Detener todos los servicios
```

### Linux / Mac (Bash)

```bash
./verify-docker.sh   # Verificar requisitos e instalación
./start-docker.sh    # Iniciar todos los servicios
./stop-docker.sh     # Detener todos los servicios
```

### Makefile (Opcional)

Si tienes `make` instalado, puedes usar:

```bash
make build           # Construir imágenes
make up              # Iniciar servicios
make down            # Detener servicios
make logs            # Ver logs
make restart         # Reiniciar servicios
make clean           # Limpiar todo
```

---

## 📋 Flujo de Trabajo Recomendado

### Primera Vez

1. Lee [DOCKER-CHECKLIST.md](DOCKER-CHECKLIST.md)
2. Ejecuta `verify-docker.bat` o `./verify-docker.sh`
3. Sigue los pasos en la checklist
4. ¡Listo para desarrollar!

### Uso Diario

```bash
# Iniciar trabajo
.\start-docker.bat    # PowerShell (Windows)
start-docker.bat      # CMD (Windows)
./start-docker.sh     # Linux/Mac
# o
docker-compose up -d

# Durante desarrollo
# Los cambios en Backend se reflejan automáticamente
# Para Frontend, ejecutar: docker-compose restart frontend

# Ver logs
docker-compose logs -f

# Detener trabajo
.\stop-docker.bat     # PowerShell (Windows)
stop-docker.bat       # CMD (Windows)
./stop-docker.sh      # Linux/Mac
# o
docker-compose down
```

### Cuando Hay Problemas

1. Consulta [DOCKER-TROUBLESHOOTING.md](DOCKER-TROUBLESHOOTING.md)
2. Revisa logs: `docker-compose logs -f`
3. Verifica estado: `docker-compose ps`
4. Si es necesario, limpia y reconstruye:
   ```bash
   docker-compose down -v
   docker-compose build --no-cache
   docker-compose up -d
   ```

---

## 🎓 Niveles de Conocimiento

### 🟢 Principiante

Empieza con estos archivos en orden:

1. [README.docker.md](README.docker.md) - Conceptos básicos
2. [DOCKER-CHECKLIST.md](DOCKER-CHECKLIST.md) - Pasos guiados
3. Usa los scripts (`start-docker.bat` / `.sh`)

### 🟡 Intermedio

Una vez cómodo con lo básico:

1. [DOCKER.md](DOCKER.md) - Guía completa
2. [DOCKER-COMMANDS.md](DOCKER-COMMANDS.md) - Comandos avanzados
3. Usa `docker-compose` directamente

### 🔴 Avanzado

Para personalización y producción:

1. [DOCKER-SETUP.md](DOCKER-SETUP.md) - Detalles técnicos
2. `docker-compose.prod.yml` - Configuración de producción
3. Modifica Dockerfiles según necesidades
4. Configura CI/CD

---

## 🔍 Encuentra lo que Necesitas

| Quiero... | Ve a... |
|-----------|---------|
| Configurar por primera vez | [DOCKER-CHECKLIST.md](DOCKER-CHECKLIST.md) |
| Inicio rápido | [README.docker.md](README.docker.md) |
| Entender todo en detalle | [DOCKER.md](DOCKER.md) |
| Resolver un problema | [DOCKER-TROUBLESHOOTING.md](DOCKER-TROUBLESHOOTING.md) |
| Ver comandos útiles | [DOCKER-COMMANDS.md](DOCKER-COMMANDS.md) |
| Configurar para producción | [DOCKER.md](DOCKER.md) + `docker-compose.prod.yml` |
| Ver qué se ha configurado | [DOCKER-SETUP.md](DOCKER-SETUP.md) |
| Cambiar configuración general | [CONFIGURACION.md](CONFIGURACION.md) |

---

## 📞 URLs de Acceso

Una vez que los servicios estén corriendo:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend Web | http://localhost | Interfaz de usuario del chatbot |
| Backend API | http://localhost:8000 | API principal |
| Documentación API | http://localhost:8000/docs | Swagger UI interactivo |
| Backend Móvil | http://localhost:8001 | API para app móvil (opcional) |

---

## ⚙️ Configuración Requerida

Antes de iniciar, necesitas:

1. **Docker Desktop** instalado y corriendo
2. **Archivo `.env`** en `Backend/` con tu `OPENROUTER_API_KEY`

Todo lo demás está automatizado.

---

## 🎯 Estructura de Archivos Docker

```
Chatbot-Total/
├── 📄 docker-compose.yml              # Orquestación principal
├── 📄 docker-compose.prod.yml         # Configuración de producción
├── 📄 .dockerignore                   # Exclusiones globales
│
├── 📂 Backend/
│   ├── Dockerfile                     # Imagen desarrollo
│   ├── Dockerfile.prod                # Imagen producción
│   ├── .dockerignore                  # Exclusiones backend
│   ├── .env.example                   # Template variables
│   └── .env                           # Variables (crear) ⚠️
│
├── 📂 Backend-Movil/
│   └── Dockerfile                     # Imagen backend móvil
│
├── 📂 chatbot-web/
│   ├── Dockerfile                     # Imagen frontend
│   ├── .dockerignore                  # Exclusiones frontend
│   └── nginx.conf                     # Config nginx
│
├── 📜 Scripts de inicio:
│   ├── verify-docker.bat / .sh        # Verificación
│   ├── start-docker.bat / .sh         # Iniciar
│   └── stop-docker.bat / .sh          # Detener
│
├── 📚 Documentación:
│   ├── DOCKER.md                      # Guía completa
│   ├── README.docker.md               # Inicio rápido
│   ├── DOCKER-CHECKLIST.md            # Lista de pasos
│   ├── DOCKER-SETUP.md                # Resumen setup
│   ├── DOCKER-COMMANDS.md             # Referencia comandos
│   ├── DOCKER-TROUBLESHOOTING.md      # Solución problemas
│   ├── DOCKER-INDEX.md                # Este archivo
│   └── CONFIGURACION.md               # Config general
│
└── 📄 Makefile                         # Comandos Make (opcional)
```

---

## 💡 Tips Rápidos

1. **Siempre empieza verificando:**
   ```bash
   docker-compose ps
   docker-compose logs -f
   ```

2. **Para refrescar todo:**
   ```bash
   docker-compose restart
   ```

3. **Para empezar de cero:**
   ```bash
   docker-compose down -v
   docker-compose build --no-cache
   docker-compose up -d
   ```

4. **Usa alias para comandos frecuentes:**
   ```bash
   alias dc='docker-compose'
   alias dclogs='docker-compose logs -f'
   ```

---

## 🆘 Ayuda Rápida

| Problema | Comando Rápido |
|----------|----------------|
| Ver si está corriendo | `docker-compose ps` |
| Ver logs | `docker-compose logs -f` |
| Reiniciar | `docker-compose restart` |
| Detener | `docker-compose down` |
| Limpiar todo | `docker-compose down -v && docker system prune -a` |

---

## ✅ Checklist de Verificación

- [ ] Docker Desktop instalado y corriendo
- [ ] `Backend/.env` creado con `OPENROUTER_API_KEY`
- [ ] `docker-compose ps` muestra servicios "Up"
- [ ] http://localhost responde
- [ ] http://localhost:8000/docs responde
- [ ] Puedes enviar mensajes en el chat

---

## 📖 Recursos Externos

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## 🎉 ¡Todo Listo!

Con toda esta documentación, deberías poder:

- ✅ Configurar el proyecto en cualquier equipo
- ✅ Desarrollar con Docker sin problemas
- ✅ Resolver problemas comunes
- ✅ Desplegar a producción
- ✅ Mantener y escalar el proyecto

**¿Por dónde empezar?** 👉 [DOCKER-CHECKLIST.md](DOCKER-CHECKLIST.md)

---

**Última actualización:** Febrero 2026
