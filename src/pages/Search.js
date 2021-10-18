import { useState, useEffect } from 'react';
import { fromJS } from 'immutable'

import SearchInput from '../components/SearchInput';
import QueryOptions from '../components/QueryOptions';
import StarCount from '../components/StarCount';
import Spinner from '../components/Spinner';
import UserSearchMessages from '../components/UserSearchMessages';
import { SORT_OPTIONS, FILTER_OPTIONS } from '../constants';

const sortOptions = fromJS(SORT_OPTIONS);
const filterOptions = fromJS(FILTER_OPTIONS);
const apiSearchUrl = 'https://api.github.com/search/repositories';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedSort, setSelectedSort] = useState('BEST_MATCH');
  const [selectedFilter, setSelectedFilter] = useState('NONE');
  const [searchResultItems, setSearchResultItems] = useState([]);
  const [hasResult, setHasResult] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const searchTerm = searchText || document.getElementById('searchInput').value;

    let queryParams = `q=${searchTerm}`;
    if (FILTER_OPTIONS[selectedFilter] !== FILTER_OPTIONS.NONE) {
      queryParams = `${queryParams}+language=${encodeURIComponent(FILTER_OPTIONS[selectedFilter])}`;
    }
    if (SORT_OPTIONS[selectedSort] === SORT_OPTIONS.MOST_STARS) {
      queryParams = `${queryParams}&sort=stars`;
    }

    if (searchTerm) {
      setInProgress(true);
      fetch(`${apiSearchUrl}?${queryParams}`).then(response => {
        response.json().then(result => {
          setSearchResultItems(result.items);
          setHasResult(true);
          setInProgress(false);
        });
      });
    } else {
      setHasResult(false);
      setSearchResultItems([]);
    }
  }, [searchText, selectedSort, selectedFilter]);

  return (
    <div>
      <h2>Github Search</h2>
      <div className="d-flex flex-column flex-md-row">
        <SearchInput onSearch={(searchTerm) => setSearchText(searchTerm)} />
        <QueryOptions queryText="Sort" options={sortOptions} selectedOption={selectedSort} onChange={(option) => setSelectedSort(option)} />
        <QueryOptions queryText="Filter" options={filterOptions} selectedOption={selectedFilter} onChange={(option) => setSelectedFilter(option)} />
      </div>
      {inProgress ? <Spinner /> :
        <>
          <UserSearchMessages searchText={searchText} hasResult={hasResult} resultsLength={searchResultItems.length} />
          <ul className="list-group mt-3">
            { searchResultItems.map(item => {
                return (
                  <li key={item.id} className="list-group-item d-flex justify-content-between" role="button">
                    <a href={item.html_url} target="_blank" rel="noreferrer">{item.full_name}</a>
                    <StarCount count={item.stargazers_count} />
                  </li>
                );
              }
            )}
          </ul>
        </>
      }
    </div>
  );
}

export default Search;