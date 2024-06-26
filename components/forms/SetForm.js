/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Checkbox, Input, ModalBody, ModalContent, ModalFooter, ModalHeader,
  Spacer,
} from '@nextui-org/react';
import { useAuth } from '../../utils/context/authContext';
import { createSet, editSet, getSetById } from '../../api/setData';
import HeartIcon from '../icons/HeartIcon';

export default function SetForm({ set }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    favorite: false,
    userId: user.id,
  });

  useEffect(() => {
    if (set?.id) {
      const getSet = async () => {
        const data = await getSetById(set.id);
        setFormData(data);
      };
      getSet();
    }
  }, [set]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (set?.id) {
      editSet(formData);
    } else {
      const payload = {
        ...formData,
        dateCreated: new Date(),
      };
      createSet(payload);
    }
  };

  const handleChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1" />
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  variant="bordered"
                />
                <Spacer />
                <Input
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  variant="bordered"
                />
                <Spacer />
              </ModalBody>
              <ModalFooter>
                <Checkbox
                  name="favorite"
                  isSelected={formData.favorite}
                  onChange={handleChange}
                  size="md"
                  radius="sm"
                  icon={<HeartIcon />}
                  color="danger"
                  variant="bordered"
                  className="first:mr-auto"
                >
                  Favorite
                </Checkbox>
                <Button
                  color="primary"
                  size="sm"
                  type="submit"
                  onPress={onClose}
                >
                  Save
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </>
  );
}

SetForm.propTypes = {
  set: PropTypes.shape({
    id: PropTypes.number,
  }),
};
