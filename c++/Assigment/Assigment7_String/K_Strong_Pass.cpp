#include <iostream>
using namespace std;

int main() {
    string s;
    cin >> s;
    int length = s.length();
    if(length == 10){
        bool hasUpper = false;
        bool hasLower = false;
        bool hasDigit = false;
        bool hasSpecial = false;
        for(int i = 0;i<length;i++){
            if(s[i]>='A' && s[i]<='Z'){
                hasUpper = true;
            }else if(s[i]>='a' && s[i]<='z'){
                hasLower = true;
            }else if(s[i]>='0' && s[i]<='9'){
                hasDigit = true;
            }
            else{
                hasSpecial = true;
            }
        }
        if(hasUpper && hasDigit && hasLower && hasSpecial){
            cout << "Strong";
        }else{
            cout << "Weak";
        }
    }else{
        cout << "Weak";
    }
}