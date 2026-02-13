


#include<iostream>

using namespace std;

void print1toN(int n){
    for (int i = 1; i <=n; i++)
    {
        cout << i << " ";
    }
    cout << endl;
    
}

int main(){
    int n;
 

    print1toN(5);
    print1toN(6);
    print1toN(7);
}

