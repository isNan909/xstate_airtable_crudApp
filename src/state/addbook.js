import { assign } from 'xstate';

const addTheBooks = async (_context, event) => {
  const { Name, Author, Published, Currency, Category } = event;
  const formater = {
    records: [
      {
        fields: { Name, Author, Published, Currency, Category },
      },
    ],
  };
  const res = await fetch(
    'https://api.airtable.com/v0/appPI51O1H51vqeco/Books',
    {
      method: 'POST',
      headers: new Headers({
        // API key should be confidential
        Authorization: 'Bearer keyWR29lNpjiJJ2R0',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(formater),
    }
  );
  return res;
};

export const addbookMachine = {
  id: 'addBooks',
  initial: 'addNew',
  states: {
    addNew: {},
    adding: {
      invoke: {
        id: 'addTheBooks',
        src: addTheBooks,
        onDone: {
          target: 'success',
          actions: assign({ fields: (_context, event) => event.data }),
        },
        onError: {
          target: 'failed',
          actions: assign({ error: (_context, event) => event.data }),
        },
      },
    },
    success: {},
    failed: {},
  },
};
