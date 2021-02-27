import { assign } from 'xstate';
import deleteBook from '../api/deletebook';

const deletingBooks = (context, event) =>
  new Promise(async (resolve, reject) => {
    let result = await deleteBook(context, event);
    console.log(result);
    if (result.status === 200) {
      resolve(result);
    } else {
      reject('employees');
    }
  });

export const removebookMachine = {
  id: 'removebook',
  initial: 'start',
  states: {
    start: {},
    deleting: {
      invoke: {
        id: 'deletingBooks',
        src: deletingBooks,
        onDone: {
          target: 'success',
          actions: assign({ list: (_context, event) => event.data }),
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
