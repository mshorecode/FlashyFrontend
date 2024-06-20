import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Get all sets
const getSets = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sets`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Get logged in user's sets
const getUserSets = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sets/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resolve(resp.json()))
    .catch(reject);
});

// Get a single set details
const getSetById = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sets/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Create Set
const createSet = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Add card to set
const addCardToSet = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sets/addcard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Remove card from set
const removeCardFromSet = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sets/removecard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Delete set
const deleteSet = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sets/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resolve(resp.json()))
    .catch(reject);
});

// Edit set
const editSet = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sets/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getSetById,
  getSets,
  addCardToSet,
  removeCardFromSet,
  deleteSet,
  getUserSets,
  createSet,
  editSet,
};
