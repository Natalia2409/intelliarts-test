import React, { useState, useEffect } from "react";

function Adding({ getNewProduct }) {

    let currentDate = new Date();
    currentDate = currentDate.toISOString().substr(0, 10);

    const product = {};

    const [date, setDate] = useState(currentDate);
    const [name, setName] = useState("");
    const [currency, setCurrency] = useState("");
    const [price, setPrice] = useState(0);

    const handle = (e) => {
        let newDate = e.target.value;
        newDate = `${newDate.substr(8, 2)}-${newDate.substr(5, 2)}-${newDate.substr(0, 4)}`
        setDate(newDate);
    }

    const gettingPrice = (e) => {
        setPrice(e.target.value)
    }

    const gettingCurrency = (e) => {
        setCurrency(e.currentTarget.value);
    }

    const gettingName = (e) => {
        setName(e.target.value);
    }

    useEffect(() => {
        product.id = date;
        product.list = [];

        const prod = {};
        prod.name = name;
        prod.currency = currency;
        prod.price = price;

        product.list.push(prod);
    }, [date, name, currency, price]);

    return (
        <div className="form">
            <div className="form__wrap">
                <form className="form__input">
                    <label htmlFor="date">Take a date of your purchase:</label>
                    <input onChange={(e) => handle(e)} type="date" id="date"/>
                    <label htmlFor="price">Price of the purchace:</label>
                    <input onChange={(e) => gettingPrice(e)} type="number" id="price"/>
                    <label htmlFor="currency">Choose a currency</label>
                    <select onChange={(e) => gettingCurrency(e)} defaultValue="nth">
                        <option value="nth"></option>
                        <option value="PLN">PLN</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBF">GBF</option>
                    </select>
                    <label htmlFor="name">Put name of purchase:</label>
                    <input onChange={(e) => gettingName(e)} type="text" id="name"/>
                </form>
                <hr />
                <button onClick={() => getNewProduct(product)}>Add</button>
            </div>
        </div>
    )
}

export default Adding;
