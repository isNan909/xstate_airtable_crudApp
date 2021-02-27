const fetchSingleBook = async (props) => {
  const { id } = props;
  console.log(id + 'fetch single book api call');
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
