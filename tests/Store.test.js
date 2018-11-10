const { use, expect } = require('chai');
use(require('chai-shallow-deep-equal'));
const Store = require('../dist/Store').default;

const data = { test: 'test' };

const storeValue = {
  test: [data],
};

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

const subscriber = () => {};

describe('Используем store пилрожения', () => {
  it('добавляем редьюсер и проверяем его в списке', () => {
    const store = new Store();

    store.addReducer('test', reducer);

    expect(store.reducers['test'].toString()).to.equal(reducer.toString());
  });
  it('добавляем подписчика и проверяем его в списке', () => {
    const store = new Store();

    store.subscribe(subscriber);

    expect(store.subscribers[0].toString()).to.equal(subscriber.toString());
  });
  it('добавляем подписчика, отписываемся и получаем пустой список подписчиков', () => {
    const store = new Store();

    const unsubscribe = store.subscribe(subscriber);
    unsubscribe();

    expect(store.subscribers.length).to.equal(0);
  });
  it('отпраялем данные и проверяем их наличие', () => {
    const store = new Store();

    store.addReducer('test', reducer);
    store.dispatch(new Action());

    expect(store.value).to.shallowDeepEqual(storeValue);
  });
});