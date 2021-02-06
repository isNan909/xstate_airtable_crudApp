import { assign } from 'xstate';

const deleteBook = async ({id}) => {
  console.log(id + 'delete api call here!!');
};

export const removebookMachine = {
  id: 'removebook',
  initial: 'start',
  states: {
    start: {},
    deleting: {
      invoke: {
        id: 'deleteBook',
        src: deleteBook,
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
