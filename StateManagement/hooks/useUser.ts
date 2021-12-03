// import {useSelector} from 'react-redux';

import {useRecoilValue} from 'recoil';
import {authState} from '../atoms/auth';

// export default function useUser() {
//   return useSelector(state => state.auth.user);
// }

export default function useUser() {
  const auth = useRecoilValue(authState);
  return auth.user;
}
