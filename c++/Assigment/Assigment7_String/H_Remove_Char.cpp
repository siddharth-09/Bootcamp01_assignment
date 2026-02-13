#include <iostream>
using namespace std;

int main() {
    string s;
    cin >> s;
    char a;
    cin >> a;
    for(int i = 0;i<s.length();i++){
        if(s[i] != a){
            cout << s[i];
        }
    }

}