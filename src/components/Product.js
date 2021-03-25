import React from "react";

function Product({ item, button, remove }) {

    const {id, list} = item;
    console.log(item)

    return (
        <div className="product">
            <div className="product__date">{id}</div>
            <div className="mainBlock">
            {list ? list.map(item => {
                return (
                    <div className="product__block">
                        <div className="product__block__name">{item.name}</div>
                        <div className="product__price">
                            <p>{item.price}</p>
                            <p>{item.currency}</p>
                            {button ? <button id={id} onClick={(e) => remove(e)} className="remove">&#10006;</button> : ""}
                        </div>
                    </div>
                )
            }) : ""}
            </div>
        </div>
    )
}

export default Product;
