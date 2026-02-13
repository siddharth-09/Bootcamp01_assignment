#include<iostream>

using namespace std;

int main(){

    int n,m;
    cin >> n >> m;
    int arr[n][m];
    for(int i = 0;i<n;i++){
        for(int j = 0;j<m;j++){
            cin >> arr[i][j];
        }
    }
    // // upper row

    for(int i = 0;i<1;i++){
        for(int j = 0;j<m;j++){
            cout << arr[i][j] << " ";
        }
    }

    // //only Right row

    for(int i = m-1;i>m-2;i--){
        for(int j = 0;j<n;j++){
            if(j < n-1 && j > 0){
                cout << arr[j][i] << " ";
            }
        }
    }

    //Bottom Row
    if(n > 1){
        for(int j = m-1;j>=0;j--){
            cout << arr[n-1][j] << " ";
        }
    }
    
    //left row
    if(m > 1){
        for(int i = n-2;i>=1;i--){
            cout << arr[i][0] << " ";
        }
    }
}


