const fetchSingleBook = async (props) => {
  const { id } = props;
  const res = await fetch(process.env.REACT_APP_BASE_URL + 'Books/' + id, {
    method: 'GET',
    headers: new Headers({
      Authorization: process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json',
    }),
  }).then((x) => x.json());
  return res;
};

export default fetchSingleBook;
