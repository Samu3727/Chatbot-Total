@echo off
REM Script para configurar port forwarding con ADB para el emulador Android
REM Esto permite que el emulador acceda al backend en localhost:8000

echo Esperando a que el emulador este listo...
adb wait-for-device

echo Configurando port forwarding...
adb reverse tcp:8000 tcp:8000

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo Port forwarding configurado exitosamente!
    echo El emulador ahora puede acceder a localhost:8000
    echo ================================================================
) else (
    echo.
    echo ================================================================
    echo ERROR: No se pudo configurar port forwarding.
    echo Asegurate de que el emulador este iniciado.
    echo ================================================================
)

echo.
pause
