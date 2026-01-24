
// A 2 Star
/*

input : 5
output : 
**
**
**
**
**

*/

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int n;
    cin >> n;
    for(int i = 1;i<=n;i++){
        cout << "**" << endl;
    }
}