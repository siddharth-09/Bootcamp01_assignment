#include<iostream>

using namespace std;

int main(){
    int n,size;
    cin >> n;
    for(int i = 0;i<n;i++){
        cin >> size;
        long long elements[size];
        for(int i = 1;i<=size;i++){
            elements[i] = i;
        }
        for(int i = 1;i<=size;i++){
            if(elements[i] % 2 != 0 ){
                cout << elements[i] << " ";
            }
        }
        for(int i = size;i>=2;i--){
            if(elements[i] % 2 == 0 ){
                cout << elements[i] << " ";
            }
        }
        cout << endl;
    }

}