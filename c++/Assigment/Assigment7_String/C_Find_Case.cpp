#include<iostream>

using namespace std;

/*
Lowercase
Uppercase
Digit
Special
*/
int main(){
    char ch;
    cin >> ch;
    if(ch>='a' && ch<='z'){
        cout << "Lowercase";
    }
    else if(ch>='A' && ch<='Z'){
        cout << "Uppercase";
    }
    else if(ch>='0' && ch<='9'){
        cout << "Digit";
    }else{
        cout << "Special";
    }
}