/*
A. Print Array In Reverse
time limit per test1 second
memory limit per test256 megabytes
You are given an array of integers.

Print the elements of the array in reverse order.

Input
First line contains integer 𝑁
 (1≤𝑁≤105)
 — size of the array.
Second line contains 𝑁
 integers 𝐴1,𝐴2,…,𝐴𝑁
 (−109≤𝐴𝑖≤109)
.
Output
Print the elements of the array in reverse order.

Example
InputCopy
5
1 2 3 4 5
OutputCopy
5 4 3 2 1
*/
#include<iostream>

using namespace std;

int main(){
    int n;
    cin >> n;

    long long elements[n];

    for(int i = 0;i<n;i++){
        cin >> elements[i];
    }
    for(int i = n-1;i>=0;i--){
        cout << elements[i] <<" ";
    }
}