export default function ResultsPerPageSelector({ resultsPerPage, setResultsPerPage }) {
    const options = [5, 10, 20, 50];
  
    const handleSelectChange = (event) => {
      setResultsPerPage(parseInt(event.target.value));
    };
  
    return (
      <div>
        <label htmlFor="results-per-page">Results per page:</label>
        <select
          id="results-per-page"
          name="results-per-page"
          value={resultsPerPage}
          onChange={handleSelectChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
  