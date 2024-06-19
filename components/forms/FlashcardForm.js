import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader,
  Spacer,
} from '@nextui-org/react';
import { createFlashcard, editFlashcardDetails, getSingleFlashcard } from '../../api/flashcardData';
import { useAuth } from '../../utils/context/authContext';

export default function FlashcardForm({ flashcard }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    userId: user.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flashcard?.id) {
      editFlashcardDetails(formData);
    } else {
      const payload = {
        ...formData,
        dateCreated: new Date(),
      };
      createFlashcard(payload);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (flashcard?.id) {
      const getFlashcard = async () => {
        const data = await getSingleFlashcard(flashcard.id);
        setFormData(data);
      };
      getFlashcard();
    }
  }, [flashcard]);

  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                {flashcard?.id ? 'Edit Flashcard' : 'Create Flashcard'}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="Edit question"
                  variant="bordered"
                />
                <Spacer />
                <Input
                  label="Answer"
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  placeholder="Edit answer"
                  variant="bordered"
                />
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

FlashcardForm.propTypes = {
  flashcard: PropTypes.shape({
    id: PropTypes.number,
  }),
};

FlashcardForm.defaultProps = {
  flashcard: PropTypes.shape({
    id: PropTypes.number,
  }),
};
