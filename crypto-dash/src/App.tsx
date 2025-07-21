import { useState, useEffect } from "react";

interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

// based on the CoinGecko API response structure
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi | null;
  last_updated: string;
}

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
  // will use react-query, just using this for now
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(API_URL);
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
  }, []);
  return (
    <div>
      <h1>Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <ul className="grid">
          {coins.map((coin) => (
            <li className="coin-card" key={coin.id}>
              <div className="coin-header">
                <img className="coin-image" src={coin.image} alt={coin.name} />
                <h2>{coin.name}</h2>
                <p className="symbol">{coin.symbol.toUpperCase()}</p>
              </div>
              <p className="price">
                Price: ${coin.current_price.toLocaleString()}
              </p>
              <p
                className={
                  coin.price_change_percentage_24h < 0 ? "positive" : "negative"
                }
              >
                24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="market-cap">
                Market Cap: ${coin.market_cap.toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
