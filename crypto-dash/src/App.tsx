import { useState, useEffect } from "react";
import CoinCard, { type Coin } from "./components/CoinCard/CoinCard";
import LimitSelector from "./components/LimitSelector/LimitSelector";
import FilterInput from "./components/FilterInput/FilterInput";
import SortSelector from "./components/SortSelector/SortSelector";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  // will use react-query, just using this for now
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    .slice().sort((a, b) => {
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

export default App;
