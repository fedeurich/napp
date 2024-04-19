const { CateringType } = require('../database/models');
// Define los datos para cada tipo de catering
const cateringData = [
    {
      NameCateringType: 'Ejecutivo',
      EmployeesRequired: 5,
      ProductsRequired: 20
    },
    {
      NameCateringType: 'Merienda',
      EmployeesRequired: 3,
      ProductsRequired: 15
    },
    {
      NameCateringType: 'Completo',
      EmployeesRequired: 7,
      ProductsRequired: 25
    }
  ];
  
  // Inserta los datos en la base de datos
  async function seedCateringTypes() {
    try {
      // Inserta los datos en la base de datos usando bulkCreate()
      await CateringType.bulkCreate(cateringData);
  
      console.log('Tipos de catering creados exitosamente.');
    } catch (error) {
      console.error('Error al crear tipos de catering:', error);
    } finally {
      // No es necesario cerrar la conexión a la base de datos aquí
      // await CateringType.sequelize.close();
    }
  }
  seedCateringTypes();