@echo off
echo ====================================
echo  Chatbot-Total - Inicio con Docker
echo ====================================
echo.

REM Verificar si Docker está corriendo
docker info > nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker no esta corriendo.
    echo Por favor, inicia Docker Desktop y vuelve a intentar.
    pause
    exit /b 1
)

echo [OK] Docker esta corriendo
echo.

REM Verificar si existe el archivo .env
if not exist "Backend\.env" (
    echo [AVISO] No se encontro el archivo Backend\.env
    echo Creando desde .env.example...
    copy "Backend\.env.example" "Backend\.env"
    echo.
    echo [IMPORTANTE] Edita Backend\.env y agrega tu OPENROUTER_API_KEY
    echo Presiona cualquier tecla cuando hayas configurado la API key...
    pause > nul
)

echo [1] Construyendo imagenes Docker...
echo.
docker-compose build

if errorlevel 1 (
    echo [ERROR] Fallo la construccion de imagenes
    pause
    exit /b 1
)

echo.
echo [2] Iniciando servicios...
echo.
docker-compose up -d

if errorlevel 1 (
    echo [ERROR] Fallo el inicio de servicios
    pause
    exit /b 1
)

echo.
echo ====================================
echo  Servicios iniciados correctamente!
echo ====================================
echo.
echo Frontend Web:  http://localhost
echo Backend API:   http://localhost:8000
echo API Docs:      http://localhost:8000/docs
echo.
echo Para ver logs: docker-compose logs -f
echo Para detener:  docker-compose down
echo.
echo Presiona cualquier tecla para ver los logs...
pause > nul

docker-compose logs -f
