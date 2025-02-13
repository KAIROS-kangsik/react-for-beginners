import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [selection, setSelection] = useState("");
  const [howMuch, setHowMuch] = useState(0);

  const onChange = (event) => setSelection(Number(event.target.value));

  const onSubmit = (event) => {
    event.preventDefault();
    setMoney(Number(event.target.amount.value));
  };

  useEffect(() => {
    if (money >= selection) {
      setHowMuch(Math.floor(money / selection));
    } else {
      setHowMuch(0);
    }
  }, [money, selection]);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => setCoins(json));
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <form onSubmit={onSubmit} value={money}>
            <input
              name="amount"
              type="number"
              placeholder="How much do you have?"
            />
            <br />
            <select onChange={onChange}>
              <option>Select!</option>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.quotes.USD.price}>
                  {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
                </option>
              ))}
            </select>
            <br />
            <button>Submit!</button>
          </form>
          <h5>{howMuch}개 살 수 있습니다!</h5>
        </div>
      )}
    </div>
  );
}

export default App;
