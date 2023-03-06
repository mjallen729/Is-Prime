import db from '../database.js'
import {exec} from 'child_process'

/*
If num is a valid number it returns a formatted string, else returns false
num: str
*/
function isValid(num) {
    num = num.replaceAll(',', '');
    num = num.replaceAll(' ', '');

    try {
        let large = BigInt(num);

        if (large < 1n || large > 18446744073709551615n) {
            console.log(`Invalid number: ${num}`);
            return false;

        }

        return num;

    } catch (e) {
        console.log(`Error parsing number: ${e}`);
        return false;

    }

}

export default class IsPrimeController {
    static async add(req, res, next) {
        let num = req.query.num;
        let isPrime = req.query.prime;
        let user = req.query.user;

        try {
            console.log(`Add ${num}`)
            db.addNum(num, isPrime, user);
            res.json({Number: num, IsPrime: isPrime, User: user});

        } catch (e) {
            res.json({error: `${e}`});
        }

    }

    static async checkPrime(req, res, next) {
        // make sure num is a valid number (isValid function)
        let num = isValid(req.params.num)
        
        if (num != false) {  // valid
            // access SQL DB to see if number has already been calculated
            let cached = db.checkForNum(num, (reslt) => {
                if (reslt.length >= 1) {
                    // if so: return the number's entry (row) from the sql DB
                    console.log(`Found ${num}`);
                    res.json(reslt[0]);

                } else {
                    // if not: call C binary and return result
                    exec(`./bin/is_prime ${num}`, (err, out, serr) => {
                        if (err) throw err;
                        
                        console.log(`New ${out}`);
                        res.json(JSON.parse(out));

                    });
                }
            });
        }


    }

}

function test() {
    console.log(isValid('1 0  as  0 , 0 00 ,0 00'));
    console.log(isValid('-10'));
    console.log(isValid('1 0    0 , 0 00 ,0 00'));
    console.log(isValid('100'));
    console.log(isValid('1'));
    console.log(isValid('1.22343'));

}
//test();