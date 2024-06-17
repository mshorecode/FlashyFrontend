import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getFlashcards = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/flashcards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleFlashcard = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/flashcards/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getFlashcards,
  getSingleFlashcard,
};
