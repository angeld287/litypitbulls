import React, { useEffect, useMemo, useState } from 'react';
import userService from './apis/userService';
import { useAppDispatch, useAppSelector } from './app/hooks';
import CustomLoader from './components/CustomLoader';
import { selectUserRegister } from './features/userRegister/userRegisterSlice';
import { selectUserSession, setSession } from './features/userSession/userSessionSlice';
import IUserService from './interfaces/IUserService';
import Routes from './Routes';
import Login from './screens/Login';
import Register from './screens/Register';

function App() {
  const _userService: IUserService = useMemo(() => new userService(), []);
  const session = useAppSelector(selectUserSession);
  const register = useAppSelector(selectUserRegister);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const fetchSession = async () => {
      setLoading(true);
      const response = await _userService.getSession();

      if (!didCancel) {
        dispatch(setSession(response.data.session !== null));
        setLoading(false);
      }
    }

    fetchSession();

    return () => {
      setLoading(false);
      didCancel = true;
    }
  }, [_userService, dispatch]);

  if (loading) return <CustomLoader />
  if (!session.activeSession) {
    if (!register.isRegistering) {
      return <Login />
    } else {
      return <Register />
    }
  }

  return <Routes />;
}

export default App;
