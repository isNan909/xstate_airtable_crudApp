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
    process.env.REACT_APP_BASE_URL + 'Books',
    {
      method: 'POST',
      headers: new Headers({
        Authorization: process.env.REACT_APP_API_KEY,
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
