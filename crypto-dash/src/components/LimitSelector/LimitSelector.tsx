interface LimitSelectorProps {
  limit: number;
  onLimitChange: (newLimit: number) => void;
}
const LimitSelector = ({ limit, onLimitChange }: LimitSelectorProps) => {
  return (
    <div className="controls">
      <label htmlFor="limit">Show:</label>
      <select
        id="limit"
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <button onClick={() => onLimitChange(10)}>Reset</button>
    </div>
  );
};

export default LimitSelector;
