import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Coin from "./Coin";


function App() {
  const [coins, setCoins] = useState([]);
  const [marketdata, setMarketdata] = useState([]);
  const [search, setSearch] = useState("");
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log("Coin Data" ,res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/global"
      )
      .then((res) => {
        setMarketdata(res.data);
        console.log("Market Data" , res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="coin-app">
      <div>
       
        <img src={ require('./images/AppTitle.png')} />
      </div>
      <div className="coin-search">
        {<h1 className="coin-text">Currency Search:</h1>}
        <form action="">
          <input
            type="text"
            className="coin-input"
            placeholder="Enter COIN NAME"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="viewport" style={{marginBottom: "20px"}}>
        <table className="header_table">
          <tr className="title-row">
            <td className="title_column" ><h2>TOP 1000 Currencies On Market</h2></td>
            <td className="date">Date: {date}</td>
          </tr>
        </table>
      </div>
      <div class="viewport">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              pricechange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
      {/* <div class="viewport"> */}
        
        {/* {marketdata.} */}
      {/* </div> */}
    </div>
  );
}

export default App;
