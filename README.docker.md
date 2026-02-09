# 🐳 Inicio Rápido con Docker

## Pasos para ejecutar el proyecto:

### 1. Configurar variables de entorno
```bash
# En la carpeta Backend, copia el archivo de ejemplo
cd Backend
copy .env.example .env     # Windows (CMD/PowerShell)
# cp .env.example .env     # Linux/Mac
# Edita .env y agrega tu OPENROUTER_API_KEY
```

### 2. Construir las imágenes
```bash
docker-compose build
```

### 3. Iniciar los servicios
```bash
docker-compose up -d
```

### 4. Acceder a las aplicaciones
- **Frontend:** http://localhost
- **Backend API:** http://localhost:8000
- **Documentación API:** http://localhost:8000/docs

## Comandos útiles

```bash
# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reiniciar
docker-compose restart

# Ver estado
docker-compose ps
```

## Scripts Automáticos (Recomendado)

**PowerShell (Windows):**
```powershell
.\verify-docker.bat    # Verificar sistema
.\start-docker.bat     # Iniciar
.\stop-docker.bat      # Detener
```

**CMD (Windows):**
```cmd
verify-docker.bat      # Verificar sistema
start-docker.bat       # Iniciar
stop-docker.bat        # Detener
```

**Linux/Mac:**
```bash
./verify-docker.sh     # Verificar sistema
./start-docker.sh      # Iniciar
./stop-docker.sh       # Detener
```

## Con Make (opcional)

Si tienes `make` instalado:

```bash
make build      # Construir
make up         # Iniciar
make logs       # Ver logs
make down       # Detener
make health     # Verificar estado
```

📖 **Documentación completa:** Ver [DOCKER.md](DOCKER.md)
