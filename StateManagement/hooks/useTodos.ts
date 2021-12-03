// import {useSelector} from 'react-redux';

import {useRecoilValue} from 'recoil';
import {todosState} from '../atoms/todos';

// export default function useTodos() {
//   return useSelector(state => state.todos);
// }

export default function useTodos() {
  return useRecoilValue(todosState);
}
