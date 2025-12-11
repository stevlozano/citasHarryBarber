// Script para verificar y sincronizar datos con Firebase
console.log('=== VERIFICACIÓN Y SINCRONIZACIÓN CON FIREBASE ===');

// Importar el módulo de base de datos
import('./src/database/firebase-db.js')
  .then(async (module) => {
    console.log('✅ Módulo de base de datos importado correctamente');
    
    // Verificar inicialización
    try {
      console.log('🔄 Inicializando Firebase...');
      const initialized = await module.initializeFirebaseDB();
      console.log(initialized ? '✅ Firebase inicializado correctamente' : '⚠️ Firebase no se pudo inicializar');
      
      // Verificar conexión
      console.log('🔌 Estado de conexión:', module.isConnected ? 'Conectado' : 'Desconectado');
      
      if (initialized && module.isConnected) {
        console.log('\n=== PRUEBA DE SINCRONIZACIÓN ===');
        
        // 1. Leer datos actuales de localStorage
        console.log('📋 Leyendo datos actuales de localStorage...');
        const localStorageData = localStorage.getItem('reserva_harry_barber_v1');
        const reservasLocales = localStorageData ? JSON.parse(localStorageData) : [];
        console.log(`📊 Encontradas ${reservasLocales.length} reservas en localStorage`);
        
        // 2. Leer datos actuales de Firebase
        console.log('☁️ Leyendo datos actuales de Firebase...');
        const reservasFirebase = await module.readCollection('reservas');
        console.log(`📊 Encontradas ${reservasFirebase.length} reservas en Firebase`);
        
        // 3. Comparar datos
        console.log('\n🔍 Comparando datos...');
        if (JSON.stringify(reservasLocales) === JSON.stringify(reservasFirebase)) {
          console.log('✅ Los datos ya están sincronizados');
        } else {
          console.log('⚠️ Los datos no están sincronizados');
          
          // 4. Sincronizar datos (preferencia por localStorage)
          console.log('🔄 Sincronizando datos de localStorage a Firebase...');
          const syncSuccess = await module.writeCollection('reservas', reservasLocales);
          if (syncSuccess) {
            console.log('✅ Sincronización completada exitosamente');
            
            // 5. Verificar sincronización
            const reservasFirebaseActualizadas = await module.readCollection('reservas');
            console.log(`📊 Ahora hay ${reservasFirebaseActualizadas.length} reservas en Firebase`);
          } else {
            console.log('❌ Error en la sincronización');
          }
        }
        
        // 6. Prueba de escritura adicional
        console.log('\n🧪 Realizando prueba de escritura adicional...');
        const testData = [
          { 
            id: `test_sync_${Date.now()}`, 
            nombre: 'Prueba de Sincronización', 
            fecha: new Date().toISOString().split('T')[0],
            hora: '12:00',
            tipoCorte: 'Test',
            tipoPago: 'Efectivo',
            telefono: '000000000',
            createdAt: new Date().toISOString()
          }
        ];
        
        const testWriteSuccess = await module.writeCollection('reservas_test', testData);
        console.log(testWriteSuccess ? '✅ Prueba de escritura exitosa' : '❌ Error en prueba de escritura');
        
        if (testWriteSuccess) {
          // Limpiar datos de prueba
          await module.writeCollection('reservas_test', []);
          console.log('✅ Datos de prueba limpiados');
        }
      } else {
        console.log('❌ No se puede conectar a Firebase. Verifica tu conexión a internet.');
      }
      
      console.log('\n=== VERIFICACIÓN COMPLETADA ===');
    } catch (error) {
      console.error('❌ Error durante la verificación:', error.message);
      console.error('Tipo de error:', error.constructor.name);
    }
  })
  .catch((error) => {
    console.error('❌ Error importando el módulo de base de datos:', error.message);
    console.error('Tipo de error:', error.constructor.name);
  });