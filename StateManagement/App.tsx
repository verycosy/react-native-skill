import React from 'react';
import {RecoilRoot} from 'recoil';
// import AuthApp from './components/AuthApp';
// import PostsApp from './components/PostsApp';
import TodoApp from './components/TodoApp';

function App() {
  return (
    <RecoilRoot>
      {/* <AuthApp /> */}
      <TodoApp />
    </RecoilRoot>
  );
}

export default App;
