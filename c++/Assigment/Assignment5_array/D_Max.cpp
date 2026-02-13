

#include<iostream>

using namespace std;

int main(){
    int n;
    cin >> n;

    long long elements[n];
    for(int i = 0;i<n;i++){
        cin >> elements[i];
    }
    long long max = elements[0];
    int position = 1;

    for(int i = 0;i<n;i++){
        if(max < elements[i]){
            max = elements[i];
            position = i+1;
        }
    }
    cout << max << " " << position;
}