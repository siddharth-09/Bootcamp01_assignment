// J 
/* x^n 

input : 2 5
output : 32

2^5 = 2 * 2 * 2 * 2 * 2 = 32

*/

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int x,n;
    long long result = 1;
    cin >> x >> n;
    if(n == 0){
        result = 1;
    }
    else{
        for(int i = 1;i<=n;i++){
            result = result * x;
        }
        cout << result;
    }
}


