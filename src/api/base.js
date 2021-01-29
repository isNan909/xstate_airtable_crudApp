import Airtable from 'airtable';

// api keys needs to be secret
const base = new Airtable({ apiKey: 'keyWR29lNpjiJJ2R0' }).base(
  'appPI51O1H51vqeco'
);
export default base;
