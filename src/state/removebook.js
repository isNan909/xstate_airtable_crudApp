import { assign } from 'xstate';
import deleteBook from '../api/deletebook';

const deletingBooks = (context, event) => {
  new Promise(async (resolve, reject) => {
    let result = await deleteBook(context, event);
    if (!result.status === 200) {
      reject(result);
    } else {
      resolve(result);
    }
  });
};

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
