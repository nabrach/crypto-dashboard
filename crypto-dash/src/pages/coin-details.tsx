import { useState, useEffect } from "react";
import { useParams } from "react-router";

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CointDetailsPage = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(
          `${API_URL}/${coinId}`
        );
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
    <div>
      <h1>Coin Details Page {coinId}</h1>
    </div>
  );
};

export default CointDetailsPage;
