// #include<iostream>

// int main(){
//     int n;
//     int i = 1;
//     std::cin >> n;
//     while(i<=n){
//         std::cout << i << std::endl;
//         i++;
//     }
// }

//---------------

// #include<iostream>

// int main(){
//     int n;
//     std::cin >> n;
//     for (int i = n; i >= 1; i--)
//     {
//         std::cout << i << " ";
//     }
    
// }

//---------------

//Print 1 to n even number
// input 10
// output : 2 4 6 8 10
// 
// #include<iostream>

// int main(){

//     int n;

//     std::cin >> n;
//     for(int i = 1;i<=n;i++){
//         if (i % 2 == 0)
//         {
//             std::cout << i << " ";
//         }
//     }
//     return 0;
// }

//----------------------------------------------------------------

// D
// You are given two integers 𝐿 and 𝑅 . Print all integers from 𝐿 to 𝑅 in increasing order.

// Input
// The first line contains two integers 𝐿 and 𝑅
//  (−10^5 ≤𝐿 ≤ 𝑅≤ 10^5).

// Output
// Print all integers from 𝐿 to 𝑅, separated by spaces.

// Example
// Input Copy
// 3 7
// Output Copy
// 3 4 5 6 7

// #include <iostream>

// int main()
// {
//     int L, R;

//     std::cin >> L >> R;

//     for (L; L <= R; L++)
//     {
//         std::cout << L << " ";
//     }
// }

//----------------------------------------------------------------

// E
/* Print All Uppercase Alphabets */

// #include<iostream>

// int main(){
//     int ascii_value = int('A');
//     int i = 1;
//     while(i<=26){
//         std::cout << char(ascii_value) << " ";
//         ascii_value++;
//         i++;
//     }
// }

//----------------------------------------------------------------

//G
/* Count Numbers 

output : 
Number of positive integers
Number of negative integers
Number of even integers
Number of odd integers


input : 5
        -2 -3 0 6 7
output : 
2
2
3
2
*/

// #include<iostream>
// using std::cout;
// using std::endl;
// using std::cin;
// int main(){

//     int n;
//     std::cin >> n;
//     int list = 0;
//     int postive_number = 0;
//     int negative_number = 0;
//     int even_number = 0;
//     int odd_number = 0;

//     for(int i = 1;i<=n;i++){
//         std::cin >> list;
//         if(list > 0){ //Postive number(even or odd)
//             postive_number++;
//             if(list%2 == 0){
//                 even_number++;
//             }
//             else{
//                 odd_number++;
//             }
//         }
//         else if(list < 0){ //Negative number(even or odd)
//             negative_number++;
//             if(list%2 == 0){
//                 even_number++;
//             }
//             else{
//                 odd_number++;
//             }
//         }
//         else if(list == 0 ){ // Zero is even number
//             even_number++;
//         }
//     }
    
//    cout << postive_number << endl << negative_number << endl << even_number << endl << odd_number;
// }

//------------------------------------------------------------------------------------------------

// F 
/* Print table of N

input : 6
output :
6 * 1 = 6
6 * 2 = 6
6 * 3 = 6
.
.
.
6 * 10 = 60
*/

// #include<iostream>
// using std::cout;
// using std::endl;
// using std::cin;

// int main(){
//     int n;
//     cin >> n;
//     for(int i = 1 ; i<=10;i++){
//         cout << n << " * " << i << " = " << (n*i) << endl;
//     }
// }


//------------------------------------------------------------------------------------------------

// H 
/* Sum of first N natural Numbers */

// #include<iostream>
// using std::cout;
// using std::endl;
// using std::cin;

// int main(){
//     int n;
//     cin >> n;
//     if(n<1){
//         return 0;
//     }
//     long long sum = 0;

//     for(int i = 1;i<=n;i++){
//         sum = sum + i;
//     }
//     cout << sum;
// }


//--------------------------------------------------------------------------------------------------------------------------------
//
// I 
/* Factorial */

// #include<iostream>
// using std::cout;
// using std::endl;
// using std::cin;


// long long factorial(int n){
//     if(n == 0 || n == 1){
//         return 1;
//     }
//     return (n * factorial(n-1));
// }


// int main(){
//     int n;
//     cin >> n;
//     if(n>20){
//         return 0;
//     }
//     long long result = factorial(n);
//     cout << result;
// }



//------------------------------------------------------------------------------------------------
// J 
/* x^n 

input : 2 5
output : 32

2^5 = 2 * 2 * 2 * 2 * 2 = 32

*/

// #include<iostream>
// using std::cout;
// using std::endl;
// using std::cin;

// int main(){
//     int x,n;
//     long long result = 1;
//     cin >> x >> n;
//     if(n == 0){
//         result = 1;
//     }
//     else{
//         for(int i = 1;i<=n;i++){
//             result = result * x;
//         }
//         cout << result;
//     }
// }


//------------------------------------------------------------------------

// K
/* Reverse a Number */
/*
    n = 123
    while(n > 0)
    back = n % 10;
    cout << back;
    n /= 10

*/

// #include<iostream>
// using std::cout;
// using std::endl;
// using std::cin;

// int main(){
//     long long n;
//     cin >> n;
//     if(n == 0){
//         cout << 0;
//         return 0;
//     }
//     long long rev = 0;
//     while( n > 0 ){
//         long long back = n % 10;
//         rev = (rev*10) + back;
//         n = n / 10;
//     }
//     cout << rev << endl;
// }



//------------------------------------------------------------------------

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

// #include<iostream>
// using std::cout;
// using std::endl;
// using std::cin;

// int main(){
//     long long n;
//     cin >> n;
//     if(n == 0){
//         cout << 0;
//         return 0;
//     }
//     long long sum = 0;
//     while(n>0){
//         sum = sum + (n%10);
//         n /= 10;
//     }
//     cout << sum;
// }


//-----------------------------------------------------------------------------------------------------------------------


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