#include<iostream>

using namespace std;

void helloFunction(int n){
    for(int i = 1;i<=n;i++){
        cout << "I am learning functions"<<endl;
    }
}

int main(){
    int n;

    cin >> n;
    helloFunction(n);

}