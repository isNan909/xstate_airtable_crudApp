const fetchAllBooks = async () => {
  const res = await fetch(
    process.env.REACT_APP_BASE_URL + 'Books?maxRecords=all&view=Grid%20view',
    {
      method: 'GET',
      headers: new Headers({
        Authorization: process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json',
      }),
    }
  ).then((x) => x.json());
  return res;
};

export default fetchAllBooks;
