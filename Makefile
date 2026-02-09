# Comandos rápidos de Docker para Chatbot-Total

# Construir todos los servicios
build:
	docker-compose build

# Construir sin caché
build-no-cache:
	docker-compose build --no-cache

# Iniciar todos los servicios
up:
	docker-compose up -d

# Iniciar y ver logs
up-logs:
	docker-compose up

# Detener todos los servicios
down:
	docker-compose down

# Detener y eliminar volúmenes
down-all:
	docker-compose down -v

# Ver logs de todos los servicios
logs:
	docker-compose logs -f

# Ver logs del backend
logs-backend:
	docker-compose logs -f backend

# Ver logs del frontend
logs-frontend:
	docker-compose logs -f frontend

# Reiniciar todos los servicios
restart:
	docker-compose restart

# Ver estado de contenedores
ps:
	docker-compose ps

# Acceder al shell del backend
shell-backend:
	docker-compose exec backend bash

# Ejecutar tests del backend
test-backend:
	docker-compose exec backend pytest

# Limpiar todo Docker
clean:
	docker-compose down -v
	docker system prune -f

# Reconstruir y reiniciar
rebuild:
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d

# Levantar con backend móvil
up-full:
	docker-compose --profile full up -d

# Ver salud del sistema
health:
	@echo "Verificando estado de los servicios..."
	@curl -s http://localhost:8000/health || echo "Backend no responde"
	@curl -s http://localhost/ -o /dev/null && echo "Frontend OK" || echo "Frontend no responde"

.PHONY: build build-no-cache up up-logs down down-all logs logs-backend logs-frontend restart ps shell-backend test-backend clean rebuild up-full health
