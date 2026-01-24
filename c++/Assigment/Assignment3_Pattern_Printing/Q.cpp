// Q binary pyramid

/*

input : 6
output : 
0
10
010
1010
01010
101010
*/

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int n;
    cin >> n;
    bool isChange = false;//false = 0, true = 1
    for (int i = 1;i<=n;i++){
        if(i%2==0){
            isChange = true;
            for(int j = 1;j<=i;j++){
                cout << isChange;
                isChange = !isChange;
            }
            cout << endl;
        }
        else{
            isChange = false;
            for(int j = 1;j<=i;j++){
                cout << isChange;
                isChange = !isChange;
            }
            cout << endl;
        }
    }
}