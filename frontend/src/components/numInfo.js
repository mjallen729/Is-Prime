import { useState } from "react"
import isPrime from "../services/isPrime.js"
//color for prime: #395B50
//color for composite: #FE5E41

const NumInfo = (props) => {
    let num = props.num;

    const [resultColor, setResultColor] = useState('');
    const [result, setResult] = useState('');

    if (num.length < 1) {
        return;
    }

    let v = isPrime.checkPrime(num).then(response => {
        return response.data;

    }).then(data => {
        if (data.error) {  // invalid number
            return (<p className="text-xl">{data.error}</p>);
        }

        let date = null;
        let user = null;

        if (data.DateAdded !== "null") {
            // FOUND in DB
            console.log(data);
            date = data.DateAdded.slice(0, 10);
            user = data.User;

        } else if (data.DateAdded === "null") {
            // NOT FOUND in DB
            user = prompt('Congrats! You discovered a new number. Enter your name:');

            if (user == null || user.length <= 2) {
                alert('Invalid name, number not logged.');
                return (<p className="text-xl text-red-600">Username error!</p>);

            } else {
                let res = isPrime.addPrime(data.Number, data.IsPrime, user).data;

                date = res.DateAdded.slice(0, 10);
                user = res.User;

            }

        } else {
            return (<p className="text-xl text-red-600">Unknown error!</p>);

        }

        if (data.IsPrime === "true") {
            setResultColor('395B50');
            setResult('PRIME');

        } else if (data.IsPrime === "false") {
            setResultColor('FE5E41');
            setResult('COMPOSITE');

        }

        return (
            <div id="infocontent">
                <p className="text-2xl">{data.Number}</p>
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
    })

}

export default NumInfo;