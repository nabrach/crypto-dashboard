import { useState, useEffect } from "react";
import CoinCard, { type Coin } from "./components/CoinCard/CoinCard";
import LimitSelector from "./components/LimitSelector/LimitSelector";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  // will use react-query, just using this for now
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(10);

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
  return (
    <div>
      <h1>Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">Error: {error}</div>}
      <LimitSelector limit={limit} onLimitChange={setLimit} />
      {!loading && !error && (
        <ul className="grid">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
