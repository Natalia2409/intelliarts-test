import React, { useState, useEffect} from "react";
import './App.css';
import Adding from "./components/Adding";
import Product from "./components/Product";

function App() {
  const [list, setList] = useState([]);
  const [button, setButton] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [removeDate, setRemoveDate] = useState(0);

  Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
  };

  const getNewProduct = (product) => {
    if (list.length === 0) {
      const newArr = [ product ];
      setList(newArr);
    } else if (list.length === 1) {
      const ind = list.findIndex(item => item["id"] > product["id"]);
      const newInd = list.findIndex(item => item["id"] === product["id"]);
      if (newInd !== -1) {
        let newArr = list;
        newArr[newInd]["list"].push(...product["list"]);
        setList(newArr)
      }
      if (ind === -1) {
        const newArray = [ ...list, product ];
        setList(newArray);
      } else {
        const newArray = [ product, ...list ];
        setList(newArray);
      }
    } else {
      const ind = list.findIndex(item => item["id"] > product["id"]);
      const newInd = list.findIndex(item => item["id"] === product["id"]);
      if (newInd !== -1) {
        let newArr = list;
        newArr[newInd]["list"].push(...product["list"]);
        setList(newArr)
      }
      if (ind === -1) {
        const newArray = [ ...list, product];
        setList(newArray);
      } else {
        const arrayStart = list.slice(0, ind);
        const arrayEnd = list.slice(ind);
        const array = [ ...arrayStart, product, ...arrayEnd];
        setList(array)
      }
    }
    console.log(list)
  };

  const removeAll = () => {
    const array = [];
    setList(array);
  };

  const disableButton = () => {
    setButton(!button);
  }

  const removeElement = (e) => {
    const newArr = list.filter(item => item["id"] !== e.target.id);
    setList(newArr);
  }

  const getCurrentCurrency = (e) => {
    setCurrentCurrency(e.target.value);
  }

  const filterCurrency = () => {
    const newArray = list.filter(item => item["list"][0]["currency"] !== currentCurrency );
    setList(newArray);
  }

  const getCurrentDate = (e) => {
    let newDate = e.target.value;
    newDate = `${newDate.substr(8, 2)}-${newDate.substr(5, 2)}-${newDate.substr(0, 4)}`;
    setRemoveDate(newDate);
  }

  const filterDate = () => {
    const newArray = list.filter(item => item["id"] !== removeDate );
    setList(newArray);
  }

  useEffect(() => {
    setTotalAmount(0);
    if (list) {
      list.map(item => {
        item["list"].map(it => {
          if (it["currency"] === "PLN") {
            const price = +it["price"];
            setTotalAmount(prev => prev + price);
          } else if (it["currency"] === "USD") {
            const price = it["price"] * 3.94;
            setTotalAmount(prev => prev + price);
          } else if (it["currency"] === "EUR") {
            const price = it["price"] * 4.63;
            setTotalAmount(prev => prev + price);
          } else {
            const price = it["price"] * 5.41;
            setTotalAmount(prev => prev + price);
          }
        })
      })
    }
  }, [list]);

  return (
    <div className="app">
      <Adding getNewProduct={getNewProduct}/>
      <div className="list">
        <div>
          <button className="btn" onClick={removeAll}>Clear All</button>
          <button className="btn" onClick={disableButton}>Remove</button>
        </div>
        <div className="removeCurrency">
          <button onClick={filterCurrency}>Remove all:</button>
          <form onChange={(e) => getCurrentCurrency(e)}>
            <input type="radio" value="PLN" name="currency" /> PLN
            <input type="radio" value="USD" name="currency" /> USD
            <input type="radio" value="EUR" name="currency" /> EUR
            <input type="radio" value="GBF" name="currency" /> GBF
          </form>
        </div>
        <div className="removeForDate">
          <button onClick={filterDate}>Remove all product by:</button>
          <input type="date" onChange={(e) => getCurrentDate(e)}/>
        </div>
        {list ? list.map(item => <Product remove={removeElement} button={button} item={item} />) : "Please, put first item, which you bought!"}
        <div className="totalAmount">Total amount: {totalAmount.toFixed(2)} PLN</div>
      </div>
    </div>
  );
}

export default App;
