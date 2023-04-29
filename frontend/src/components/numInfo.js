import { useState, useEffect } from "react"

const NumInfo = (props) => {
    const [resultColor, setResultColor] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        if (props.error) {
            return;
        }

        if (props.result === 'prime') {
            setResultColor('0dbf55');
            setResult('PRIME');

        } else if (props.result === 'composite') {
            setResultColor('FE5E41');
            setResult('COMPOSITE');
        }
    }, [props.error, props.result, props.user]);

    if (props.error) {
        return (
            <div id="infocontent">
                <p className="text-2xl text-red-700">{props.error}</p>
            </div>
        );
    }

    return (
        <div id="infocontent">
            <p className="text-3xl">{props.num}</p>
            <br /><br/>
            <p className="text-2xl">
                <span style={{color: `#${resultColor}`, fontWeight: "bold"}}>{result}</span>
                <br /><br/>
                <span>Found By: {props.user}</span>
                <br />
                <span>Date: {props.date}</span>
            </p>
        </div>
    );
}

export default NumInfo;