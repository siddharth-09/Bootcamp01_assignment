#include<iostream>
using std::cout;
using std::endl;
using std::cin;
// S. Inverted Vertical Triangle
/*
input : 5
* 
* * 
*   * 
*     * 
*       * 
*     * 
*   * 
* * 
* 

*/
int main(){
    int n;
    cin >> n;
    //for upper triangle
    for(int i = 1;i<=n;i++){
        for(int j = 1;j<=i;j++){
            if(i==1 || j == 1 || j == i){
                cout << "*";
                if(j!=i){
                    cout << " ";
                }
            }
            else{
                cout << " ";
            }
        }
        cout << endl;
    }
    //for lower triangle
    for(int i = n-1;i>=1;i--){
        for(int j = 1;j<=i;j++){
            if(i==1 || j == 1 || j == i){
                cout << "*";
                if(j!=i){
                    cout << " ";
                }
            }
            else{
                cout << " ";
            }
        }
        cout << endl;
    }
}