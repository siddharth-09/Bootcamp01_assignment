
// H 
/* Sum of first N natural Numbers */

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int n;
    cin >> n;
    if(n<1){
        return 0;
    }
    long long sum = 0;

    for(int i = 1;i<=n;i++){
        sum = sum + i;
    }
    cout << sum;
}