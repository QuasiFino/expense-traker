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

export const IncomeExpense = () => {
    const { transactions } = useContext(GlobalContext);
    console.log(transactions);
    const amounts = transactions.map((transaction) => transaction.amount);
    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => (acc += item), 0);
    const expense = amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">{moneyFormatter(income)}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">{moneyFormatter(expense)}</p>
            </div>
        </div>
    );
};
