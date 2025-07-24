import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";

const API_URL = import.meta.env.VITE_COIN_API_URL;

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  description: {
    en: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
  };
}

const CointDetailsPage = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const [coin, setCoin] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${coinId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoin(data);
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

    fetchCoinDetails();
  }, [coinId]);
  return (
    <div className="coin-details-container">
      <Link to="/">Back to Home</Link>

      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol})` : "Coin Details"}
      </h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && coin && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />
          <p>{coin.description.en.split(". ")[0] + "."}</p>

          <div className="coin-details-info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
            <h4>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default CointDetailsPage;
