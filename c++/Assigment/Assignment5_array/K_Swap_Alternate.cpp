#include<iostream>

using namespace std;

int main(){
    int n,size;
    cin >> n;
    for(int i = 0;i<n;i++){
        cin >> size;
        long long elements[size];
        for(int i = 0;i<size;i++){
            cin >> elements[i];
        }
        for(int i = 1;i<size;i+=2){
            swap(elements[i],elements[i-1]);
        }
        for(int i = 0;i<size;i++){
            cout << elements[i]<<" ";
        }
        cout << endl;
    }
}