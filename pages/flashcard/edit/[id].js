import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FlashcardForm from '../../../components/forms/FlashcardForm';
import { getSingleFlashcard } from '../../../api/flashcardData';

export default function EditFlashcard({ id }) {
  const [editFlashcard, setEditFlashcard] = useState({});

  useEffect(() => {
    getSingleFlashcard(id).then(setEditFlashcard);
  }, []);

  return (
    <FlashcardForm flashcard={editFlashcard} />
  );
}

EditFlashcard.propTypes = {
  id: PropTypes.number.isRequired,
};
