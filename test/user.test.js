// Importa Mocha y las funciones que deseas probar
import { describe, it } from 'mocha';
import { createUser, allUsers, getUserById, updateUser, deleteUser, verifyUser,checkDuplicateUser,getUserByLastNameAndEmail,sendVerificationEmail } from '../app/user/infrastructure/repository/user.js';
import { expect } from 'chai';

// Aquí es donde comienzan tus pruebas
describe('Funciones de la base de datos', () => {
    var userId;
  // Prueba para la función createUser
  describe('createUser', () => {
    it('Debería crear un usuario correctamente', async () => {
      // Crea un usuario de prueba
      const userToInsert = { firstName: 'Usuario de prueba',lastName:"apellido de prueba",phone:"+57 3027410595", email: 'test@example.com' };

      // Intenta crear el usuario
      const result = await createUser(userToInsert);

      // Verifica si la operación fue exitosa
      expect(result.acknowledged).to.equal(true);
    });
  });

  // Prueba para la función allUsers
  describe('allUsers', () => {
    it('Debería devolver una lista de usuarios', async () => {
      // Intenta obtener todos los usuarios
      const result = await allUsers();
      userId = result[0].id;

      // Verifica si se devolvió una matriz
      expect(result).to.be.an('array');
    });
  });

    // Prueba para la función verifyUser
    describe('verifyUser', () => {
        it('Debería verificar un usuario existente', async () => {
          // Intenta verificar el usuario
          const result = await verifyUser(userId);

          // Verifica si la verificación fue exitosa
          expect(result.acknowledged).to.equal(true);
        });
      });


  // Prueba para la función getUserById
  describe('getUserById', () => {
    it('Debería devolver un usuario por su ID', async () => {
      // Intenta obtener el usuario por su ID
      const result = await getUserById(userId);

      // Verifica si se devolvió un usuario válido
      expect(result).to.be.an('object');
      expect(result.id).to.equal(userId);
    });
  });

  // Prueba para la función updateUser
  describe('updateUser', () => {
    it('Debería actualizar un usuario existente', async () => {
      // Datos actualizados del usuario
      const updatedUserData = { name: 'Usuario Actualizado' };

      // Intenta actualizar el usuario
      const result = await updateUser(userId, updatedUserData);

      // Verifica si la actualización fue exitosa
      expect(result.modifiedCount).to.equal(1);
    });
  });

  // Prueba para la función deleteUser
  describe('deleteUser', () => {
    it('Debería eliminar un usuario existente', async () => {

      // Intenta eliminar el usuario
      const result = await deleteUser(userId);

      // Verifica si la eliminación fue exitosa
      expect(result.deletedCount).to.equal(1);
    });
  });

  describe('checkDuplicateUser', () => {
    it('Debería devolver false para un usuario no duplicado', async () => {
      // Simula nombres y correos electrónicos que no están duplicados
      const firstnames = 'John';
      const emails = 'john@example.com';

      // Llama a la función checkDuplicateUser con los nombres y correos electrónicos simulados
      const isDuplicate = await checkDuplicateUser(firstnames, emails);

      // Verifica si la función devuelve false
      expect(isDuplicate).to.be.false;
    });
  });

  describe('getUserByLastNameAndEmail', () => {
    it('Debería devolver un objeto de usuario si existe', async () => {
      // Simula apellidos y correos electrónicos que existen en la base de datos
      const lastnames = 'apellido de prueba';
      const emails = 'test@example.com';

      // Llama a la función getUserByLastNameAndEmail con los apellidos y correos electrónicos simulados
      const user = await getUserByLastNameAndEmail(lastnames, emails);

      
      // Verifica si la función devuelve un objeto de usuario
      expect(user).to.be.an('object');
      // Aquí podrías agregar más aserciones para verificar la estructura del usuario, etc.
    });

    it('Debería devolver null si el usuario no existe', async () => {
      // Simula apellidos y correos electrónicos que no existen en la base de datos
      const lastnames = 'Smith';
      const emails = 'nonexistent@example.com';

      // Llama a la función getUserByLastNameAndEmail con los apellidos y correos electrónicos simulados
      const user = await getUserByLastNameAndEmail(lastnames, emails);

      // Verifica si la función devuelve null
      expect(user).to.be.null;
    });
  });
});
