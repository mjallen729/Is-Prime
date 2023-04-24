import { useState } from "react"
//color for prime: #395B50
//color for composite: #FE5E41

const NumInfo = (props) => {
    const [resultColor, setResultColor] = useState('');
    const [result, setResult] = useState('');

    if (props['error']) {
        return (
            <div id="infocontent">
                <p className="text-2xl">{props['error']}</p>
            </div>
        );
    }

    if (props['result'] === 'prime') {
        setResultColor('395B50');
        setResult('PRIME');

    } else if (props['result'] === 'composite') {
        setResultColor('FE5E41');
        setResult('COMPOSITE');

    }

    return (
        <div id="infocontent">
            <p className="text-2xl">{props['num']}</p>
            <br />
            <p className="text-xl">
                <span className={`text-[#${resultColor}]`}>{result}</span>
                <br />
                <span>Found By: {props['user']}</span>
                <br />
                <span>Date: {props['date']}</span>
            </p>
        </div>
    );

}

export default NumInfo;