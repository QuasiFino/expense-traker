import React from 'react';
import { useContext } from 'react/cjs/react.development';
import { GlobalContext } from '../context/GlobalState';

// Money formatter function
function moneyFormatter(num) {
    let p = num.toFixed(2).split("."); //for 550 returns [ "550", "00" ]
    return (
        " ₹ " + 
        p[0]
            .split("") //[ "5", "5", "0" ]
            .reverse() //[ "0", "5", "5" ]
            .reduce(function (acc, num, i, orig) {
                return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;

        }, "") +
        "." +
        p[1]
    );
}

export const Balance = () => {
    const {transactions} = useContext(GlobalContext);
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);

    return (
        <>
            <h4>Your Balance</h4>
            <h1>{moneyFormatter(total)}</h1>
        </>
    );
};
