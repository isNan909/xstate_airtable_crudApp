const editTheBook = async (_context, event) => {
  const { id } = event;
  const { Name, Author, Published, Currency, Category } = event.fields;
  const formater = {
    records: [
      {
        id: id,
        fields: { Name, Author, Published, Currency, Category },
      },
    ],
  };

  const res = await fetch(process.env.REACT_APP_BASE_URL + 'Books', {
    method: 'PATCH',
    headers: new Headers({
      Authorization: process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(formater),
  });
  return res;
};

export default editTheBook;
