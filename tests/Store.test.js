const { use, expect } = require('chai');
use(require('chai-shallow-deep-equal'));
const Store = require('../dist/Store').default;
const Dispatcher = require('../dist/Dispatcher').default;
const EventEmitter = require('../dist/EventEmitter').default;

const data = { test: 'test' };

const actions = {
  TEST: 'TEST',
};

class Action {
  constructor() {
    this.type = actions.TEST;
    this.payload = data;
  }
}

const reducer = (
  state = [],
  action = new Action(),
) => {
  switch (action.type) {
    case actions.TEST: {
      return [...state, action.payload];
    }
  }

  return state;
};

describe('Используем Store приложения', () => {
  it('создаем стор, диспатчим акшен и проверяем данные в стор', () => {
    const dispatcher = new Dispatcher();
    const eventEmitter = new EventEmitter();
    const store = new Store([], reducer, dispatcher, eventEmitter);

    dispatcher.dispatch(new Action());

    expect(store.store).to.shallowDeepEqual([data]);
  });
});