import React, { useEffect, useState } from 'react';
import MainRoutes from './Components/MainRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useAppDispatch } from './redux/hooks';
import { supabase } from './lib/supabase';
import { SIGNIN_SUCCESS, SIGNOUT } from './redux/authReducer/actionTypes';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch({
          type: SIGNIN_SUCCESS,
          payload: { user: session.user, session }
        });
      }
      setIsInitializing(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch({
          type: SIGNIN_SUCCESS,
          payload: { user: session.user, session }
        });
      } else {
        dispatch({ type: SIGNOUT });
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  if (isInitializing) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;