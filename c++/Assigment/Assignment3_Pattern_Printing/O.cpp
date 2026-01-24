// O. Butterfly
/*


input : 8
*              *
**            **
***          ***
****        ****
*****      *****
******    ******
*******  *******
****************
*******  *******
******    ******
*****      *****
****        ****
***          ***
**            **
*              *

*/

#include<iostream>

using std::cout;
using std::cin;
using std::endl;

int main(){
    int n;

    cin >> n;

    //for right side triangle
    for(int i = 1;i<=n-1;i++){
        for(int j = 1;j<=i;j++){
            cout<<"*";
        }
        //space
        for(int k = ((n*2)-(i*2));k>=1;k--){
            cout << " ";
        }
        for(int j = 1;j<=i;j++){
            cout<<"*";
        }
        cout<<endl;
    }
    //inverse
    for(int i = n;i>=1;i--){
        for(int j = 1;j<=i;j++){
            cout<<"*";
        }
        //space
        for(int k = ((n*2)-(i*2));k>=1;k--){
            cout << " ";
        }
        for(int j = 1;j<=i;j++){
            cout<<"*";
        }
        cout<<endl;
    }
}
