// Script para verificar el funcionamiento de la base de datos Firebase
console.log('=== VERIFICACIÓN DE BASE DE DATOS FIREBASE ===');

// Verificar que el módulo se puede importar
import('./src/database/firebase-db.js')
  .then(async (module) => {
    console.log('✅ Módulo de base de datos importado correctamente');
    
    // Verificar inicialización
    try {
      const initialized = await module.initializeFirebaseDB();
      console.log(initialized ? '✅ Firebase inicializado correctamente' : '⚠️ Firebase no se pudo inicializar (usando fallback)');
      
      // Verificar conexión
      console.log('🔌 Estado de conexión:', module.isConnected ? 'Conectado' : 'Desconectado');
      
      // Verificar funciones disponibles
      const funciones = [
        'initializeFirebaseDB',
        'readCollection', 
        'writeCollection',
        'listenToCollection',
        'addDocument',
        'updateDocument',
        'deleteDocument'
      ];
      
      funciones.forEach(func => {
        console.log(`${module[func] ? '✅' : '❌'} Función ${func}:`, module[func] ? 'Disponible' : 'No disponible');
      });
      
      // Prueba de escritura y lectura
      if (initialized) {
        try {
          console.log('\n=== PRUEBA DE ESCRITURA/LECTURA ===');
          
          // Escribir datos de prueba
          const testData = [
            { id: 'test_1', nombre: 'Reserva de Prueba', fecha: '2023-12-01', hora: '10:00' },
            { id: 'test_2', nombre: 'Otra Reserva', fecha: '2023-12-02', hora: '15:00' }
          ];
          
          await module.writeCollection('test_reservas', testData);
          console.log('✅ Datos de prueba escritos correctamente');
          
          // Leer datos de prueba
          const readData = await module.readCollection('test_reservas');
          console.log('✅ Datos de prueba leídos correctamente');
          console.log('📊 Datos recuperados:', readData.length, 'registros');
          
          // Verificar que los datos coincidan
          if (JSON.stringify(readData) === JSON.stringify(testData)) {
            console.log('✅ Los datos leídos coinciden con los escritos');
          } else {
            console.log('⚠️ Los datos leídos no coinciden exactamente con los escritos');
          }
          
          // Limpiar datos de prueba
          await module.writeCollection('test_reservas', []);
          console.log('✅ Datos de prueba limpiados');
          
        } catch (error) {
          console.error('❌ Error en prueba de escritura/lectura:', error.message);
        }
      }
      
      console.log('\n=== VERIFICACIÓN COMPLETADA ===');
      
    } catch (error) {
      console.error('❌ Error durante la verificación:', error.message);
    }
  })
  .catch((error) => {
    console.error('❌ Error importando el módulo de base de datos:', error.message);
  });