import { createContext } from 'react';
import { assign, Machine } from 'xstate';
import { addbookMachine } from './addbook';

export const MachineContext = createContext();

const fetchAllBooks = async () => {
  const res = await fetch(
    'https://api.airtable.com/v0/appPI51O1H51vqeco/Books?maxRecords=3&view=Grid%20view',
    {
      method: 'GET',
      headers: new Headers({
        // API key should be confidential
        Authorization: 'Bearer keyWR29lNpjiJJ2R0',
        'Content-Type': 'application/json',
      }),
    }
  ).then((r) => r.json());
  return res;
};

export const appMachine = Machine({
  id: 'app',
  initial: 'init',
  context: {
    books: [],
    error: undefined,
  },
  states: {
    init: {},
    addbookMachine,
    list: {
      states: {
        loading: {
          invoke: {
            id: 'fetchAllBooks',
            src: fetchAllBooks,
            onDone: {
              target: 'success',
              actions: assign({ books: (context, event) => event.data }),
            },
            onError: {
              target: 'failed',
              actions: assign({ error: (context, event) => event.data }),
            },
          },
        },
        success: {},
        failed: {},
      },
    },
  },
  on: {
    LOAD_BOOKS: {
      target: 'list.loading',
    },
  },
});