import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Chip, ModalBody, ModalContent, ModalFooter, ModalHeader,
  Spacer,
} from '@nextui-org/react';
import moment from 'moment';
import { getSingleFlashcard } from '../../api/flashcardData';

export default function FlashcardDetails({ id }) {
  const [flashcardDetails, setFlashcardDetails] = useState({});

  const getFlashcardDetails = () => {
    getSingleFlashcard(id).then(setFlashcardDetails);
  };

  useEffect(() => {
    getFlashcardDetails(id);
  }, []);

  const readableDate = moment(flashcardDetails.dateCreated).format('MMMM Do YYYY');

  return (
    <>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Details</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-1">
            <p className="font-bold">Question:</p>
            <p>{flashcardDetails.question}</p>
          </div>
          <Spacer />
          <div className="flex flex-col gap-1">
            <p className="font-bold">Answer:</p>
            <p>{flashcardDetails.answer}</p>
          </div>
          <Spacer />
          <div className="flex flex-col gap-1">
            <p className="font-bold">Date Created:</p>
            <p>{readableDate}</p>
          </div>
          <Spacer />
          <div className="flex gap-2">
            <p className="font-bold">Tags:</p>
            {flashcardDetails.tags?.map((tag) => (
              <Chip key={tag.id} size="sm" variant="dot" color="primary">
                {tag.label}
              </Chip>
            ))}
          </div>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </>
  );
}

FlashcardDetails.propTypes = {
  id: PropTypes.number.isRequired,
};
