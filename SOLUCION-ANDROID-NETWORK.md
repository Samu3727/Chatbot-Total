# Solución al Error de Conexión Android - Backend

## Problema
El emulador de Android no puede conectarse al backend en el puerto 8000.

Error: `AxiosError: Network Error` al intentar conectarse a `http://10.0.2.2:8000/api/v1/chat`

## Causa
Windows Firewall está bloqueando las conexiones entrantes al puerto 8000 desde el emulador de Android.

## Soluciones

### ✅ Solución 1: Port Forwarding con ADB (Recomendada)

Esta es la solución más simple y no requiere permisos de administrador.

1. **Asegúrate de que el emulador Android esté iniciado**
2. **Ejecuta el script de configuración:**
   ```bash
   cd chatbot-movil
   setup-android-port.bat
   ```

Este script configura `adb reverse` para redirigir el puerto 8000 del host al emulador.

3. **Reinicia la aplicación móvil** (presiona R en la terminal de Expo o recarga la app)

**Nota:** El archivo `.env` ya está configurado para usar `localhost:8000`. Solo necesitas ejecutar el script cada vez que inicies el emulador.

---

### ✅ Solución 2: Configurar Firewall de Windows

Si prefieres usar la IP `10.0.2.2` directamente (sin adb reverse):

1. **Click derecho en `add-firewall-rule.bat`** (en la raíz del proyecto)
2. **Selecciona "Ejecutar como administrador"**
3. **El script agregará una regla de firewall** para permitir conexiones entrantes en el puerto 8000

4. **Actualiza el `.env` en chatbot-movil:**
   ```env
   EXPO_PUBLIC_API_URL=http://10.0.2.2:8000
   ```

5. **Reinicia la aplicación móvil**

---

### ✅ Solución 3: Usar IP Local (Para dispositivos físicos)

Si estás probando en un dispositivo físico Android conectado a la misma red WiFi:

1. **Obtén tu IP local:**
   ```powershell
   ipconfig
   ```
   Busca tu IP en la sección "Adaptador de LAN inalámbrica Wi-Fi" (ejemplo: 192.168.1.100)

2. **Actualiza el `.env` en chatbot-movil:**
   ```env
   EXPO_PUBLIC_API_URL=http://TU_IP_LOCAL:8000
   ```

3. **Agrega la regla de firewall** (ejecuta `add-firewall-rule.bat` como administrador)

4. **Reinicia la aplicación móvil**

---

## Verificación

### Backend está corriendo
```powershell
# Verificar que el backend responda
Test-NetConnection -ComputerName localhost -Port 8000

# O probar el endpoint de salud
Invoke-WebRequest -Uri http://localhost:8000/api/v1/health -UseBasicParsing
```

### Port forwarding está configurado
```bash
adb reverse --list
# Debería mostrar: tcp:8000 -> tcp:8000
```

### Dispositivos conectados
```bash
adb devices
# Debería listar tu emulador/dispositivo
```

---

## Estado Actual

✅ Backend está corriendo en `http://0.0.0.0:8000`  
✅ Configuración del `.env` actualizada para usar IP local: `10.189.249.192:8000`  
✅ Firewall configurado (si ejecutaste `add-firewall-rule.bat` como admin)  
⏳ Para emulador: ejecuta `setup-android-port.bat` después de iniciar el emulador  

---

## Scripts Disponibles

- **`add-firewall-rule.bat`** (raíz): Agrega regla de firewall para puerto 8000 (requiere admin)
- **`chatbot-movil/setup-android-port.bat`**: Configura port forwarding con adb para emulador

---

## ⚠️ Errores Adicionales

### Error 400 Bad Request
**Causa:** Formato incorrecto del request (campo incorrecto)  
**Solución:** El backend espera `conversation_id`, no `user_id`. Este error ya está corregido en el código.

Formato correcto:
```json
{
  "message": "Tu mensaje",
  "conversation_id": "user123"
}
```

### Timeout después del primer mensaje
**Causa:** La API de OpenRouter puede tardar 20-60 segundos en responder  
**Solución:**
- Aumenta el timeout en `ChatScreen.tsx` o `AxiosChatService.tsx` de 10000 a 60000 ms
- Espera más tiempo entre mensajes
- Verifica los logs del backend para confirmar que la petición llegó

### Props.pointerEvents deprecated warning
**Causa:** `KeyboardAvoidingView` usa props deprecados en React Native Web  
**Solución:** Ya resuelto - ahora se usa condicionalmente solo en plataformas nativas (iOS/Android)


---

## Notas Adicionales

- El script `setup-android-port.bat` debe ejecutarse **cada vez que inicies el emulador**
- Si usas múltiples emuladores, cada uno necesitará su propia configuración
- Para iOS Simulator, simplemente usa `http://localhost:8000` (no requiere configuración adicional)
