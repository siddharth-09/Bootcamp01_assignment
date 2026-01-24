//K. Diamond
/*

given n as input integer

print diamond pattern consisting of 2n - 1 rows

input : 3

output: 
||*
|* *
* * *
|* *
||*

*/


#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){

    int n;
    cin >> n;

        for(int i = 1;i<=n-1;i++){
        //for space printing
        for(int k = n ; k > i ; k--){
            cout << " ";
        }
        //for Star printing
        for(int j = 1;j<=i;j++){
            cout << "*";
            if(j!=i){
                cout << " ";
            }
        }
        cout << endl;
    }
    //Inverse
     for(int i = 1;i<=n;i++){
        //for space print
        for(int k = 1;k < i;k++){
            cout << " ";
        }
        //for star print
        for(int j = n;j>=i;j--){
                cout << "*";
                if(j!=i){
                    cout << " ";
                }
        }
        cout << endl;
    }

}