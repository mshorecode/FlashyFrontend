import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Chip, ModalBody, ModalContent, ModalFooter, ModalHeader,
  Spacer,
} from '@nextui-org/react';
import moment from 'moment';
import { getSetById } from '../../api/setData';
import HeartIcon from '../../components/icons/HeartIcon';

export default function SetDetails({ id }) {
  const [setDetails, setSetDetails] = useState({});

  const getFlashcardDetails = () => {
    getSetById(id).then(setSetDetails);
  };

  useEffect(() => {
    getFlashcardDetails(id);
  }, []);

  const readableDate = moment(setDetails.dateCreated).format('MMMM Do YYYY');

  return (
    <>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Details</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-1">
            <p className="font-bold">Title:</p>
            <p>{setDetails.title}</p>
          </div>
          <Spacer />
          <div className="flex flex-col gap-1">
            <p className="font-bold">Description:</p>
            <p>{setDetails.description}</p>
          </div>
          <Spacer />
          <div className="flex flex-col gap-1">
            <p className="font-bold">Date Created:</p>
            <p>{readableDate}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-2 last:mr-auto">
            {setDetails.favorite === true ? (
              <Chip key={setDetails.favorite} size="sm" variant="flat" startContent={<HeartIcon size={18} />} color="danger">
                Favorite
              </Chip>
            ) : ('')}
          </div>
        </ModalFooter>
      </ModalContent>
    </>
  );
}

SetDetails.propTypes = {
  id: PropTypes.number.isRequired,
};
