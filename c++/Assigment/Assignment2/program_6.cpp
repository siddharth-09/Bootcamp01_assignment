
// F 
/* Print table of N

input : 6
output :
6 * 1 = 6
6 * 2 = 6
6 * 3 = 6
.
.
.
6 * 10 = 60
*/

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int n;
    cin >> n;
    for(int i = 1 ; i<=10;i++){
        cout << n << " * " << i << " = " << (n*i) << endl;
    }
}


