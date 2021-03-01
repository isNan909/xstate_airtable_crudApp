import { assign } from 'xstate';
import addTheBooks from '../api/addthebook';

const addingBook = (context, event) =>
  new Promise(async (resolve, reject) => {
    let result = await addTheBooks(context, event);
    if (result.status === 200) {
      resolve(result);
    } else {
      reject('books');
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
