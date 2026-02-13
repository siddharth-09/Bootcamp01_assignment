#include<iostream>

using namespace std;

int main(){
    int n;
    cin >> n;
    long long elements[n];
    for(int i = 0;i<n;i++){
        cin >> elements[i];
    }
    int p = 0;
    int q = n-1;
    for(int i = 0;i<n;i++){
        if(p < q){
            swap(elements[p],elements[q]);
            p++;
            q--;
        }
    }
    for(int i = 0;i<n;i++){
        cout << elements[i] << " ";
    }
}