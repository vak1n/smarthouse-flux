# smarthouse-flux

Библиотека для создания контейнера состояний JavaScript приложений

## Использование

#### Установка

```sh
npm i --save https://github.com/vak1n/smarthouse-flux.git
```

#### Интерфейсы

- IAction интерфейс экшена
- IReducer интерфейс редьюсера

#### Создание акшенов

Класс с фабричными методами экшенов для списка дел

actions.ts:
```ts
import { IAction } from 'smarthouse-flux';
import ITodo from '../interfaces/ITodo';

export const TODO_ADD = '[TODO] ADD';

export class TodoActions {
  public static add(data: ITodo): IAction<ITodo> {
    return {
      payload: data,
      type: TODO_ADD
    }
  }
}
```

#### Создание редьюсеров

Редьюсер для списка дел

reducer.ts:
```ts
import { IAction } from 'smarthouse-flux';
import { IReducer } from 'smarthouse-flux';
import ITodo from '../interfaces/ITodo';
import * as actions from './actions';

const initialState: ITodo[] = [];

export const todoReducer: IReducer<ITodo> = (
  state = initialState,
  action: IAction<ITodo>,
) => {
  switch (action.type) {
    case actions.TODO_ADD: {
      return [...state, action.payload];
    }
  }

  return state;
};
```

#### Создание стора

Инициализация стора и добавление редьюсера списка дел

```ts
import { Store } from 'smarthouse-flux';
import ITodo from '../interfaces/ITodo';
import { TodoActions } from '../store/todo/actions';
import { todoReducer } from '../store/todo/reducer';

const store = new Store();
store.addReducer('todo', todoReducer);
```

#### Подписка на изменение стора

```ts
store.subscribe(()=> {
  const todo: ITodo[] = store.value.todo;
  /* какое нибудь действие */
});
```

#### Отписка от изменения стора

```ts
const unsubscribe = store.subscribe(()=> {
  const todo: ITodo[] = store.value.todo;
  /* какое нибудь действие */
});
unsubscribe();
```

#### Изменение состояния

```ts
store.dispatch(TodoActions.add({ label: 'to do something', complete: false }));
```

## Разработка

Окружение при разработке:

- node --version v10.12.0
- npm --version 6.4.1

#### Установка

```sh
git clone https://github.com/vak1n/smarthouse-flux
cd smarthouse-flux
npm install
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