// R. Vertical Traingle
/*

input : 4
Output : 
* 
* * 
* * * 
* * * * 
* * * 
* * 
* 



*/

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int n;
    cin >> n;
    //for upper triangle
    for(int i = 1;i<=n;i++){
        for(int j = 1;j<=i;j++){
            cout << "*";
            if(j!=i){
                cout << " ";
            }
        }
        cout << endl;
    }
    //for lower triangle
    for(int i = n-1;i>=1;i--){
        for(int j = 1;j<=i;j++){
            cout << "*";
            if(j!=i){
                cout << " ";
            }
        }
        cout << endl;
    }
}