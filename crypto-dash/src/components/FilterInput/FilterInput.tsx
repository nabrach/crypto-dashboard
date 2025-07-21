interface FilterInputProps {
  filter: string;
  onFilterChange: (newFilter: string) => void;
}

const FilterInput = ({ filter, onFilterChange }: FilterInputProps) => {
  return (
    <div className="filter">
      <label htmlFor="filter">Filter Coins:</label>
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Enter coin name or symbol"
      />
    </div>
  );
};

export default FilterInput;
