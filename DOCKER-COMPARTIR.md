# 🚀 Cómo Compartir/Distribuir tu Proyecto Docker

Guía completa para enviar, compartir o desplegar tu proyecto dockerizado.

---

## 📦 Opción 1: Compartir Código (Recomendado para Desarrollo)

### A través de Git/GitHub

Esta es la forma **más común y recomendada**:

#### Preparar el repositorio

```bash
# 1. Asegúrate de que .env NO esté en Git (ya está en .gitignore)
git status

# 2. Agregar todos los archivos Docker
git add docker-compose.yml
git add Backend/Dockerfile
git add chatbot-web/Dockerfile
git add *.sh *.bat
git add DOCKER*.md README.docker.md

# 3. Commit
git commit -m "feat: Agregar configuración Docker completa"

# 4. Push al repositorio
git push origin Laboratory
```

#### Otra persona usa el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/Samu3727/Chatbot-Total.git
cd Chatbot-Total

# 2. Configurar variables de entorno
cd Backend
copy .env.example .env    # Windows
# Editar .env con su API key

# 3. Iniciar con Docker
cd ..
.\start-docker.bat        # PowerShell
# o
docker-compose up -d
```

**Ventajas:**
- ✅ Tamaño pequeño (solo código)
- ✅ Fácil de actualizar
- ✅ Control de versiones
- ✅ Cada persona construye sus propias imágenes

**Desventajas:**
- ❌ Requiere Docker instalado
- ❌ Primera construcción toma tiempo

---

## 🐋 Opción 2: Compartir Imágenes Docker

### A. Docker Hub (Público/Privado)

Ideal para compartir imágenes ya construidas.

#### Subir a Docker Hub

```bash
# 1. Crear cuenta en https://hub.docker.com/

# 2. Login en Docker
docker login

# 3. Etiquetar imágenes con tu usuario
docker tag chatbot-total-backend tu-usuario/chatbot-backend:latest
docker tag chatbot-total-frontend tu-usuario/chatbot-frontend:latest

# 4. Subir imágenes
docker push tu-usuario/chatbot-backend:latest
docker push tu-usuario/chatbot-frontend:latest
```

#### Otra persona descarga y usa

```bash
# 1. Descargar imágenes
docker pull tu-usuario/chatbot-backend:latest
docker pull tu-usuario/chatbot-frontend:latest

# 2. Modificar docker-compose.yml para usar las imágenes:
# Cambiar "build:" por "image:"
services:
  backend:
    image: tu-usuario/chatbot-backend:latest
    # ... resto de configuración

# 3. Iniciar
docker-compose up -d
```

**Ventajas:**
- ✅ No necesita construir imágenes
- ✅ Inicio rápido
- ✅ Puede ser privado (con cuenta de pago)

**Desventajas:**
- ❌ Imágenes grandes (cientos de MB)
- ❌ Puede exponer tu código si es público
- ❌ Subida lenta la primera vez

---

### B. GitHub Container Registry (GHCR)

Alternativa a Docker Hub integrada con GitHub.

```bash
# 1. Login en GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u Samu3727 --password-stdin

# 2. Etiquetar
docker tag chatbot-total-backend ghcr.io/samu3727/chatbot-backend:latest
docker tag chatbot-total-frontend ghcr.io/samu3727/chatbot-frontend:latest

# 3. Subir
docker push ghcr.io/samu3727/chatbot-backend:latest
docker push ghcr.io/samu3727/chatbot-frontend:latest
```

---

### C. Guardar Imágenes a Archivos

Para compartir sin internet (USB, correo, etc.).

```bash
# 1. Guardar imágenes a archivos .tar
docker save chatbot-total-backend > backend-image.tar
docker save chatbot-total-frontend > frontend-image.tar

# 2. Comprimir (opcional)
tar -czf docker-images.tar.gz backend-image.tar frontend-image.tar

# 3. Compartir archivos (USB, Drive, etc.)
```

#### Otra persona carga las imágenes

```bash
# 1. Cargar imágenes
docker load < backend-image.tar
docker load < frontend-image.tar

# 2. Copiar docker-compose.yml y configurar .env

# 3. Iniciar
docker-compose up -d
```

**Ventajas:**
- ✅ Funciona sin internet
- ✅ Control total de distribución

**Desventajas:**
- ❌ Archivos muy grandes (500MB - 2GB)
- ❌ Difícil de actualizar

---

## ☁️ Opción 3: Desplegar en Servidor/Cloud

### A. Servidor Propio (VPS, Droplet, etc.)

```bash
# 1. Copiar proyecto al servidor
scp -r Chatbot-Total usuario@servidor:/home/usuario/

# 2. SSH al servidor
ssh usuario@servidor

# 3. En el servidor
cd /home/usuario/Chatbot-Total
cp Backend/.env.example Backend/.env
nano Backend/.env  # Configurar API key

# 4. Iniciar
docker-compose up -d

# 5. Configurar firewall/nginx para acceso público si es necesario
```

---

### B. Railway.app

Despliegue automático desde GitHub.

1. Conectar repositorio de GitHub a Railway
2. Railway detecta docker-compose.yml automáticamente
3. Configurar variables de entorno en Railway
4. Deploy automático

**URL:** https://railway.app/

---

### C. Render.com

Similar a Railway, con plan gratuito.

1. Crear cuenta en Render.com
2. "New Web Service" desde GitHub
3. Render construye desde Dockerfile
4. Configurar variables de entorno
5. Deploy automático

**URL:** https://render.com/

---

### D. AWS/Azure/Google Cloud

Para producción profesional:

**AWS ECS/Fargate:**
```bash
# 1. Subir imágenes a ECR
aws ecr create-repository --repository-name chatbot-backend
docker push aws-account-id.dkr.ecr.region.amazonaws.com/chatbot-backend

# 2. Crear tarea ECS con las imágenes
# 3. Configurar load balancer
```

**Azure Container Instances:**
```bash
az container create --resource-group mygroup \
  --name chatbot \
  --image your-image \
  --dns-name-label chatbot-unique
```

---

## 📋 Comparación Rápida

| Método | Dificultad | Costo | Velocidad | Uso |
|--------|-----------|-------|-----------|-----|
| Git/GitHub | 🟢 Fácil | Gratis | Media | Desarrollo |
| Docker Hub | 🟡 Media | Gratis (público) | Rápida | Compartir imágenes |
| Archivos .tar | 🟢 Fácil | Gratis | Lenta | Sin internet |
| Railway/Render | 🟢 Fácil | Gratis/Pago | Rápida | Producción simple |
| AWS/Azure/GCP | 🔴 Difícil | Pago | Rápida | Producción enterprise |
| VPS propio | 🟡 Media | Pago | Media | Control total |

---

## 🎯 Recomendaciones según Caso de Uso

### Caso 1: Compartir con Compañeros de Equipo
**Solución:** Git/GitHub
```bash
git push
# Ellos hacen: git pull && docker-compose up -d
```

### Caso 2: Cliente que Solo Quiere Probarlo
**Solución:** Docker Hub + docker-compose.yml simplificado
```yaml
services:
  backend:
    image: tu-usuario/chatbot-backend:latest
    # ...
  frontend:
    image: tu-usuario/chatbot-frontend:latest
    # ...
```

### Caso 3: Presentación sin Internet
**Solución:** Imágenes en USB
```bash
docker save chatbot-total-backend chatbot-total-frontend > proyecto-completo.tar
```

### Caso 4: Poner en Producción
**Solución:** Railway/Render (fácil) o AWS (profesional)

---

## 📝 Archivo docker-compose-compartir.yml

Para facilitar el uso a otras personas, crea este archivo:

```yaml
version: '3.8'

# Usar este archivo si tienes las imágenes pre-construidas
# Ejecutar: docker-compose -f docker-compose-compartir.yml up -d

services:
  backend:
    image: tu-usuario/chatbot-backend:latest
    container_name: chatbot-backend
    ports:
      - "8000:8000"
    environment:
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    env_file:
      - ./Backend/.env
    restart: unless-stopped
    networks:
      - chatbot-network

  frontend:
    image: tu-usuario/chatbot-frontend:latest
    container_name: chatbot-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
    networks:
      - chatbot-network

networks:
  chatbot-network:
    driver: bridge
```

---

## 🔐 Importante: Seguridad

### ⚠️ NUNCA compartas:
- ❌ Archivos `.env` con API keys
- ❌ Secrets o credenciales
- ❌ Tokens de acceso

### ✅ SIEMPRE:
- ✅ Usa `.env.example` sin valores reales
- ✅ Agrega `.env` a `.gitignore`
- ✅ Documenta qué variables se necesitan
- ✅ Usa variables de entorno en producción

---

## 📚 Documentación para Incluir

Cuando compartas, incluye:

1. **README.md** con instrucciones claras
2. **.env.example** con todas las variables necesarias
3. **docker-compose.yml** listo para usar
4. **Scripts de inicio** (.bat/.sh)
5. **DOCKER.md** con documentación completa

---

## 🚀 Script de Publicación Automatizado

Crea `publish-docker.sh`:

```bash
#!/bin/bash

echo "🚀 Publicando imágenes Docker..."

# Variables
USERNAME="tu-usuario"
VERSION="1.0.0"

# Login
docker login

# Construir con tags
docker build -t $USERNAME/chatbot-backend:$VERSION -t $USERNAME/chatbot-backend:latest ./Backend
docker build -t $USERNAME/chatbot-frontend:$VERSION -t $USERNAME/chatbot-frontend:latest ./chatbot-web

# Subir
docker push $USERNAME/chatbot-backend:$VERSION
docker push $USERNAME/chatbot-backend:latest
docker push $USERNAME/chatbot-frontend:$VERSION
docker push $USERNAME/chatbot-frontend:latest

echo "✅ Imágenes publicadas"
echo "📝 Actualiza docker-compose.yml para usar: image: $USERNAME/chatbot-backend:latest"
```

---

## ✅ Checklist de Compartir

Antes de compartir, verifica:

- [ ] `.env` está en `.gitignore`
- [ ] `.env.example` está actualizado
- [ ] README.md tiene instrucciones claras
- [ ] docker-compose.yml funciona correctamente
- [ ] Scripts de inicio funcionan (.bat/.sh)
- [ ] Documentación está actualizada
- [ ] Has probado desde cero en otra máquina (si es posible)

---

## 💡 Tip Final

La forma **más fácil** de compartir para desarrollo es:

```bash
# 1. Subir a GitHub
git add .
git commit -m "Docker setup completo"
git push

# 2. Compartir el enlace del repo
# https://github.com/Samu3727/Chatbot-Total

# 3. Instrucciones simples:
# - git clone https://github.com/Samu3727/Chatbot-Total
# - cd Chatbot-Total
# - Configurar Backend/.env
# - .\start-docker.bat
```

**Eso es todo. Simple y efectivo.** ✨

---

**Última actualización:** Febrero 2026
