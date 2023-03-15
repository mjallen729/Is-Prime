import http from './httpcommon.js'

class IsPrime {
    static checkPrime(num) {
        return http.get(`/api/num/${num}`)

    }

    static addPrime(num, isPrime, user) {
        return http.post(`/api/add?num=${num}&prime=${isPrime}&user=${user}`)

    }

}

export default IsPrime;