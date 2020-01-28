export const loadPostsFromServer = async(URL) => {
  const response = await fetch(URL);

  return response.json();
};

export const loadPostFromServer = async(URL) => {
  const response = await fetch(URL);

  return response.json();
};

export const addNewPost = async(userId, title, body) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      title,
      body,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response.json();
};

export const putPostRequest = async(id, body) => {
  const URL = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const response = await fetch(URL, {
    method: 'PUT',
    body: JSON.stringify({
      body,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response.json();
};

export const deletePostRequest = async(id) => {
  const URL = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const response = await fetch(URL, {
    method: 'DELETE',
  });

  return response.json();
};
