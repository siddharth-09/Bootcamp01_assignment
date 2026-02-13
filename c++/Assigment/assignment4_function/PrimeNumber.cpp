#include<iostream>

using namespace std;

bool isPrime(int n){
    int count = 0;
    for(int i = 1;i<=n;i++){
        if(n % i == 0){
            count++;
        }
    }
    return count == 2;
}

void primeNumber(int n){

    for(int i = 2;i<=n;i++){
        if(isPrime(i)){
            cout << i << " ";
        }
    }
}

int main(){

    int n;
    cin >> n;
    primeNumber(n);
}

