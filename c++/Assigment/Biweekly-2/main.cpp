#include<iostream>

using namespace std;


int main(){
    int n;
    cin>> n;
    long long elements[n];
    for(int i = 0;i<n;i++){
        cin >> elements[i];
    }
    for(int i = 0;i<n;i++){
        int count = 0;
        for(int j = 0;j<n;j++){
            if(elements[i] == elements[j]){
                count++;
            }
        }
        if(count == 1){
            cout << elements[i] << " ";
        }
    }
}