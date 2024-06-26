/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer,
} from '@nextui-org/react';
import { useAuth } from '../../utils/context/authContext';
import { createTag, editTag, getTagById } from '../../api/tagData';

export default function TagForm({ tag = {} }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    label: '',
  });

  useEffect(() => {
    if (tag?.id) {
      const getTag = async () => {
        const data = await getTagById(tag.id);
        setFormData(data);
      };
      getTag();
    }
  }, [tag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tag?.id) {
      editTag(formData);
    } else {
      const payload = {
        ...formData,
        userId: user.id,
      };
      createTag(payload);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                {tag?.id ? 'Edit Tag' : 'Create Tag'}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="label"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                  variant="bordered"
                />
                <Spacer />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" size="sm" type="submit" onPress={onClose}>
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

TagForm.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.number,
  }),
};
