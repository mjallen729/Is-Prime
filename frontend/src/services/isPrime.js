import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config('../../.env');
let url = 'localhost:5100';
let header = {'key': process.env.APIKEY};

class IsPrime {
    checkPrime(num) {
        return fetch(`${url}/api/num/${num}`, {
            method: 'GET', 
            headers: header
        });

    }

    addPrime(num, isPrime, user) {
        return fetch(`${url}/api/add?num=${num}&prime=${isPrime}&user=${user}`, {
            method: 'POST',
            headers: header
        });

    }

}

export default new IsPrime();