

#include<iostream>

using namespace std;

int main(){
    int testcase,n;
    cin >> testcase;
    for(int i = 0;i<testcase;i++){
        cin >> n;
        long long elements[n];
        int x;
        for(int i = 0;i<n;i++){
            cin >> elements[i];
        }
        for(int i = 0;i<n;i++){
            bool flag = false;
            if(flag == false){
                for(int j = i+1;j<n;j++){
                    if(elements[i] == elements[j]){
                        flag = false;
                    }
                }
            }
        }
        cout << x;

    }

}