import './App.css';
import {useState} from "react"
import NumInfo from './components/NumInfo.js';
import isPrime from "../services/isPrime.js";

function App() {
    const [inputVal, setInputVal] = useState('Enter a number...');
    const [curInput, setCurInput] = useState('');
    const [result, setResult] = useState('');

    function resetInput() {
        setInputVal('Enter a number...');
    }

    const keyPressEvent = (event) => {
        if (event.key === 'Enter') {
            console.log('ENTER');  //TODO press the check button
        }
    }

    function render() {
        //call api and setResult to response JSON
        // use isPrime import
        // make sure to replace NumInfo component
        let c = isPrime.checkPrime(curInput).then(response => {
            return response.data;

        }).then(data => {

        })

    }

    return (
        <div className="App h-screen">
            <div className="flex h-1/6 bg-blue-700 items-center justify-center">
                <h1 className="font-bold text-4xl md:text-5xl text-white">
                    Prime Finder
                </h1>
            </div>

            <div id="content" className="flex flex-col pt-[64px] items-center">
                <input id="inputbox" 
                    type="text" 
                    placeholder={inputVal} 
                    onFocus={(e) => {setInputVal(''); e.target.value = '';}}
                    onBlur={resetInput}
                    onKeyDown={keyPressEvent}
                    onChange={e => setCurInput(e)}
                    className="w-[300px] md:w-[450px] h-[55px] text-2xl md:text-3xl text-center" maxLength="20"
                />

                <button id="submitbutton" 
                    className="bg-[#001011] text-xl text-center rounded-full 
                        text-white h-[55px] w-[220px] mt-[40px]"
                    onClick={render}>
                        Check!
                </button>

                <div id="infobox" className="w-[325px] md:w-[450px] mt-[80px] text-center">
                    <NumInfo num={result} />
                </div>

            </div>
        </div>
    );
}

export default App;
