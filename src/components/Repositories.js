import * as React from "react";
import RepositorySearchResults from './RepositorySearchResults';

/**
 * Once given an input, fetch the repositories we searched
 * via:
 *
 * https://api.github.com/search/repositories?q={}
 *
 * This should not kickoff a fetch for every keystroke, but rather when
 * typing stops.
 *
 * Documentation for the search api is here:
 * https://developer.github.com/v3/search/#search-repositories
 */

const Repositories = () => {
  const [searchText, setSearchText] = React.useState('');
  const [searchResults, setSearchResults] = React.useState('');
  const [searchError, setSearchError] = React.useState(null);
  const [searchTimeout, setSearchTimeout] = React.useState(0);

  const onInputChange = (e) => {
    const value = e.target.value;
    if(searchTimeout) {
      window.clearTimeout(searchTimeout);
    }
    setSearchText(value);
    setSearchTimeout(window.setTimeout(() => {
      getSearchResults(value);
    }, 1000));
  }
  const getSearchResults = (value) => {
    fetch(`https://api.github.com/search/repositories?q=${value}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error("Not 200")
        } else {
          return res.json();
        }
      })
      .then(
        (result) => {
          if(result && result.message === 'Validation Failed') {
            setSearchError(true);
            setSearchResults('');
          }
          else {
            setSearchError(false);
            setSearchResults(result);
          }
        },
        (error) => {
          setSearchError(true);
        }
      )
      .catch(e => {
        setSearchError(true);
      })
  }
  return (
    <div>
      <h1>Repositories</h1>
      <input name="search-terms" value={searchText} onChange={onInputChange}/>
      {searchResults && !searchError ? (
        <RepositorySearchResults searchResults={searchResults} />
      ) : !searchError ? (
        <div>Enter some text to search github repositories</div>
      ) : (
        <div style={{ color: 'red' }}>There was an error with your request</div>
      )}
    </div>
  );
};

export default Repositories;
