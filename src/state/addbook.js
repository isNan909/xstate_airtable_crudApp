import { Machine, assign } from 'xstate';

export const addbookMachine = Machine(
  {
    id: 'addBooks',
    initial: 'idle',
    context: {
      values: {},
      error: {},
    },
    states: {
      idle: {
        on: {
          FETCH: 'adding',
        },
      },
      adding: {
        entry: ['addingBooks'],
        on: {
          RESOLVE: { target: 'sucess', actions: ['setValues'] },
          REJECT: { target: 'failed', actions: ['setError'] },
        },
      },
      sucess: {},
      failed: {
        on: {
          FETCH: 'adding',
        },
      },
    },
  },
  {
    actions: {
      setValues: assign((_ctx, event) => ({
        values: event.values,
      })),
      setError: assign((_ctx, event) => ({
        error: event.error,
      })),
    },
  }
);
