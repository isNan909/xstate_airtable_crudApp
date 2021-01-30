import { assign, Machine } from 'xstate';

const addingBook = (e) => {
  e.preventDefault();
  console.log('submitting the form');
};

export const addbookMachine = () => {
  Machine({
    id: 'addBooks',
    initial: 'addingBook',
    context: {
      values: {},
      error: {},
    },
    states: {
      ready: {
        on: {
          ADD_A_BOOK: 'sendingResponse',
        },
      },
      sendingResponse: {
        invoke: {
          id: 'addingBook',
          src: addingBook,
          onDone: {
            target: 'success',
            actions: assign({ values: (context, event) => event.data }),
          },
          onError: {
            target: 'failed',
            actions: assign({ error: (context, event) => event.data }),
          },
        },
      },
      sucess: {},
      failed: {},
    },
    on: {
      ADD_A_BOOK: {
        target: 'book.sendingResponse',
      },
    },
  });
};
