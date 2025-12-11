# Sistema de Reservas Harry Barber

Sistema de reservas en línea para Harry Barber con sincronización en tiempo real mediante Firebase.

## Características

- Calendario interactivo para reservar citas
- Sincronización en tiempo real entre dispositivos
- Registro y gestión de perfiles de clientes
- Integración con WhatsApp para confirmación de reservas
- Diseño responsive (móvil y escritorio)

## Tecnologías

- HTML5, CSS3, JavaScript (Vanilla)
- Firebase Realtime Database
- API de WhatsApp
- LocalStorage (fallback offline)

## Despliegue en Vercel

### Método 1: Desde GitHub (Recomendado)

1. Sube tu código a un repositorio de GitHub
2. Ingresa a [vercel.com](https://vercel.com) y crea una cuenta
3. Haz clic en "New Project"
4. Selecciona tu repositorio
5. Configura las opciones de despliegue:
   - Framework Preset: Other
   - Root Directory: /
6. Haz clic en "Deploy"

### Método 2: Usando Vercel CLI

1. Instala Vercel CLI globalmente:
   ```bash
   npm install -g vercel
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd CitasHarryBarber
   ```

3. Inicia sesión en Vercel:
   ```bash
   vercel login
   ```

4. Despliega el proyecto:
   ```bash
   vercel
   ```

5. Para despliegues posteriores:
   ```bash
   vercel --prod
   ```

## Estructura del Proyecto

```
├── pages/
│   ├── appointments/
│   │   └── calendariov3.html    # Calendario principal
│   ├── dashboard/
│   │   └── panel-barbero.html   # Panel de administración
│   ├── history/
│   │   └── historial.html       # Historial de reservas
│   ├── services/
│   │   └── promo-semanal.html   # Promociones
│   └── settings/
│       ├── perfil.html          # Perfil de usuario
│       └── configuraciones.html # Configuraciones
├── src/
│   ├── database/
│   │   └── firebase-db.js       # Módulo de base de datos Firebase
│   └── firebase/
│       └── firebase-config.js   # Configuración de Firebase
├── styles/
│   ├── components/
│   ├── css/
│   └── images/
├── scripts/
│   └── js/
└── index.html                   # Página de inicio
```

## Configuración de Firebase

El sistema utiliza Firebase Realtime Database para la sincronización en tiempo real. Las credenciales están configuradas en `src/firebase/firebase-config.js`.

## Desarrollo Local

Para ejecutar el proyecto localmente:

```bash
npm install
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

## Contribuidores

- Desarrollo y mantenimiento del sistema

## Licencia

MIT