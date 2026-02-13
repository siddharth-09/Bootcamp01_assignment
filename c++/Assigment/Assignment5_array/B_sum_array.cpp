

#include<iostream>

using namespace std;

int main(){
    int n;

    cin >> n;

    long long elements[n];
    long long sum = 0;
    for(int i = 0;i<n;i++){
        cin >> elements[i];
        sum = sum + elements[i];
    }
    cout << sum;
}