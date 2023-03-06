import db from '../database.js'

export default class IsPrimeController {
    static async checkPrime(req, res, next) {
        // make sure num is a valid number (isValid function)
        let num = this.isValid(req.params.num)
        
        if (num != false) {
            // access SQL DB to see if prime number has already been calculated
            let cached = db.checkForNum(num.toString(), (res) => {
                result = res;

                // if so: return IsPrime value from the sql table
                if (result.length == 1) {
                    return res[0]['IsPrime'];
                } else {
                    // if not: call C binary and return result and foundInDB= false; add to DB

                }
                
            });
        }


    }
    
    /*
    If num is a valid number it returns a formatted BigInt, else returns false
    */
    static isValid(num) {
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

}

function test() {
    console.log(IsPrimeController.isValid('1 0  as  0 , 0 00 ,0 00'));
    console.log(IsPrimeController.isValid('-10'));
    console.log(IsPrimeController.isValid('1 0    0 , 0 00 ,0 00'));
    console.log(IsPrimeController.isValid('100'));
    console.log(IsPrimeController.isValid('1'));

}
//test();