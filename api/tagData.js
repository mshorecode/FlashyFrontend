import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTags = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getUserTags = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getTagById = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTag = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const editTag = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteTag = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getTags,
  getUserTags,
  getTagById,
  createTag,
  editTag,
  deleteTag,
};
