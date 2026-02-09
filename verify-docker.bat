@echo off
echo ====================================
echo  Verificando instalacion Docker
echo ====================================
echo.

echo [1/5] Verificando Docker...
docker --version > nul 2>&1
if errorlevel 1 (
    echo [X] Docker NO esta instalado
    echo Descarga Docker Desktop desde: https://www.docker.com/products/docker-desktop
    goto :error
) else (
    docker --version
    echo [OK] Docker instalado
)
echo.

echo [2/5] Verificando Docker Compose...
docker-compose --version > nul 2>&1
if errorlevel 1 (
    echo [X] Docker Compose NO esta instalado
    goto :error
) else (
    docker-compose --version
    echo [OK] Docker Compose instalado
)
echo.

echo [3/5] Verificando que Docker este corriendo...
docker info > nul 2>&1
if errorlevel 1 (
    echo [X] Docker NO esta corriendo
    echo Por favor inicia Docker Desktop
    goto :error
) else (
    echo [OK] Docker esta corriendo
)
echo.

echo [4/5] Verificando archivo .env...
if not exist "Backend\.env" (
    echo [!] Archivo Backend\.env no encontrado
    echo Creando desde .env.example...
    copy "Backend\.env.example" "Backend\.env"
    echo [!] IMPORTANTE: Edita Backend\.env y configura tu OPENROUTER_API_KEY
) else (
    echo [OK] Archivo .env existe
)
echo.

echo [5/5] Verificando puertos...
netstat -ano | findstr ":80 " > nul
if not errorlevel 1 (
    echo [!] AVISO: Puerto 80 ya esta en uso
    echo Considera cambiar el puerto en docker-compose.yml
) else (
    echo [OK] Puerto 80 disponible
)

netstat -ano | findstr ":8000 " > nul
if not errorlevel 1 (
    echo [!] AVISO: Puerto 8000 ya esta en uso
    echo Considera cambiar el puerto en docker-compose.yml
) else (
    echo [OK] Puerto 8000 disponible
)
echo.

echo ====================================
echo  Verificacion completa!
echo ====================================
echo.
echo Tu sistema esta listo para ejecutar el proyecto con Docker.
echo.
echo Proximos pasos:
echo 1. Edita Backend\.env con tu OPENROUTER_API_KEY
echo 2. Ejecuta: start-docker.bat
echo.
goto :end

:error
echo.
echo ====================================
echo  Hay problemas que resolver
echo ====================================
echo Por favor corrige los errores indicados arriba.
echo.

:end
pause
