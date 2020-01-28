export const loadCommentsFromServer = async(URL) => {
  const response = await fetch(URL);

  return response.json();
};
