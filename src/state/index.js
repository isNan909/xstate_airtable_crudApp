import { createContext } from 'react';
import { assign, Machine } from 'xstate';
import { addbookMachine } from './addbook';
// import { removebookMachine } from './removebook';

export const MachineContext = createContext();

const fetchAllBooks = async () => {
  const res = await fetch(
    process.env.REACT_APP_BASE_URL + 'Books?maxRecords=3&view=Grid%20view',
    {
      method: 'GET',
      headers: new Headers({
        Authorization: process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json',
      }),
    }
  ).then((x) => x.json());
  return res;
};

const deleteBook = async (props) => {
  console.log(props.id + 'delete api call here!!');
  const { id } = props;
  const formater = {
    records: [
      {
        fields: { id },
      },
    ],
  };
  console.log(formater);
  const res = await fetch(
    process.env.REACT_APP_BASE_URL + 'Books/recCP7qqKSmeGNdP3',
    {
      method: 'DELETE',
      headers: new Headers({
        Authorization: process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(formater),
    }
  ).then((x) => x.json());
  console.log(res);
  return res;
};

export const appMachine = Machine({
  id: 'app',
  initial: 'init',
  context: {
    books: [],
    error: undefined,
    fields: '',
    removeId: '',
  },
  states: {
    init: {},
    addbookMachine,
    remove: {
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
    },
    list: {
      states: {
        loading: {
          invoke: {
            id: 'fetchAllBooks',
            src: fetchAllBooks,
            onDone: {
              target: 'success',
              actions: assign({ books: (_context, event) => event.data }),
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
    },
  },
  on: {
    LOAD_BOOKS: {
      target: 'list.loading',
    },
    ADD_BOOK: {
      target: 'addbookMachine.adding',
    },
    DELETE_BOOK: {
      target: 'remove.deleting',
      actions: assign((_ctx, evt) => ({
        id: evt.id,
      })),
    },
  },
});
