import {useMemo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {nextTodoId, todosState} from '../atoms/todos';
// import {useDispatch} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {add, remove, toggle} from '../slices/todos';

// export default function useTodosActions() {
//   const dispatch = useDispatch();

//   return useMemo(
//     () => bindActionCreators({add, remove, toggle}, dispatch),
//     [dispatch],
//   );
// }

export default function useTodosAction() {
  const set = useSetRecoilState(todosState);
  const nextId = useRecoilValue(nextTodoId);

  return useMemo(
    () => ({
      add: (text: string) =>
        set(prevState => prevState.concat({id: nextId, text, done: false})),
      remove: (id: number) =>
        set(prevState => prevState.filter(todo => todo.id !== id)),
      toggle: (id: number) =>
        set(prevState =>
          prevState.map(todo =>
            todo.id === id ? {...todo, done: !todo.done} : todo,
          ),
        ),
    }),
    [set, nextId],
  );
}
