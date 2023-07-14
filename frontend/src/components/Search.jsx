import React, { useState } from "react";
import Fuse from "fuse.js";
import "./quote.css";

const Search = ({ showsearch, closeSearch, quotation, qdata }) => {
  const [query, setQuery] = useState("");
  const [filteredQuotation, setfilteredQuotation] = useState([]);
  setfilteredQuotation(quotation);

  const performsearch = (query) => {
    const fuse = new Fuse(quotation, {
      keys: ["clientName"],
      includeMatches: true,
    });
    const results = fuse.search(query);
    const filterresults = results.map((results) => results.item);
    setfilteredQuotation(filterresults);
  };

  const handleSearch = () => {
    performsearch(query);
  };

  if (!showsearch) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-qblue p-6 box z-10 border border-qwhite">
        {qdata ? (
          <div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
              {filteredQuotation.map((quotation) => (
                <li key={quotation.quotationId}>
                  <h3>{quotation.clientName}</h3>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="flex justify-center">
          <button
            className="font-lcSac text-qwhite border border-qwhite p-2 text-xl w-20"
            onClick={closeSearch}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
