#!/bin/bash

echo "===================================="
echo " Chatbot-Total - Inicio con Docker"
echo "===================================="
echo ""

# Verificar si Docker está corriendo
if ! docker info > /dev/null 2>&1; then
    echo "[ERROR] Docker no está corriendo."
    echo "Por favor, inicia Docker Desktop y vuelve a intentar."
    exit 1
fi

echo "[OK] Docker está corriendo"
echo ""

# Verificar si existe el archivo .env
if [ ! -f "Backend/.env" ]; then
    echo "[AVISO] No se encontró el archivo Backend/.env"
    echo "Creando desde .env.example..."
    cp "Backend/.env.example" "Backend/.env"
    echo ""
    echo "[IMPORTANTE] Edita Backend/.env y agrega tu OPENROUTER_API_KEY"
    echo "Presiona Enter cuando hayas configurado la API key..."
    read
fi

echo "[1] Construyendo imágenes Docker..."
echo ""
docker-compose build

if [ $? -ne 0 ]; then
    echo "[ERROR] Falló la construcción de imágenes"
    exit 1
fi

echo ""
echo "[2] Iniciando servicios..."
echo ""
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "[ERROR] Falló el inicio de servicios"
    exit 1
fi

echo ""
echo "===================================="
echo " Servicios iniciados correctamente!"
echo "===================================="
echo ""
echo "Frontend Web:  http://localhost"
echo "Backend API:   http://localhost:8000"
echo "API Docs:      http://localhost:8000/docs"
echo ""
echo "Para ver logs: docker-compose logs -f"
echo "Para detener:  docker-compose down"
echo ""
echo "Presiona Ctrl+C para salir de los logs"
echo ""

# Mostrar logs
docker-compose logs -f
