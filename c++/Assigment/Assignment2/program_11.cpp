
// L 
/* Sum Of Digits */
/*

Given an integer 𝑁 , find the sum of its digits.

Input
A single integer 𝑁
 (0≤ 𝑁≤ 10^18)

Output:
Print the sum of digits of 𝑁

Input:
1234

Output:
10
*/

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    long long n;
    cin >> n;
    if(n == 0){
        cout << 0;
        return 0;
    }
    long long sum = 0;
    while(n>0){
        sum = sum + (n%10);
        n /= 10;
    }
    cout << sum;
}


