export const fetchAllBooks = async () => {
  try {
    const data = await fetch(
      'https://api.airtable.com/v0/appPI51O1H51vqeco/Books?maxRecords=3&view=Grid%20view',
      {
        method: 'GET',
        headers: new Headers({
          // API key should be confidential
          Authorization: 'Bearer keyWR29lNpjiJJ2R0',
          'Content-Type': 'application/json',
        }),
      }
    ).then((data) => data.json());
    return data;
  } catch {
    console.log('error');
  }
};
