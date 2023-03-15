// Primality test implemented using gmp mpz_probab_prime_p
// Returns 0 (false; not prime) or 1 (true; prime)
// Compile: gcc is_prime.c -o is_prime -lgmp
#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <string.h>
#include <gmp.h>

int isPrimeProb(unsigned long int l) {
    mpz_t bigInt;
    mpz_init_set_ui(bigInt, l);

    int ret = mpz_probab_prime_p(bigInt, 50);
    mpz_clear(bigInt);

    return ret;

}

int main(int argc, char** argv) {
    // unsigned long int has 20 digits
    // unsigned long max_value = 18446744073709551615
    int test = 0;
    if (test == 1) {
        unsigned long int primes[] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 
        53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 
        131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 
        199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 
        281, 283, 293, 1012345678901};

        double avg = 0;
        for (int i = 0; i < sizeof(primes) / sizeof(unsigned long int); ++i) {
            clock_t t;
            t = clock();
            int prime = isPrimeProb(primes[i]);
            t = clock() - t;

            double runtime = ((double)t) / CLOCKS_PER_SEC;

            avg = (avg * (i + 1) + runtime) / (i + 1);
            printf("%fs\n", runtime);
            
            if (prime < 1) {
                printf("Error on %ld\n", primes[i]);
                return 0;

            }

        }

        printf("AVG: %fs", avg);

        return 0;
    }

    char* end;
    unsigned long int num = strtoul(argv[1], &end, 10);

    clock_t t;
    t = clock();
    int prime = isPrimeProb(num);
    t = clock() - t;

    double runtime = ((double) t) / CLOCKS_PER_SEC;
    char* primeb;

    if (prime == 0) {
        primeb = "false";  // false
    } else {
        primeb = "true";  // true
    }

    printf("{\"Number\": \"%s\", \"IsPrime\": \"%s\", \"DateAdded\": \"null\", \"Took\": %f}", argv[1], primeb, runtime);

    return 0;
    
}