const deleteBook = async (props) => {
  const { id } = props;
  const formatter = {
    id: id,
  };
  const res = await fetch(process.env.REACT_APP_BASE_URL + 'Books/' + id, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(formatter),
  }).then((x) => x.json());
  return res;
};

export default deleteBook;
