

#include<iostream>

using namespace std;

int main(){
    int n;
    long long x;
    cin >> n >> x;
    long long elements[n];
    bool flag = false;
    for(int i = 0;i<n;i++){
        cin >> elements[i];
        if(x == elements[i]){
            cout << "YES";
            flag = true;
            break;
        }
    }
    if(flag == false){
        cout << "NO";
    }
}