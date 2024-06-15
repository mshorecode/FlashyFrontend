/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { checkUser } from '../utils/auth';
import RegisterForm from '../components/forms/RegisterForm';

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    checkUser(user.uid).then(setAuthUser);
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => {
      setAuthUser(data);
    });
  };

  if (authUser.uid === user.uid) {
    router.push('/dashboard');
  }

  return <RegisterForm user={user} onUpdate={onUpdate} />;
}

export default Home;
