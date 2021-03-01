import React, { useContext, useEffect } from 'react';
import { MachineContext } from '../state/index';

import { Deleteicon } from './Deleteicon';
import { Link } from 'react-router-dom';

function Booklist() {
  const [machine, sendToMachine] = useContext(MachineContext);
  const { books, error } = machine.context;
  const list = books.records;

  useEffect(() => {
    sendToMachine('LOAD_BOOKS');
    // eslint-disable-next-line
  }, []);

  const removeBook = (id) => {
    sendToMachine('DELETE_BOOK', { id });
  };

  return (
    <>
      {machine.matches('list.loading') && (
        <span className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-loader animate-spin text-2xl"
          >
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        </span>
      )}
      <section>
        {list && list.length > 0 && (
          <div>
            {list.map((b) => (
              <div key={b.id}>
                {b.fields.Name}
                {b.fields.Published}
                {b.fields.Author}
                {b.fields.Currency}
                {b.fields.Category}
                <Deleteicon clickDelete={() => removeBook(b.id)} />
                <Link to={`/editbook/${b.id}`}>
                  <span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
      <div>
        {machine.matches('list.failed') && (
          <span>Data cannot be loaded {error.toString()}</span>
        )}
      </div>
      <div>
        {machine.matches('removebookMachine.deleting') && (
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-loader animate-spin text-2xl"
            >
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
          </span>
        )}
      </div>
        {machine.matches('removebookMachine.success') && (
                  <div className="bg-green-200 px-2 py-2 text-green-800 mt-2 inline-flex">
                  Your book has been removed!
                </div>
        )}
        {machine.matches('removebookMachine.failed') && (
                    <div className="bg-green-200 px-2 py-2 text-green-800 mt-2 inline-flex">
                    Your book has not been removed!
                  </div>
        )}
    </>
  );
}

export default Booklist;
