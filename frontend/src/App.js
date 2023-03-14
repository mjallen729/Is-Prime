import './App.css';
import {useState} from "react"

function App() {
    const [inputVal, setInputVal] = useState('Enter a number...');

    function resetInput() {
        setInputVal('Enter a number...');
    }

    const keyPressEvent = (event) => {
        if (event.key === 'Enter') {
            console.log('ENTER');
        }
    }

    return (
        <div className="App h-screen">
            <div className="flex h-1/6 bg-blue-700 items-center justify-center">
                <h1 className="font-bold text-5xl text-white">Prime Finder</h1>
            </div>

            <div id="content" className="flex flex-col flex-wrap bg-red-200 pt-[64px] items-center">
                <input type="text" placeholder={inputVal} onFocus={(e) => {setInputVal(''); e.target.value = ''; }} onBlur={resetInput}
                onKeyDown={keyPressEvent} className="w-[450px] h-[55px] text-3xl text-center outline outline-[3px]
                outline-blue-700 rounded-full"/>

                <button className="bg-blue-700 text-xl text-center rounded-full text-white 
                h-[55px] w-[300px] mt-[40px]" id="submitbutton">Check!</button>

                <div id="infobox" className="w-[450px] mt-[80px]">

                </div>
            </div>
        </div>
    );
}

export default App;
