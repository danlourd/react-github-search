import './QueryOptions.css';

const QueryOptions = ({ queryText, options, selectedOption, onChange }) => {
  return (
    <div className="QueryOptions dropdown ms-md-2 mt-2 mt-md-0">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {queryText}: <span className="fw-bold">{ options.get(selectedOption) }</span>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {options.entrySeq().map(([key, value]) => 
          <li key={key}><span className="dropdown-item" onClick={() => onChange(key)}>{value}</span></li>
        )}
      </ul>
    </div>
  );
};

export default QueryOptions;
