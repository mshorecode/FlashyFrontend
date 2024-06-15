import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from '@nextui-org/react';

export default function Flashcard({ flashcard }) {
  return (
    <Card>
      <CardBody>
        <p>{flashcard.question}</p>
      </CardBody>
    </Card>
  );
}

Flashcard.propTypes = {
  flashcard: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.string,
  }).isRequired,
};
