import { useEffect } from 'react';
import Register from '../components/auth/Register';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RegisterPage() {

    const { auth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (auth) {
			navigate('/');
		}
	}, [auth, navigate]);

  return (
    <Register />
  )
}

export default RegisterPage