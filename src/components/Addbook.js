import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MachineContext } from '../state/index';

// eslint-disable-next-line
function Addbook({}) {
  const book = useRef();
  const authorName = useRef();
  const date = useRef();
  const price = useRef();
  const category = useRef();
  const [machine, sendToMachine] = useContext(MachineContext);

  const addAbook = async () => {
    const Name = book.current.value;
    const Author = authorName.current.value;
    const Published = date.current.value;
    const Currency = parseFloat(price.current.value);
    const Category = category.current.value;
    sendToMachine('ADD_BOOK', { Name, Author, Published, Currency, Category });
  };

  return (
    <div>
      <div className="min-h-screen flex items-left justify-left">
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
              Fill details to add new book.
            </h4>
          </div>
          <form className="mt-10 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
              <div className="mb-3">
                <label htmlFor="book-name" className="sr-only">
                  Book Name
                </label>
                <input
                  id="book-name"
                  name="book"
                  type="text"
                  autoComplete="bookname"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="book name"
                  ref={book}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author-name" className="sr-only">
                  Author Name
                </label>
                <input
                  id="author-name"
                  name="author"
                  type="text"
                  autoComplete="authorname"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="author name"
                  ref={authorName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="published-date" className="sr-only">
                  Published date
                </label>
                <input
                  id="published-date"
                  name="date"
                  type="date"
                  autoComplete="published date"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="published date"
                  ref={date}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="currency" className="sr-only">
                  Price
                </label>
                <input
                  id="currency"
                  name="currency"
                  type="text"
                  autoComplete="currencyname"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="price of book"
                  ref={price}
                />
              </div>

              <div className="relative">
                <select
                  className="rounded border appearance-none border-gray-300 py-2 w-full placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10 sm:text-sm"
                  ref={category}
                >
                  <option default value="select one">
                    select one
                  </option>
                  <option>Psychology</option>
                  <option>Related</option>
                  <option>Others</option>
                  <option>Research</option>
                  <option>Testing</option>
                  <option>Usability</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <input type="button" value="Click me" onClick={addAbook}></input>
            </div>
          </form>
        </div>
      </div>
      {machine.matches('addbookMachine.addNew') && <span>add your books</span>}
      {machine.matches('addbookMachine.success') && <span>added books</span>}
      {machine.matches('addbookMachine.adding') && <span>Adding new Employee ...</span>}
      {machine.matches('addbookMachine.failed') && <span>Sorry not added an employee</span>}
    </div>
  );
}

export default Addbook;
