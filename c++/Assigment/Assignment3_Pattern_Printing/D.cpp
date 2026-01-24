// D - Inverse Pyramid
#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int n;
    cin >> n;

    for(int i = 1;i<=n;i++){
        for (int j = n; j >=i; j--)
        {
            cout << "*";
        }
        cout << endl;
    }
}
