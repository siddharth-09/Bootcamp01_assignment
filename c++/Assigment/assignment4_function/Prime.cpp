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

int main(){
    int n;

    cin >> n;
    if(isPrime(n)){
        cout << "Prime";
    }
    else{
        cout << "Not Prime";
    }

}