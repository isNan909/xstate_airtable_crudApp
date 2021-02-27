const addTheBooks = async (_context, event) => {
  const { Name, Author, Published, Currency, Category } = event;
  const formater = {
    records: [
      {
        fields: { Name, Author, Published, Currency, Category },
      },
    ],
  };
  const res = await fetch(process.env.REACT_APP_BASE_URL + 'Books', {
    method: 'POST',
    headers: new Headers({
      Authorization: process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(formater),
  });
  return res;
};

export default addTheBooks;
