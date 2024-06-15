import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';

export default function RegisterForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: user.fbUser.email,
    imageUrl: user.fbUser.photoURL,
    dateCreated: new Date(),
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(router.push('/dashboard'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-16 flex justify-center">
      <form onSubmit={handleSubmit} className="w-96">
        <Input
          size="sm"
          type="username"
          label="Username"
          placeholder="Enter username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mb-8"
          isRequired
        />
        <Input
          size="sm"
          type="firstName"
          label="First Name"
          placeholder="Enter your first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mb-8"
          isRequired
        />
        <Input
          size="sm"
          type="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mb-8"
          isRequired
        />
        <Input
          size="sm"
          type="email"
          label="Email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mb-8"
          isRequired
        />
        <div className="text-center">
          <Button type="submit" radius="full" className="bg-gradient-to-tr from-blue-500 to-green-500 text-white shadow-lg">
            {user.id ? 'Update' : 'Register'}
          </Button>
        </div>
      </form>
    </div>
  );
}
