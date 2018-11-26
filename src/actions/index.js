import { FETCH_DATA } from './types';
import { FETCH_PAGINATION } from './types';
import { POST_DRAFT } from './types';
import { UPDATE_DRAFT } from './types';

import axios from 'axios';


const clientId = '17';
const redirectUri = 'http://localhost:3000';
const grant_type = 'authorization_code'
const client_secret = 'BRq3i7bK2uxfhpoyEZANdJxGNkXCmZrmImP9Zi0v'; 

// holds the data to be displayed
let drafts;
let access_token;


// initial data fetching of drafts
export async function getData(code) {
  if (drafts) {
    return {
      type: FETCH_DATA,
      payload: drafts.data
    }
  }

  const getTokenURL = 'https://cors-anywhere.herokuapp.com/https://app.storychief.io/oauth/token';
  const resourceURL = 'https://cors-anywhere.herokuapp.com/https://api.storychief.io/1.0/stories?status=draft';

  const token = await axios.post(`${getTokenURL}`, {
    grant_type,
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret
  })
  .catch(err => {
    console.log(err);
  });

  access_token = token.data.access_token;
  console.log(access_token);
  
  drafts = await axios.get(`${resourceURL}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })
  .catch(err => {
    console.log(err);
  });

  // Clearing parameters, allowing us to get a new access token when it expires
  window.history.pushState('Access Token', null, '/'); 
  return {
    type: FETCH_DATA,
    payload: drafts.data
  }
}


// getting data from pagination links
export async function fetchPagination(page) {
  drafts = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.storychief.io/1.0/stories?page=${page}&status=draft`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })
  .catch(err => console.log(err));

  console.log(drafts);

  return {
    type: FETCH_PAGINATION,
    payload: drafts.data
  }
}


// POST draft
export async function postDraft(title, body) {
  await fetch('https://cors-anywhere.herokuapp.com/https://api.storychief.io/1.0/stories?status=draft', {
    method: 'POST',
    body: JSON.stringify({ title, body }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    }
  })
  .then(res => {
    console.log('res', res);
    return res;
  })
  .catch(err => console.log(err));

  return {
    type: POST_DRAFT,
    payload: drafts.data
  }
}


// UPDATE draft
export async function updateDraft(id, title, body) {
  await fetch(`https://cors-anywhere.herokuapp.com/https://api.storychief.io/1.0/stories/${id}?status=draft`, {
    method: 'PUT',
    body: JSON.stringify({ title, body }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    }
  })
  .then(res => {
    console.log('res', res);
    return res;
  })
  .catch(err => console.log(err));

  return {
    type: UPDATE_DRAFT,
    payload: drafts.data
  }
}