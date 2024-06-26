import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTagById } from '../../../api/tagData';
import EditTagForm from '../../../components/forms/EditTagForm';

export default function EditTag({ id }) {
  const [editTag, setEditTag] = useState({});

  useEffect(() => {
    getTagById(id).then(setEditTag);
  }, []);

  return (
    <EditTagForm tag={editTag} />
  );
}

EditTag.propTypes = {
  id: PropTypes.number.isRequired,
};
