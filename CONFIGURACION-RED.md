# 🌐 Configuración de Red para Comunicación Backend-Frontend

Esta guía explica cómo configurar correctamente la comunicación entre el Backend (FastAPI), Frontend Web (React+Vite) y App Móvil (React Native+Expo).

## 📋 Requisitos Previos

1. **Backend debe escuchar en todas las interfaces**: `0.0.0.0` (✅ Ya configurado)
2. **Frontend debe conocer la URL correcta del backend**
3. **CORS debe permitir el origen del frontend** (✅ Ya configurado)

---

## 🖥️ Backend (FastAPI)

### Configuración actual
```python
# En Backend/main.py línea 35
uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
```

**¿Por qué `0.0.0.0`?**
- `localhost` o `127.0.0.1` solo acepta conexiones de la misma máquina
- `0.0.0.0` acepta conexiones de:
  - La misma máquina (localhost)
  - Otros dispositivos en la red (móviles, tablets)
  - Emuladores Android (que necesitan 10.0.2.2)

### Iniciar el backend
```bash
cd Backend
python main.py
```

Deberías ver: `Uvicorn running on http://0.0.0.0:8000`

---

## 🌐 Frontend Web (React + Vite)

### Archivo de configuración
**Ubicación:** `chatbot-web/.env`

```env
VITE_API_BASE_URL=http://localhost:8000
```

### ¿Cuándo usar qué URL?

| Escenario | URL | Razón |
|-----------|-----|-------|
| Desarrollo local | `http://localhost:8000` | Web y Backend en la misma máquina |
| Producción | `https://tu-dominio.com` | Dominio público del backend |

### Aplicar cambios
```bash
cd chatbot-web
npm run dev
```

**Nota:** Vite requiere reiniciar el servidor de desarrollo cuando cambias variables de entorno.

---

## 📱 App Móvil (React Native + Expo)

### Archivo de configuración
**Ubicación:** `chatbot-movil/.env`

### ¿Cuándo usar qué URL?

| Escenario | URL | Explicación |
|-----------|-----|-------------|
| **Emulador Android** | `http://10.0.2.2:8000` O `http://localhost:8000` | IP especial que mapea a localhost del host. Con `adb reverse` usa localhost |
| **Dispositivo Físico** | `http://10.189.249.192:8000` | IP local de tu PC en la red WiFi (requiere firewall configurado) |
| **iOS Simulator** | `http://localhost:8000` | Localhost funciona en iOS |
| **Expo Tunnel** | `https://xxx.ngrok.io` | Para probar sin estar en misma red |

### Configuración para Emulador Android (Actual)

**Opción 1: Con adb reverse (Recomendada)**
```bash
# Ejecutar después de iniciar el emulador
.\setup-android-port.bat
```

Luego en `.env`:
```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

**Opción 2: Sin adb reverse**
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8000
```

### Cómo obtener tu IP local (para dispositivos físicos)

**Windows:**
```bash
ipconfig
```
Busca: "Adaptador de LAN inalámbrica" → "Dirección IPv4" (ej: 10.189.249.192)

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```

### Aplicar cambios
```bash
cd chatbot-movil
npx expo start --clear
```

**IMPORTANTE:** Siempre usa `--clear` cuando cambies variables de entorno para limpiar la caché.

---

## 🔍 Diagnóstico de Problemas

### ✅ Checklist de verificación

1. **Backend corriendo**
   ```bash
   curl http://localhost:8000/api/v1/health
   ```
   Debe responder: `{"status":"ok"}`

2. **Variables de entorno correctas**
   - Frontend Web: `VITE_API_BASE_URL`
   - App Móvil: `EXPO_PUBLIC_API_URL`

3. **Misma red WiFi** (para dispositivos físicos)
   - PC y móvil conectados a la misma red
   - Firewall no bloquea el puerto 8000

4. **Servidor reiniciado después de cambios**
   - Backend: Reinicia `python main.py`
   - Web: Reinicia `npm run dev`
   - Móvil: Reinicia con `--clear`

### 🚫 Errores comunes

#### "Network Error" en móvil
**Causa:** URL incorrecta o backend no accesible
**Solución:**
1. Verifica que el backend esté corriendo en `0.0.0.0:8000`
2. **Para emulador Android:**
   - Opción A: Usa `setup-android-port.bat` + `localhost:8000`
   - Opción B: Usa `10.0.2.2:8000`
3. **Para dispositivo físico:**
   - Ejecuta `add-firewall-rule.bat` como administrador
   - Usa tu IP local (ej: `10.189.249.192:8000`)
   - Asegúrate de estar en la misma WiFi
4. Reinicia Expo con `--clear`
5. **Ver guía detallada:** [SOLUCION-ANDROID-NETWORK.md](../SOLUCION-ANDROID-NETWORK.md)

#### "CORS policy" en web
**Causa:** Backend no permite el origen del frontend
**Solución:** Ya está configurado en `Backend/main.py` líneas 14-24

#### "Error 400 Bad Request"
**Causa:** Formato incorrecto del request
**Solución:** El backend espera `conversation_id` (no `user_id`):
```json
{
  "message": "Tu mensaje",
  "conversation_id": "user123"
}
```

#### "Timeout" errors
**Causa:** La API de OpenRouter tarda mucho en responder
**Solución:**
- Aumenta el timeout a 60000 ms (60 segundos)
- Espera más tiempo entre mensajes
- Verifica los logs del backend

#### "Props.pointerEvents deprecated" warning
**Causa:** `KeyboardAvoidingView` usa props deprecados en React Native Web
**Solución:** Ya resuelto - ahora se usa condicionalmente solo en plataformas nativas

---

## 🎯 Resumen de URLs

```
┌─────────────────────┐
│  Backend FastAPI    │ → Escucha en: 0.0.0.0:8000
│  (Python)           │   (Acepta de todos)
└─────────────────────┘
          ↑
          │
    ┌─────┴─────┬──────────────┬────────────────┐
    │           │              │                │
┌───┴────┐  ┌───┴────┐   ┌────┴────┐   ┌──────┴──────┐
│Web     │  │Android │   │Android  │   │iOS          │
│Browser │  │Emulator│   │Physical │   │Simulator    │
│        │  │        │   │Device   │   │             │
│:5173   │  │        │   │         │   │             │
└────────┘  └────────┘   └─────────┘   └─────────────┘
   ↓            ↓             ↓              ↓
localhost:8000  10.0.2.2:8000  192.168.X.X:8000  localhost:8000
```

---

## 🔒 Seguridad en Producción

**IMPORTANTE:** La configuración actual es para **desarrollo**.

En producción:
- ❌ No usar `allow_origins=["*"]`
- ✅ Especificar dominios exactos
- ✅ Usar HTTPS
- ✅ Variables de entorno diferentes

```python
# Producción
allow_origins=[
    "https://mi-app.com",
    "https://www.mi-app.com"
]
```
