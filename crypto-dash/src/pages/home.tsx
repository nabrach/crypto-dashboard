import CoinCard, { type Coin } from "../components/CoinCard/CoinCard";
import FilterInput from "../components/FilterInput/FilterInput";
import LimitSelector from "../components/LimitSelector/LimitSelector";
import SortSelector from "../components/SortSelector/SortSelector";


interface HomePageProps {
  coins: Coin[];
  filter: string;
  setFilter: (filter: string) => void;
  limit: number;
  setLimit: (limit: number) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  loading: boolean;
  error: string | null;
}

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}: HomePageProps) => {
  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "volume_desc":
          return b.total_volume - a.total_volume;
        case "volume_asc":
          return a.total_volume - b.total_volume;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        default:
          return 0;
      }
    })
    .slice(0, limit);
  return (
    <div>
      <h1>Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">Error: {error}</div>}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>
      {!loading && !error && (
        <ul className="grid">
          {filteredCoins.length === 0 && <p>No coins found</p>}
          {filteredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
