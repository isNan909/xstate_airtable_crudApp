import React, { useContext, useEffect } from 'react';
import { MachineContext } from '../state/index';

function Booklist({}) {
  const [machine, sendToMachine] = useContext(MachineContext);
  const { books, error } = machine.context;
  const list = books.records;

  useEffect(() => {
    sendToMachine('LOAD_BOOKS');
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {machine.matches('list.loading') && <span>Loading...</span>}
      <section>
        {list && list.length > 0 && (
          <div>
            {list.map((b) => (
              <div key={b.id}>{b.fields.Name}{b.fields.Published}{b.fields.Author}{b.fields.Currency}{b.fields.Category}</div>
            ))}
          </div>
        )}
      </section>
      {machine.matches('list.failed') && (
        <span>Data cannot be loaded {error.toString()}</span>
      )}
    </>
  );
}

export default Booklist;
