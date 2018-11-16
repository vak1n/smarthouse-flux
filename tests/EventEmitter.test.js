const { expect } = require('chai');
const EventEmitter = require('../dist/EventEmitter').default;

const listener = (data) => {
  throw new Error(data)
};

describe('Используем EventEmitter приложения', () => {
  it('добавляем слушателя и проверяем имеющегося слушателя в списке с тем что передали', () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('test', listener);

    expect(eventEmitter.listeners.test.toString()).to.equal(listener.toString());
  });

  it('добавляем слушателя c выбросом исключением выполняем тригер, ловим ошибку и сверяем с переданными данными', () => {
    const eventEmitter = new EventEmitter;
    const data = 'Data';
    let error = '';

    try {
      eventEmitter.on('test', listener);
      eventEmitter.on('test', listener);
      eventEmitter.trigger('test', data);
    } catch (e) {
      error = e.message;
    }

    expect(error).to.equal(data);
  });
});