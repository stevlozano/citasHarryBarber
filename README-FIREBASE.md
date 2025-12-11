# Sistema de Base de Datos Firebase para Harry Barber

## Descripción

Este sistema implementa una base de datos funcional en JavaScript puro que funciona en producción y sincroniza los cambios con Firebase en tiempo real entre todos los dispositivos.

## Características

1. **Sincronización en Tiempo Real**: Cuando se crea una reserva en un dispositivo, automáticamente aparece en todos los demás dispositivos conectados.
2. **Fallback a localStorage**: Si la conexión a Firebase falla, el sistema continúa funcionando con localStorage.
3. **Integración Completa**: Todas las páginas del sistema (calendario, panel de barbero, historial, promociones) están integradas con la base de datos.

## Cómo Funciona la Sincronización

### 1. Inicialización
```javascript
// El módulo se importa automáticamente en cada página
import('../../src/database/firebase-db.js').then(module => {
  window.dbModule = module;
  // Inicializar base de datos
  window.dbModule.initializeFirebaseDB().then(success => {
    if (success) {
      console.log('Base de datos Firebase inicializada');
      
      // Escuchar cambios en tiempo real
      window.dbModule.listenToCollection('reservas', (data) => {
        // Actualizar interfaz automáticamente cuando hay cambios
        renderCalendar(current);
        renderListaReservas();
      });
    }
  });
});
```

### 2. Guardar Reservas
```javascript
// Función actualizada para guardar reservas
window.saveReservas = async function(arr){ 
  // Guardar en localStorage (fallback)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); 
  
  // Si el módulo de base de datos está disponible, también guardar allí
  if (window.dbModule && window.dbModule.writeCollection) {
    try {
      await window.dbModule.writeCollection('reservas', arr);
    } catch(error) {
      console.error('Error al guardar en Firebase:', error);
    }
  }
};
```

### 3. Cargar Reservas
```javascript
// Función actualizada para cargar reservas
window.loadReservas = async function(){ 
  try { 
    // Si el módulo de base de datos está disponible, intentar leer de Firebase
    if (window.dbModule && window.dbModule.readCollection) {
      try {
        const data = await window.dbModule.readCollection('reservas');
        if (data && data.length > 0) {
          return data;
        }
      } catch(e) {
        console.warn('Error leyendo de Firebase, usando localStorage:', e);
      }
    }
    // Fallback a localStorage
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; 
  } catch(e){ 
    return []; 
  } 
};
```

## Pruebas

### Página de Test de Base de Datos
Accede a: http://localhost:51481/test-firebase.html

### Página de Test de Formulario
Accede a: http://localhost:51481/test-formulario.html

## Verificación de Sincronización Entre Dispositivos

1. **En tu celular**:
   - Abre el navegador y accede a la dirección de red: http://192.168.1.10:51481
   - Crea una reserva usando el calendario

2. **En tu laptop**:
   - Abre el navegador y accede a: http://localhost:51481
   - Verifica que la reserva creada en el celular aparezca inmediatamente en el calendario
   - Observa que el punto rojo indicador de reserva aparece en la fecha correspondiente

## Archivos Actualizados

- `src/database/firebase-db.js`: Módulo central de base de datos
- `pages/appointments/calendariov3.html`: Calendario principal con formulario de reservas
- `pages/dashboard/panel-barbero.html`: Panel de control del barbero
- `pages/history/historial.html`: Historial de reservas
- `pages/services/promo-semanal.html`: Promociones semanales
- `scripts/js/firebase-init.js`: Inicialización de Firebase
- `src/firebase/firebase-config.js`: Configuración de Firebase

## Solución al Problema Original

Antes de esta implementación, cuando realizabas una reserva en el celular, no aparecía como ocupada en la laptop porque:
- El sistema solo usaba localStorage local
- No había sincronización entre dispositivos

Ahora, gracias a la integración con Firebase Realtime Database:
- Todas las reservas se almacenan en la nube
- Los cambios se sincronizan en tiempo real entre todos los dispositivos
- Cuando creas una reserva en un dispositivo, inmediatamente aparece en todos los demás

## Beneficios

1. **Consistencia**: Todos los dispositivos muestran la misma información
2. **Disponibilidad**: El sistema funciona incluso sin conexión (con localStorage)
3. **Tiempo Real**: Los cambios se reflejan inmediatamente en todos los dispositivos
4. **Fiabilidad**: Sistema de fallback garantiza que siempre funcione

## Soporte

Si encuentras algún problema con la sincronización:
1. Verifica que tengas conexión a internet
2. Abre la consola del navegador (F12) para ver posibles errores
3. Recarga la página para forzar la sincronización