import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const PriceWrapper = styled.div<{ isPlus: number }>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 45px;
  width: 100%;
  margin-bottom: 10px;
  line-height: 100%;

  span {
    display: block;
    width: 45%;
    height: 100%;
    line-height: 45px;
    border-radius: 15px;
  }

  span:first-child {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.2);
  }

  span:last-child {
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    color: ${(props) => (props.isPlus >= 0 ? "green" : "red")};
  }
`;

interface ICoinTicker {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoin {
  coinId: string;
}

function Price({ coinId }: ICoin) {
  const { isLoading, data } = useQuery<ICoinTicker>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 1000 * 60 * 60 }
  );
  const isPlus = 0;

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <PriceWrapper isPlus={data?.quotes.USD.percent_change_1h || 0}>
            <span>1H</span>
            <span>{data?.quotes.USD.percent_change_1h}&#37;</span>
          </PriceWrapper>
          <PriceWrapper isPlus={data?.quotes.USD.percent_change_24h || 0}>
            <span>24H</span>
            <span>{data?.quotes.USD.percent_change_24h}&#37;</span>
          </PriceWrapper>
          <PriceWrapper isPlus={data?.quotes.USD.percent_change_7d || 0}>
            <span>Week</span>
            <span>{data?.quotes.USD.percent_change_7d}&#37;</span>
          </PriceWrapper>
          <PriceWrapper isPlus={data?.quotes.USD.percent_change_30d || 0}>
            <span>Month</span>
            <span>{data?.quotes.USD.percent_change_30d}&#37;</span>
          </PriceWrapper>
          <PriceWrapper isPlus={data?.quotes.USD.percent_change_1y || 0}>
            <span>Year</span>
            <span>{data?.quotes.USD.percent_change_1y}&#37;</span>
          </PriceWrapper>
        </>
      )}
    </div>
  );
}

export default Price;
