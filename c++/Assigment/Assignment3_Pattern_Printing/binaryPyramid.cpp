

#include<iostream>
using std::cout;
using std::endl;
using std::cin;

int main(){
    int n;
    cin >> n;
    for(int i = 1;i<=n;i++){
        int counter = (i+1)%2;
        for(int j = 1;j<=i;j++){
            cout << counter;
            counter++;
            if(counter > 1){
                counter = 0;
            } 
        }
        cout << endl;
    }
}