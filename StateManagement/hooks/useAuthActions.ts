import {useMemo} from 'react';
// import {useDispatch} from 'react-redux';
import {useSetRecoilState} from 'recoil';
// import {bindActionCreators} from 'redux';
import {authState, User} from '../atoms/auth';
// import {authorize, logout} from '../slices/auth';

// export default function useAuthActions() {
//   const dispatch = useDispatch();

//   return {
//     authorize: (user: User) => dispatch(authorize(user)),
//     logout: () => dispatch(logout()),
//   };
// }

// export default function useAuthActions() {

//   const dispatch = useDispatch();
//   return useMemo(
//     () => bindActionCreators({authorize, logout}, dispatch),
//     [dispatch],
//   );
// }

export default function useAuthActions() {
  const set = useSetRecoilState(authState);

  return useMemo(
    () => ({
      authorize: (user: User) => {
        set({user});
      },
      logout: () => {
        set({user: null});
      },
    }),
    [set],
  );
}
