//
// I 
/* Factorial */

#include<iostream>
using std::cout;
using std::endl;
using std::cin;


long long factorial(int n){
    if(n == 0 || n == 1){
        return 1;
    }
    return (n * factorial(n-1));
}


int main(){
    int n;
    cin >> n;
    if(n>20){
        return 0;
    }
    long long result = factorial(n);
    cout << result;
}