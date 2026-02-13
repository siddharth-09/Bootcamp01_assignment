

#include<iostream>

using namespace std;

int main(){
    int n;
    cin >> n;

    for(int i = 0;i<n;i++){
        int size;
        cin >> size;
        int array[size];
        int count0 = 0;
        int count1 = 0;
        for(int i = 0;i<size;i++){
            cin >> array[i];
        }
        for(int i = 0;i<size;i++){
            if(0 == array[i]){
                count0++;
            }
            else{
                count1++;
            }
        }
        for(int i = 0;i<count0;i++){
            cout << 0 << " ";
        }
        for(int i = 0;i<count1;i++){
            cout << 1 << " ";
        }
        cout << endl;
    }
}