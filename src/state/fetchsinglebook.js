import { assign } from 'xstate';
import fetchSingleBook from '../api/fetchsinglebook';

const getOneBook = (context, event) =>
  new Promise(async (resolve, reject) => {
    let result = await fetchSingleBook(context, event);
    console.log(result);
    if (result.status === 200) {
      resolve(result);
    } else {
      reject('book');
    }
  });

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
    success: {},
    failed: {},
  },
};
