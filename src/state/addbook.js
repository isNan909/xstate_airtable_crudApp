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
    'https://api.airtable.com/v0/appPI51O1H51vqeco/Bookss',
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

const addingBook = (context, event) =>
  new Promise(async (resolve, reject) => {
    let result = await addTheBooks(context, event);
    if (result.status === 200) {
      resolve(result);
    } else {
      reject('employees');
    }
  });

export const addbookMachine = {
  id: 'addBooks',
  initial: 'addNew',
  states: {
    addNew: {},
    adding: {
      invoke: {
        id: 'addingBook',
        src: addingBook,
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
