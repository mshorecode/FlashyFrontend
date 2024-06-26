/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Autocomplete,
  AutocompleteItem,
  Button, Checkbox, Input, ModalBody, ModalContent, ModalFooter, ModalHeader,
  Spacer,
  Textarea,
} from '@nextui-org/react';
import { createFlashcard, editFlashcardDetails, getSingleFlashcard } from '../../api/flashcardData';
import { useAuth } from '../../utils/context/authContext';
import { getUserSets, removeCardFromSet } from '../../api/setData';
import { getUserTags } from '../../api/tagData';

export default function FlashcardForm({ flashcard = {} }) {
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const [userSets, setUserSets] = useState([]);
  const [selectedTags, setSelectedTags] = useState(flashcard?.tags || []);
  const [selectedKey, setSelectedKey] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    userId: user.id,
    tags: [],
  });

  const handleTagToggle = (option) => {
    if (selectedTags.includes(option)) {
      setSelectedTags(selectedTags.filter((item) => item !== option));
    } else {
      setSelectedTags([...selectedTags, option]);
    }
  };

  const getFlashcard = async () => {
    const data = await getSingleFlashcard(flashcard.id);
    setFormData(data);
  };

  const onSelectionChange = (id) => {
    setSelectedKey(id);
  };

  const removeFromSet = () => {
    const payload = {
      flashcardId: flashcard.id,
      setId: flashcard.setId,
    };
    removeCardFromSet(payload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flashcard.id) {
      const payload = {
        ...formData,
        tags: selectedTags,
        setId: selectedKey,
      };
      editFlashcardDetails(payload);
    } else {
      const payload = {
        ...formData,
        dateCreated: new Date(),
        tags: selectedTags,
        setId: selectedKey,
      };
      createFlashcard(payload);
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

  useEffect(() => {
    getUserSets(user.id).then(setUserSets);
    getUserTags(user.id).then(setTags);
    if (flashcard?.id) {
      getFlashcard();
    }
  }, [flashcard.id]);

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
                  isRequired
                  label="Question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  variant="bordered"
                />
                <Spacer />
                <Textarea
                  isRequired
                  label="Answer"
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  variant="bordered"
                />
                <Spacer />
                {flashcard.setId !== null ? (
                  <Autocomplete
                    label="Select a set"
                    size="sm"
                    variant="bordered"
                    className="max-w-md"
                    onSelectionChange={removeFromSet}
                  >
                    <AutocompleteItem key={flashcard.id}>
                      Remove flashcard from set
                    </AutocompleteItem>
                  </Autocomplete>
                ) : (
                  <Autocomplete
                    label="Select a set"
                    size="sm"
                    variant="bordered"
                    className="max-w-md"
                    onSelectionChange={onSelectionChange}
                  >
                    {userSets.map((set) => (
                      <AutocompleteItem key={set.id}>
                        {set.title}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                )}
                <Spacer />
                <div className="flex flex-col gap-4">
                  <p className="text-sm">Tags:</p>
                  {tags?.map((t) => (
                    <Checkbox
                      key={t.id}
                      isSelected={selectedTags.includes(t)}
                      onChange={() => handleTagToggle(t)}
                    >
                      {t.label}
                    </Checkbox>
                  ))}
                </div>
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
