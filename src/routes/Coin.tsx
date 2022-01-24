import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState<RouteParams>();
  const { state } = useLocation<RouteState>();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.coinpaprika.com/#operation/getCoinById`
      );
      const json = response.json();
      console.log(json);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인: {state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
