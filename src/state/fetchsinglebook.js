import { assign } from 'xstate';
import fetchSingleBook from '../api/fetchsinglebook';
import editTheBook from '../api/editthebook';

const getOneBook = (context, event) =>
  new Promise(async (resolve, reject) => {
    let result = await fetchSingleBook(context, event);
    if (result.status === 200) {
      resolve(result);
    } else {
      reject('book');
    }
  });

const editOneBook = (context, event) => {
  new Promise(async (resolve, reject) => {
    let result = await editTheBook(context, event);
    if (result.status === 200) {
      resolve(result);
    } else {
      reject('book');
    }
  });
};

export const fetchOneBookMachine = {
  id: 'fetchonebook',
  initial: 'start',
  states: {
    start: {},
    fetching: {
      invoke: {
        id: 'getOneBook',
        src: getOneBook,
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
    editing: {
      invoke: {
        id: 'editOneBook',
        src: editOneBook,
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
