const { expect } = require('chai');
const Dispatcher = require('../dist/Dispatcher').default;

const callback = (action) => {
  throw new Error(action)
};

describe('Используем Dispatcher приложения', () => {
  it('регистрируем обработчик и проверяем имеющийся обработчик в списке с тем что передали', () => {
    const dispatcher = new Dispatcher();

    dispatcher.register(callback);

    expect(dispatcher.callbacks[0].toString()).to.equal(callback.toString());
  });

  it('регистрируем обработчик c выбросом исключением выполняем обработчик, ловим ошибку и сверяем с переданной', () => {
    const dispatcher = new Dispatcher();
    const action = 'Action';
    let error = '';

    try {
      dispatcher.register(callback);
      dispatcher.dispatch(action);
    } catch (e) {
      error = e.message;
    }

    expect(error).to.equal(action);
  });
});