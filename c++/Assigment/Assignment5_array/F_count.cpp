

#include<iostream>

using namespace std;

int main(){
    int n;
    long long x;
    cin >> n >> x;
    long long elements[n];
    int count = 0;
    for(int i = 0;i<n;i++){
        cin >> elements[i];
        if(x == elements[i]){
            count++;
        }
    }
    cout << count;
}