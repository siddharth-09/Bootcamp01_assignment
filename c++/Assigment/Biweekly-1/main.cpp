#include<iostream>
 
/*
x
 xx
  xxx
   xxxx
    xxxxx
 
*/
using std::cin;
using std::cout;
using std::endl;
 
int main(){
    int n;
    cin >> n;
 
    for(int i = 1;i<=n-1;i++){
        for(int k = 1;k<i;k++){
            cout << " ";
        }
        for(int j = 1;j<=i;j++){
            if(j == 1 || j == i){
                if(j==i){
                    cout << ">";
                }else{
                    cout << "> ";
                }
            }else{
                cout << "  ";
            }
        }
       cout << endl;
    }

    //downward
    for(int i = 1;i<=n;i++){
        for(int k = n;k>i;k--){
            cout << " ";
        }
        for(int j = i;j<=n;j++){
            if( j == i || j == n){
                if(j == n){
                    cout << ">";
                }else{
                    cout << "> ";
                }
            }
            else{
                cout << "  ";
            }
        }
        cout << endl;
    }
}