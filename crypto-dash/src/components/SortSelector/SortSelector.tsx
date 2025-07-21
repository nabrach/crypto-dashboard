interface SortSelectorProps {
  sortBy: string;
  onSortChange: (newSort: string) => void;
}

const SortSelector = ({ sortBy, onSortChange }: SortSelectorProps) => {
  const handleSortChange = (event: { target: { value: string; }; }) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="controls">
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" value={sortBy} onChange={handleSortChange}>
        <option value="market_cap_desc">Market Cap Descending</option>
        <option value="market_cap_asc">Market Cap Ascending</option>
        <option value="volume_desc">Volume Descending</option>
        <option value="volume_asc">Volume Ascending</option>
        <option value="price_desc">Price Descending</option>
        <option value="price_asc">Price Ascending</option>
      </select>
    </div>
  );
};

export default SortSelector;
