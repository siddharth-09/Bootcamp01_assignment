// G Hollow Rectangle
/*

        i j 
input : 6 4
output :

**** 1
*  * 2
*  * 3
*  * 4
*  * 5
**** 6


*/

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int n,m;
    cin >> n >> m;

    for(int i = 1;i<=n;i++){
        for(int j = 1;j<=m;j++){
            if(i == 1 || i == n){
                cout << "*";
            }
            else{
                if(j == 1 || j == m){
                    cout << "*";
                }
                else{
                    cout << " ";
                }
            }
        }
        cout << endl;
    }
}