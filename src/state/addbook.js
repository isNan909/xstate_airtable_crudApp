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
      body: JSON.stringify(...formater),
    }
  );
  console.log(res);
  return res;
};

export const addbookMachine = {
  id: 'addBooks',
  initial: 'idle',
  states: {
    idle: {
      on: {
        ADD_BOOKS: 'adding',
      },
    },
    adding: {
      invoke: {
        id: 'addTheBooks',
        src: addTheBooks,
        onDone: {
          target: 'success',
          actions: assign({ fields: (context, event) => event.data }),
        },
        onError: {
          target: 'fail',
          actions: assign({ error: (context, event) => event.data }),
        },
      },
    },
    success: {},
    fail: {},
  },
};
