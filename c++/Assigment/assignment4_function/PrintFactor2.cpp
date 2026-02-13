#include<iostream>

using namespace std;

void PrintFactor(int n){
    for(int i = n;i>=1;i--){
        if(n % i == 0){
            cout << i << " ";
        }
    }
}

int main(){
    int n;
    cin >> n;
    PrintFactor(n);
}