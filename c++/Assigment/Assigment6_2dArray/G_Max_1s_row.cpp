#include<iostream>

using namespace std;

int main(){

    int n ,m;
    cin >> n >> m;

    int maxCount = 0;
    int rowIndex = -1;
    for(int i = 0;i<n;i++){
        int count = 0;
        for(int j = 0;j<m;j++){
            int x;
            cin >> x;
            if(x == 1){
                count++;
            }
        }
        if(count > maxCount){
        maxCount = count;
        rowIndex = i;
        }
    }
    cout << rowIndex;

}