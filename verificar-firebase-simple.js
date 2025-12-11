// Script simple para verificar la conectividad de Firebase
console.log('=== VERIFICACIÓN SIMPLE DE FIREBASE ===');

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
        console.log('\n=== PRUEBA DE ESCRITURA ===');
        // Crear datos de prueba
        const testData = [
          { id: 'test_1', nombre: 'Prueba de Conexión', fecha: new Date().toISOString(), mensaje: 'Conexión exitosa' }
        ];
        
        // Intentar escribir datos
        const writeSuccess = await module.writeCollection('test_conexion', testData);
        console.log(writeSuccess ? '✅ Escritura en Firebase exitosa' : '❌ Error en escritura en Firebase');
        
        if (writeSuccess) {
          console.log('\n=== PRUEBA DE LECTURA ===');
          // Intentar leer datos
          const readData = await module.readCollection('test_conexion');
          console.log('✅ Lectura de Firebase exitosa');
          console.log('📊 Datos recuperados:', readData.length, 'registros');
          
          // Limpiar datos de prueba
          await module.writeCollection('test_conexion', []);
          console.log('✅ Datos de prueba limpiados');
        }
      }
      
      console.log('\n=== VERIFICACIÓN COMPLETADA ===');
    } catch (error) {
      console.error('❌ Error durante la verificación:', error.message);
      console.error('.Tipo de error:', error.constructor.name);
    }
  })
  .catch((error) => {
    console.error('❌ Error importando el módulo de base de datos:', error.message);
    console.error('.Tipo de error:', error.constructor.name);
  });