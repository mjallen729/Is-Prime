import { useState } from "react"
import isPrime from "../services/isPrime.js"
//color for prime: #395B50
//color for composite: #FE5E41

const NumInfo = (props => {
    let num = props.num;

    const [resultColor, setResultColor] = useState('');
    const [result, setResult] = useState('');

    if (num.length < 1) {
        return;
    }

    console.log(isPrime.checkPrime(num));
    let res = JSON.parse(isPrime.checkPrime(num));

    if (res.error) {  // invalid number
        return (<p className="text-xl">{res.error}</p>);
    }

    let date = null;
    let user = null;

    if (res.DateAdded !== "null") {
        // FOUND in DB
        date = res.DateAdded.slice(0,10);
        user = res.User;

    } else if (res.DateAdded === "null") {
        // NOT FOUND in DB
        user = prompt('Congrats! You discovered a new number. Enter your name:');

        if (user == null || user.length <= 2) {
            alert('Invalid name, number not logged.');
            return (<p className="text-xl text-red-600">Username error!</p>);
            
        } else {
            res = JSON.parse(isPrime.addPrime(res.Number, res.IsPrime, user));

            date = res.DateAdded.slice(0, 10);
            user = res.User;

        }

    } else {
        return (<p className="text-xl text-red-600">Unknown error!</p>);

    }

    if (res.IsPrime === "true") {
        setResultColor('395B50');
        setResult('PRIME');

    } else if (res.IsPrime === "false") {
        setResultColor('FE5E41');
        setResult('COMPOSITE');

    }

    return (
        <div id="infocontent">
            <p className="text-2xl">{res.Number}</p>
            <br />
            <p className="text-xl">
                <span className={`text-[#${resultColor}]`}>{result}</span>
                <br />
                <span>Found By: {user}</span>
                <br />
                <span>Date: {date}</span>
            </p>
        </div>
    );

});

export default NumInfo;