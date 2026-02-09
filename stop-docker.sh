#!/bin/bash

echo "===================================="
echo " Deteniendo servicios Docker"
echo "===================================="
echo ""

docker-compose down

if [ $? -ne 0 ]; then
    echo "[ERROR] Ocurrió un problema al detener los servicios"
    exit 1
fi

echo ""
echo "[OK] Servicios detenidos correctamente"
echo ""
