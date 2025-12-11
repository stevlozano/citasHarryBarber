# Instrucciones de Uso - Sistema de Reservas Harry Barber

## Descripción del Sistema

Sistema de reservas en línea para Harry Barber con sincronización en tiempo real mediante Firebase. Permite a los clientes reservar citas y al barbero gestionarlas desde diferentes dispositivos.

## Estructura del Proyecto

```
├── pages/
│   ├── appointments/
│   │   ├── calendariov3.html    # Calendario principal
│   │   ├── registro.html        # Registro de clientes
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
├── index.html                   # Página de inicio
└── vercel.json                 # Configuración para Vercel
```

## Flujo de Uso del Sistema

### 1. Acceso al Sistema
1. Abrir `index.html` en un navegador web
2. Hacer clic en "Ir al Calendario de Reservas"

### 2. Registro de Cliente (Primera vez)
1. El sistema redirige automáticamente a `registro.html`
2. Completar nombre y correo electrónico
3. Hacer clic en "Registrar y Continuar"

### 3. Reservar Cita
1. Seleccionar una fecha en el calendario haciendo clic en el día
2. Completar el formulario de reserva:
   - Nombre completo (precargado)
   - Número de WhatsApp
   - Tipo de corte
   - Tipo de pago
   - Hora disponible
3. Confirmar reserva
4. El sistema:
   - Guarda la reserva en Firebase (nube)
   - Guarda copia de seguridad en localStorage
   - Abre WhatsApp Web con mensaje preescrito para el barbero

### 4. Gestión de Reservas
- Visualizar todas las reservas en la sección inferior
- Filtrar reservas por período (todas, año, mes, semana, día)
- Enviar recordatorio al barbero desde cualquier reserva
- Cancelar reservas existentes

### 5. Perfil de Usuario
1. Acceder desde el menú superior → "Mi Perfil"
2. Editar información personal
3. Visualizar estadísticas de reservas

## Características Técnicas

### 1. Todas las reservas se almacenan en Firebase (nube)
- Sincronización en tiempo real entre dispositivos
- Acceso desde cualquier navegador con conexión
- Persistencia de datos garantizada

### 2. Fallback inteligente a localStorage
- Sistema funcional sin conexión a internet
- Sincronización automática al restablecer conexión
- Experiencia de usuario consistente

### 3. Integración con WhatsApp
- Envío automático de confirmación al barbero
- Boleta de venta incluida en el mensaje
- Enlaces directos a WhatsApp Web/App

## Despliegue en Vercel

### Requisitos Previos
- Cuenta en [vercel.com](https://vercel.com)
- Git instalado (opcional, para despliegue continuo)

### Método 1: Desde GitHub (Recomendado)
1. Subir el código a un repositorio de GitHub
2. Ingresar a Vercel y crear un nuevo proyecto
3. Seleccionar el repositorio
4. Configurar:
   - Framework Preset: Other
   - Root Directory: /
5. Hacer clic en "Deploy"

### Método 2: Usando Vercel CLI
1. Instalar Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navegar al directorio del proyecto:
   ```bash
   cd CitasHarryBarber
   ```

3. Iniciar sesión:
   ```bash
   vercel login
   ```

4. Desplegar:
   ```bash
   vercel
   ```

5. Para actualizaciones:
   ```bash
   vercel --prod
   ```

## Copia de Seguridad Local

Los datos se almacenan automáticamente en Firebase. Para backup local:

1. Abrir DevTools del navegador (F12)
2. Ir a la pestaña "Application" (Chrome) o "Almacenamiento" (Firefox)
3. En "Local Storage", exportar los datos de las claves:
   - `reserva_harry_barber_v1` (reservas)
   - `clienteRegistrado` (datos del cliente)

## Solución de Problemas

### Problema: Las fechas no se visualizan
- Verificar conexión a internet
- Recargar la página (F5)
- Limpiar caché del navegador

### Problema: Los cambios no se sincronizan con otros dispositivos
- Verificar conexión a Firebase en la consola del navegador
- Asegurarse de que ambos dispositivos usen el mismo enlace
- Verificar que la hora del sistema sea correcta

### Problema: WhatsApp no se abre
- Verificar que WhatsApp esté instalado
- Probar con WhatsApp Web en el mismo navegador

## Mantenimiento

### Actualización de Tipos de Corte
1. Editar la función `loadTiposCorte()` en `calendariov3.html`
2. Modificar los tipos de corte predeterminados
3. Los cambios afectan a nuevos formularios

### Personalización de Diseño
- Colores: Modificar variables CSS en `:root`
- Fuentes: Editar la regla `font-family` en estilos
- Tamaños: Ajustar valores en clases CSS responsivas

## Soporte

Para soporte técnico, contactar al desarrollador del sistema.