import './App.css';
import {useState} from "react"
import NumInfo from './components/NumInfo.js';
import isPrime from "./services/isPrime.js";

function App() {
    const [inputVal, setInputVal] = useState('Enter a number...');
    const [curInput, setCurInput] = useState('');
    const [result, setResult] = useState({
        num: null,
        result: null,
        date: null,
        user: null,
        error: null
    });

    function resetInput() {
        setInputVal('Enter a number...');
    }

    const handleInputChange = (event) => {
        setCurInput(event.target.value);
    };

    let lock = false; // make sure render cannot be spammed
    function render() {
        //call api and setResult to response JSON
        //result state is passed to NumInfo component for rendering
        if (lock || curInput.length < 1) {
            console.log('oof')
            return;
        }
        lock = true;

        let content = {
            num: null,
            result: null,  // prime or composite
            date: null,
            user: null,
            error: null  // if there's an error this will exist
        }
        
        isPrime.checkPrime(curInput).then(response => {
            return response.data;

        }).then(data => {
            if (data.error) {  // invalid number
                // set result to error
                content['error'] = data.error;

            } else if (data.DateAdded !== "null") {
                // number found in DB (already exists)
                console.log(data);
                content['date'] = data.DateAdded.slice(0, 10);
                content['user'] = data.User;
                content['num'] = data.Number;

                if (data.IsPrime === 'true') {
                    content['result'] = 'prime';

                }

                if (data.IsPrime === 'false') {
                    content['result'] = 'composite';

                }

            } else if (data.DateAdded === "null") {
                // NOT FOUND in DB (does not exist)
                let user = prompt('Congrats! You discovered a new number. Enter your name:');

                if (user == null || user.length <= 2) {
                    alert('Invalid name, number not logged.');
                    content['error'] = 'Username error';

                } else {
                    isPrime.addPrime(data.Number, data.IsPrime, user).then(response => {
                        return response.data;

                    }).then(dat => {
                        content['date'] = dat.DateAdded.slice(0,10);
                        content['user'] = dat.User;
                        content['num'] = data.Number;

                        if (dat.IsPrime === 'true') {
                            content['result'] = 'prime';

                        }

                        if (dat.IsPrime === 'false') {
                            content['result'] = 'composite';

                        }

                    })

                }

            } else {
                content['error'] = 'Unknown error';

            }

            setResult({
                num: content.num,
                result: content.result,
                date: content.date,
                user: content.user,
                error: content.error
            });

            lock = false;
        })
    }

    const keyPressEvent = (event) => {
        if (event.key === 'Enter') {
            render()
        }
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
                    onChange={handleInputChange}
                    className="w-[300px] md:w-[450px] h-[55px] text-2xl md:text-3xl text-center" maxLength="20"
                />

                <button id="submitbutton" 
                    className="bg-[#001011] text-xl text-center rounded-full 
                        text-white h-[55px] w-[220px] mt-[40px]"
                    onClick={render}>
                        Check!
                </button>

                <div id="infobox" className="w-[325px] md:w-[450px] mt-[50px] text-center">
                    <NumInfo {...result} />
                </div>

            </div>
        </div>
    );
}

export default App;
