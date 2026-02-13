#include <iostream>
using namespace std;

int main() {
    string s;
    cin >> s;
    string copy = s;
    reverse(s.begin(),s.end());
    if(copy == s){
        cout << "YES";
    }else{
        cout <<"NO";
    }
}