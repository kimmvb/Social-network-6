// newAccount.test.js

// Importa la función que deseamos probar desde newAccount.js
// Importa la función createUserWithEmailAndPassword y setDoc de Firebase (simularemos Firebase)
import { createAccount } from '../src/lib/firebase';
import { newAccount } from '../src/component/newaccount.js';
// Mockear la función createUserWithEmailAndPassword y setDoc para simular Firebase
/* test('should create a new account', async () => {
const register =
});
*/
jest.mock('../src/lib/firebase', () => ({
  createAccount: jest.fn(),
}));

const mockNavigateTo = jest.fn();

describe('Botón de Crear Cuenta', () => {
  it('debería llamar a createAccount al hacer clic en el botón', async () => {
    // Crear un elemento HTML simulado para el botón
    const btnAccount = document.createElement('button');

    // Llamar a la función `newAccount` con el botón y la función `navigateTo`
    const sectionAccount = newAccount(mockNavigateTo);

    // Agregar el botón al DOM simulado
    sectionAccount.appendChild(btnAccount);

    // Simular datos válidos en los campos (puedes agregar campos simulados si es necesario)

    // Simular una llamada exitosa a `createAccount`
    createAccount.mockResolvedValue({ name: 'Usuario', email: 'usuario@example.com' });

    // Disparar un evento clic en el botón
    btnAccount.click();

    // Verificar que `createAccount` se llamó con los datos correctos
    expect(createAccount).toHaveBeenCalledWith('nombreDeUsuario', 'usuario@example.com', 'contraseña'); // Ajusta los valores según tu caso

    // Verificar que `navigateTo` se llamó después de la creación del usuario
    expect(mockNavigateTo).toHaveBeenCalledWith('/');

    // Verificar que no se mostraron alertas de error
    // (puedes agregar esto si manejas alertas en tu código)
    expect(window.alert).not.toHaveBeenCalled();
  });
});
