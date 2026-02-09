# 📘 Nota Importante para Usuarios de PowerShell

## ⚠️ Diferencia entre PowerShell y CMD en Windows

### PowerShell (Terminal por defecto en VS Code)

En **PowerShell**, por seguridad, debes usar `.\` antes del nombre del script:

```powershell
.\verify-docker.bat    # ✅ Correcto
.\start-docker.bat     # ✅ Correcto
.\stop-docker.bat      # ✅ Correcto

verify-docker.bat      # ❌ No funciona en PowerShell
```

### CMD (Símbolo del sistema tradicional)

En **CMD**, puedes ejecutar directamente:

```cmd
verify-docker.bat      # ✅ Correcto
start-docker.bat       # ✅ Correcto
stop-docker.bat        # ✅ Correcto
```

## 🔍 ¿Cómo saber qué terminal estoy usando?

### PowerShell
El prompt muestra algo como:
```
PS C:\xd\copia\Chatbot-Total>
```
La `PS` al inicio indica **PowerShell**

### CMD
El prompt muestra algo como:
```
C:\xd\copia\Chatbot-Total>
```
Sin el `PS` al inicio es **CMD**

## 🚀 Inicio Rápido

Ya que estás en **PowerShell**, ejecuta:

```powershell
# 1. Verificar que Docker esté listo
.\verify-docker.bat

# 2. Iniciar el proyecto
.\start-docker.bat

# 3. Cuando termines, detener
.\stop-docker.bat
```

## 💡 Alternativa: Cambiar a CMD

Si prefieres usar CMD:

1. Abre una nueva terminal en VS Code:
   - Presiona `` Ctrl+` `` (Ctrl + tilde)
   - Click en el `+` con la flecha hacia abajo
   - Selecciona "Command Prompt"

2. Luego puedes usar los comandos sin `.\`:
   ```cmd
   verify-docker.bat
   start-docker.bat
   ```

## 🐳 Usando Docker Compose Directamente

Alternativamente, puedes usar los comandos de Docker Compose directamente, que funcionan igual en PowerShell y CMD:

```powershell
# Construir
docker-compose build

# Iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

## 📚 Resumen de Comandos

| Acción | PowerShell | CMD | Docker Compose |
|--------|-----------|-----|----------------|
| Verificar | `.\verify-docker.bat` | `verify-docker.bat` | N/A |
| Iniciar | `.\start-docker.bat` | `start-docker.bat` | `docker-compose up -d` |
| Ver logs | (incorporado en script) | (incorporado en script) | `docker-compose logs -f` |
| Detener | `.\stop-docker.bat` | `stop-docker.bat` | `docker-compose down` |
| Ver estado | `docker-compose ps` | `docker-compose ps` | `docker-compose ps` |

---

**Recomendación:** Si trabajas principalmente en PowerShell, acostúmbrate a usar `.\` antes de los scripts `.bat` o usa directamente los comandos `docker-compose`.
