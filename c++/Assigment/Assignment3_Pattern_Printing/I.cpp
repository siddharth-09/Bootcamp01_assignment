// I  Hollow Triangle
/*
input : 5
output :
||||*
|||* *
||*   *
|*     *
* * * * *
i -> row
j -> star printing
k -> Space printing
*/

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int n;
    cin >> n;
    //for row print
    for(int i = 1;i<=n;i++){
        //for space printing
        for(int k = n ; k > i ; k--){
            cout << " ";
        }
        //for Star printing
        for(int j = 1;j<=i;j++){
            if (i == 1 || i == n || j == 1 || j == i){
                cout << "*";

                if(j!=i){
                    cout << " ";
                }
            }
            else{
                    cout << "  ";
                }
        }
        cout << endl;
    }
}