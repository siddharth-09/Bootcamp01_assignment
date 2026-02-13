

#include<iostream>

using namespace std;

int main(){
    int n;
    long long x;
    cin >> n;
    long long elements[n];

    bool flag = true;

    for(int i = 0;i<n;i++){
        cin >> elements[i];
    }

    for(int i = 0;i<n-1;i++){
        if(elements[i] > elements[i+1]){
            flag = false;
            break;
        }
    }
    if(flag){
        cout << "YES";
    }
    else{
        cout << "NO";
    }
}