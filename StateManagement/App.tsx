import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './slices';
import TodoApp from './components/TodoApp';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;
