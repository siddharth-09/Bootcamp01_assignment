// F Hollow Square

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int n;
    cin >> n;

    for(int i = 1;i<=n;i++){
        for(int j = 1;j<=n;j++){
            if(i == 1 || i == n){
                cout << "*";
            }
            else{
                if(j == 1 || j == n){
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