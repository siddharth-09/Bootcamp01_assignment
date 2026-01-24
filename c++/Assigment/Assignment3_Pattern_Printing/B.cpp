
// B M Star
/*

input : 3 5
output : 

*****
*****
*****
    input will be row and how many stars to print in a row
    n m 

*/

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int n,m;
    cin >> n >> m;
    for(int i = 1;i<=n;i++){
        for (int j = 1; j <=m; j++)
        {
            cout << "*";
        }
        cout << endl;
    }
}