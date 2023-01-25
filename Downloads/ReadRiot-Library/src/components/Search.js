
import React, { useState } from 'react';
const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(searchInput === '') return;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=react-books+${searchInput}&filter=free-ebooks&key=AIzaSyAbr_mnO88bXbeseUjO5aX1L2xXQCoVr_c`
    );
    const data = await response.json();
    setResults(data.items);
  }


  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <div className="form-group col-6 m-2">
        <input
          type="text"
          className="form-control"
          id="searchInput"
          placeholder="Enter book name"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-outline-warning m-2">
        Submit
      </button>
      {results.length > 0 && (
    <div>
      {results.map((result) => (
        <div key={result.id}>
          <h2>{result.volumeInfo.title}</h2>
          <p>{result.volumeInfo.authors}</p>
          {result.volumeInfo.imageLinks && (
            <img src={result.volumeInfo.imageLinks.thumbnail} alt={result.volumeInfo.title} />
          )}
          {!result.volumeInfo.imageLinks && (
            <img src={'./images/default-thumbnail.png'} alt={result.volumeInfo.title} />
          )}
        </div>
      ))}
    </div>
  )}

    </form>
  );
};

export default Search;
