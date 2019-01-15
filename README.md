# smarthouse-flux

Библиотека для создания контейнера состояний JavaScript приложений

## Использование

#### Установка

```sh
npm i --save https://github.com/vak1n/smarthouse-flux.git
```

#### Интерфейсы

- IAction           действие
- IDispatcher       диспетчер
- IEventEmitter     транслятор событий
- IReducer          редьюсер

#### Создание акшенов

Класс с фабричными методами экшенов для списка дел

TodoAction.ts:
```ts
export class TodoAction {
  public static readonly ADD: string = '[TODO] ADD';
  public static readonly DELETE: string = '[TODO] DELETE';

  public static add(todo: ITodo): IAction<ITodo> {
    return {
      payload: todo,
      type: this.ADD,
    };
  }

  public static delete(todo: ITodo): IAction<ITodo> {
    return {
      payload: todo,
      type: this.DELETE,
    };
  }
}
```

#### Создание редьюсеров

Редьюсер для списка дел

todoReducer.ts:
```ts
const initialState: ITodo[] = [];

export const todoReducer: IReducer<ITodo> = (state = initialState, action: IAction<ITodo>) => {
  switch (action.type) {
    case TodoAction.ADD: {
      if (!action.payload) {
        return [...state];
      }
      return [...state, action.payload];
    }

    case TodoAction.DELETE: {
      if (!action.payload) {
        return [...state];
      }
      const newState = state.filter((todo) => todo.id !== action.payload!.id);
      return [...newState];
    }
  }
  return state;
};
```

#### Создание стора

Инициализация стора и добавление редьюсера списка дел

```ts
export interface ITodo {
  id: string;
  label: string;
  complete: boolean;
}

const eventEmitter = new EventEmitter<ITodo>();
const dispatcher = new Dispatcher<ITodo>();
const store = new Store<ITodo>([], todoReducer, dispatcher, eventEmitter);
```

#### Подписка на изменение стора

```ts
eventEmitter.on('actionName', () => {
  /* обработка изменнения например обновление стейта в react компоненте */
  this.setState(() => {
    return {
      list: store.getStore(),
    };
  });
});
```

#### Отписка от изменения стора

```ts
const unsubscribe = eventEmitter.on('actionName', () => {});
unsubscribe();
```

#### Изменение состояния

```ts
dispatcher.dispatch(TodoAction.add(this.state.todo));
```

## Разработка

Окружение при разработке:

- node --version ^10.12.0
- npm --version ^6.4.1

#### Установка

```sh
git clone https://github.com/vak1n/smarthouse-flux
cd smarthouse-flux
npm install
```

#### Запуск

```sh
npm start
```

#### Сборка

```sh
npm run build
```

#### Тестирование

```sh
npm test
```

покрытие:

```sh
npm run test-cover
```
(см. папка coverage)

мутационное тестирование:

```sh
npm run test-stryker
```
(см. папка reports)
