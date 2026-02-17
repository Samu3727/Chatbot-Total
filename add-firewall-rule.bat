@echo off
REM Script para agregar regla de firewall para el backend Python
REM Ejecutar como Administrador (click derecho -> Ejecutar como administrador)

echo Agregando regla de firewall para Python Backend en puerto 8000...
netsh advfirewall firewall add rule name="Python Backend Port 8000" dir=in action=allow protocol=TCP localport=8000

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo Regla de firewall agregada exitosamente!
    echo El backend ahora puede recibir conexiones en el puerto 8000
    echo desde el emulador de Android.
    echo ================================================================
) else (
    echo.
    echo ================================================================
    echo ERROR: No se pudo agregar la regla de firewall.
    echo Asegurate de ejecutar este script como Administrador.
    echo ================================================================
)

echo.
pause
