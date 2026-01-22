// Palindrome

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    long long n;
    cin >> n;
    if(n == 0){
        cout << "YES";
        return 0;
    }
    else{
        long long temp = n;
        long long rev = 0;
        while( n > 0 ){
            long long back = n % 10;
            rev = (rev*10) + back;
            n = n / 10;
        }
        if(rev == temp){
            cout << "YES";
        }
        else{
            cout << "NO";
        }
    }
}
