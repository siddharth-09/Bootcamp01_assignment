#include<iostream>

using namespace std;

int main(){
    long long x,y;
    cin >> x >> y;
    long long upperpart = 1;
    long long lowerpart = 1;
    ///upper part 
    for(long long i = x;i>y;i--){
        upperpart *=i;
    }
    //lower 
    for(long long i = 1;i<=(x-y);i++){
        lowerpart *= i;
    }

    cout << upperpart<<endl;
    cout << lowerpart<<endl;
    
    cout << upperpart/lowerpart;
}