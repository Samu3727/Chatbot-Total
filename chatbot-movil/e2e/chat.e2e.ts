import { device, element, by, expect as detoxExpect } from 'detox';

describe('Chat Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('debe mostrar la pantalla de chat', async () => {
    await detoxExpect(element(by.text('Chat'))).toBeVisible();
  });

  it('debe permitir enviar un mensaje', async () => {
    const inputField = element(by.id('chat-input'));
    const sendButton = element(by.id('send-button'));

    await inputField.typeText('Hola mundo');
    await sendButton.tap();

    // Verificar que el mensaje aparece en la lista
    await detoxExpect(element(by.text('Hola mundo'))).toBeVisible();
  });

  it('no debe enviar mensajes vacíos', async () => {
    const sendButton = element(by.id('send-button'));
    await sendButton.tap();

    // El botón debe estar deshabilitado o no hacer nada
    await detoxExpect(sendButton).toExist();
  });

  it('debe mostrar estado de carga al enviar mensaje', async () => {
    const inputField = element(by.id('chat-input'));
    const sendButton = element(by.id('send-button'));

    await inputField.typeText('Test de carga');
    await sendButton.tap();

    // Verificar que aparece indicador de carga
    await detoxExpect(element(by.text('...'))).toBeVisible();
  });

  it('debe recibir respuesta del bot', async () => {
    const inputField = element(by.id('chat-input'));
    const sendButton = element(by.id('send-button'));

    await inputField.typeText('Hola');
    await sendButton.tap();

    // Esperar respuesta del bot (máximo 10 segundos)
    await waitFor(element(by.id('bot-message')))
      .toBeVisible()
      .withTimeout(10000);
  });

  it('debe limpiar el input después de enviar', async () => {
    const inputField = element(by.id('chat-input'));
    const sendButton = element(by.id('send-button'));

    await inputField.typeText('Test');
    await sendButton.tap();

    // Verificar que el input está vacío
    await detoxExpect(inputField).toHaveText('');
  });

  it('debe mostrar múltiples mensajes en orden', async () => {
    const inputField = element(by.id('chat-input'));
    const sendButton = element(by.id('send-button'));

    await inputField.typeText('Mensaje 1');
    await sendButton.tap();
    await waitFor(element(by.id('bot-message'))).toBeVisible().withTimeout(10000);

    await inputField.typeText('Mensaje 2');
    await sendButton.tap();
    await waitFor(element(by.id('bot-message'))).toBeVisible().withTimeout(10000);

    // Ambos mensajes deben ser visibles
    await detoxExpect(element(by.text('Mensaje 1'))).toBeVisible();
    await detoxExpect(element(by.text('Mensaje 2'))).toBeVisible();
  });

  it('debe desplazarse por el historial de mensajes', async () => {
    const messageList = element(by.id('message-list'));
    
    // Enviar varios mensajes
    for (let i = 1; i <= 5; i++) {
      const inputField = element(by.id('chat-input'));
      const sendButton = element(by.id('send-button'));
      
      await inputField.typeText(`Mensaje ${i}`);
      await sendButton.tap();
      await waitFor(element(by.id('bot-message'))).toBeVisible().withTimeout(10000);
    }

    // Verificar que se puede hacer scroll
    await messageList.scroll(100, 'down');
    await messageList.scroll(100, 'up');
  });
});
