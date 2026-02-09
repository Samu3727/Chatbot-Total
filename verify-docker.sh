#!/bin/bash

echo "===================================="
echo " Verificando instalación Docker"
echo "===================================="
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

success=0

echo "[1/5] Verificando Docker..."
if command -v docker &> /dev/null; then
    docker --version
    echo -e "${GREEN}[OK]${NC} Docker instalado"
else
    echo -e "${RED}[X]${NC} Docker NO está instalado"
    echo "Descarga Docker desde: https://www.docker.com/products/docker-desktop"
    success=1
fi
echo ""

echo "[2/5] Verificando Docker Compose..."
if command -v docker-compose &> /dev/null; then
    docker-compose --version
    echo -e "${GREEN}[OK]${NC} Docker Compose instalado"
else
    echo -e "${RED}[X]${NC} Docker Compose NO está instalado"
    success=1
fi
echo ""

echo "[3/5] Verificando que Docker esté corriendo..."
if docker info > /dev/null 2>&1; then
    echo -e "${GREEN}[OK]${NC} Docker está corriendo"
else
    echo -e "${RED}[X]${NC} Docker NO está corriendo"
    echo "Por favor inicia Docker Desktop"
    success=1
fi
echo ""

echo "[4/5] Verificando archivo .env..."
if [ ! -f "Backend/.env" ]; then
    echo -e "${YELLOW}[!]${NC} Archivo Backend/.env no encontrado"
    echo "Creando desde .env.example..."
    cp "Backend/.env.example" "Backend/.env"
    echo -e "${YELLOW}[!]${NC} IMPORTANTE: Edita Backend/.env y configura tu OPENROUTER_API_KEY"
else
    echo -e "${GREEN}[OK]${NC} Archivo .env existe"
fi
echo ""

echo "[5/5] Verificando puertos..."
if lsof -Pi :80 -sTCP:LISTEN -t >/dev/null 2>&1 || netstat -an 2>/dev/null | grep ":80 " | grep LISTEN >/dev/null; then
    echo -e "${YELLOW}[!]${NC} AVISO: Puerto 80 ya está en uso"
    echo "Considera cambiar el puerto en docker-compose.yml"
else
    echo -e "${GREEN}[OK]${NC} Puerto 80 disponible"
fi

if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1 || netstat -an 2>/dev/null | grep ":8000 " | grep LISTEN >/dev/null; then
    echo -e "${YELLOW}[!]${NC} AVISO: Puerto 8000 ya está en uso"
    echo "Considera cambiar el puerto en docker-compose.yml"
else
    echo -e "${GREEN}[OK]${NC} Puerto 8000 disponible"
fi
echo ""

if [ $success -eq 0 ]; then
    echo "===================================="
    echo " Verificación completa!"
    echo "===================================="
    echo ""
    echo "Tu sistema está listo para ejecutar el proyecto con Docker."
    echo ""
    echo "Próximos pasos:"
    echo "1. Edita Backend/.env con tu OPENROUTER_API_KEY"
    echo "2. Ejecuta: ./start-docker.sh"
    echo ""
else
    echo "===================================="
    echo " Hay problemas que resolver"
    echo "===================================="
    echo "Por favor corrige los errores indicados arriba."
    echo ""
    exit 1
fi
