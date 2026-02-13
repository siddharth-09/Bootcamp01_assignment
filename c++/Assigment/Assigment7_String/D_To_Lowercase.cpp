#include<iostream>

using namespace std;

int main(){
    char ch;
    cin >> ch;
    if(ch>='A' && ch<='Z'){
        cout << char(int(ch)+32) << endl;
    }else{
        cout << ch << endl;
    }

}