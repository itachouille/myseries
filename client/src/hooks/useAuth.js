import axios from 'axios';
import { useEffect, useState } from 'react';

export default () => {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    try {
      const res = await axios.get('/api/auth/is_logged_in');
      return res.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await verifyAuth();
      setAuth(data);
    })();
  }, []);

  return { auth };
};