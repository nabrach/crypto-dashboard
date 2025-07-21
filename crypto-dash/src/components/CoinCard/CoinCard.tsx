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

interface CoinCardProps {
  coin: Coin;
}

const CoinCard = ({ coin }: CoinCardProps) => {
  return (
    <li className="coin-card">
      <div className="coin-header">
        <img className="coin-image" src={coin.image} alt={coin.name} />
        <h2>{coin.name}</h2>
        <p className="symbol">{coin.symbol.toUpperCase()}</p>
      </div>
      <p className="price">Price: ${coin.current_price.toLocaleString()}</p>
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
  );
};

export default CoinCard;
