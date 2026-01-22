
// K
/* Reverse a Number */
/*
    n = 123
    while(n > 0)
    back = n % 10;
    cout << back;
    n /= 10

*/

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    long long n;
    cin >> n;
    if(n == 0){
        cout << 0;
        return 0;
    }
    long long rev = 0;
    while( n > 0 ){
        long long back = n % 10;
        rev = (rev*10) + back;
        n = n / 10;
    }
    cout << rev << endl;
}



