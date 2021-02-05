import { assign } from 'xstate';

const deleteBook = async (_context, _event) => {
  console.log('delete a book api call');
};

export const removebookMachine = {
  id: 'addBooks',
  initial: 'start',
  states: {
    start: {},
    deleting: {
      invoke: {
        id: 'deleteBook',
        src: deleteBook,
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
