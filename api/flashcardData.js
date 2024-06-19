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

const getUserFlashcards = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/flashcards/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resolve(resp.json()))
    .catch(reject);
});

const createFlashcard = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/flashcards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const editFlashcardDetails = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/flashcards/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteFlashcard = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/flashcards/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resolve(resp.json()))
    .catch(reject);
});

export {
  getFlashcards,
  getSingleFlashcard,
  getUserFlashcards,
  editFlashcardDetails,
  deleteFlashcard,
  createFlashcard,
};
