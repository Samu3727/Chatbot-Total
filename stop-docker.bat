@echo off
echo ====================================
echo  Deteniendo servicios Docker
echo ====================================
echo.

docker-compose down

if errorlevel 1 (
    echo [ERROR] Ocurrio un problema al detener los servicios
    pause
    exit /b 1
)

echo.
echo [OK] Servicios detenidos correctamente
echo.
pause
