import db from '../database.js'

/*
If num is a valid number it returns a formatted BigInt, else returns false
*/
function isValid(num) {
    num = num.replaceAll(',', '');
    num = num.replaceAll(' ', '');

    try {
        let large = BigInt(num);

        if (large <= 2n || large > 18446744073709551615n || large % 1n != 0) {
            throw new Error(`Invalid number: ${num}`);

        }

        return large;

    } catch (e) {
        console.log(`Error parsing number: ${e}`);
        return false;

    }

}
export default class IsPrimeController {
    static async checkPrime(req, res, next) {
        // make sure num is a valid number (isValid function)
        let num = isValid(req.params.n)
        
        if (num != false) {
            // access SQL DB to see if prime number has already been calculated
            let cached = db.checkForNum(num.toString(), (reslt) => {
                if (reslt.length == 1) {
                    // if so: return IsPrime value from the sql table
                    res.json(reslt[0]);

                } else {
                    // if not: call C binary and return result and foundInDB= false; add to DB

                }

            });
        }


    }
}

function test() {
    console.log(IsPrimeController.isValid('1 0  as  0 , 0 00 ,0 00'));
    console.log(IsPrimeController.isValid('-10'));
    console.log(IsPrimeController.isValid('1 0    0 , 0 00 ,0 00'));
    console.log(IsPrimeController.isValid('100'));
    console.log(IsPrimeController.isValid('1'));

}
//test();