import React, { useContext, useEffect } from 'react';
import { MachineContext } from '../state/index';

import { Link } from 'react-router-dom';

function Editbook(route) {
  const [machine, sendToMachine] = useContext(MachineContext);
  const id = route.match.params.id;

  useEffect(() => {
    sendToMachine('FETCH_A_BOOK', { id });
    const { books, error } = machine.context;
    const list = books.records;
    console.log(list);
    // eslint-disable-next-line
  }, []);

  // const editedBook = () => {
  //   // api request for edited books from XState
  // };

  return (
    <div>
      <div className="flex items-left justify-left">
        <div className="max-w-md w-full">
          <div>
            <div>
              <Link
                to="/"
                className="text-indigo-500 inline-flex items-center font-bold"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  ></path>
                </svg>
                Go back
              </Link>
            </div>
            <h4 className="text-left text-2xl font-bold text-gray-500">
              Fill details to edit book details.
            </h4>
          </div>
        </div>
      </div>
      {/* <section>
        {list && list.length > 0 && (
          <div>
            {list.map((b) => (
              <div key={b.id}>
                {b.fields.Name}
                {b.fields.Published}
                {b.fields.Author}
                {b.fields.Currency}
                {b.fields.Category}
              </div>
            ))}
          </div>
        )}
      </section> */}
    </div>
  );
}

export default Editbook;
