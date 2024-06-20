import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSetById } from '../../../api/setData';
import SetForm from '../../../components/forms/SetForm';

export default function EditSet({ id }) {
  const [editSet, setEditSet] = useState({});

  useEffect(() => {
    getSetById(id).then(setEditSet);
  }, []);

  return (
    <SetForm set={editSet} />
  );
}

EditSet.propTypes = {
  id: PropTypes.number.isRequired,
};
