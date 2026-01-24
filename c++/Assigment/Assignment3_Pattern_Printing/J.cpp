// J. Inverted Hollow Triangle
/*
input : 5
output :
* * * * *
|* | | *
||* | *
|||* *
||||*



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
    
    //row printing
    for(int i = 1;i<=n;i++){
        //for space print
        for(int k = 1;k < i;k++){
            cout << " ";
        }
        //for star print
        for(int j = n;j>=i;j--){
            if(i == 1 || i == n || j == n || j == i){
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