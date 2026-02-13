#include <iostream>
using namespace std;

int main() {
    string A,B;
    cin >> A >> B;
    if(A < B){
        cout << "A";
    }else if(B < A){
        cout << "B";
    }else{
        cout << "Equal";
    }

}