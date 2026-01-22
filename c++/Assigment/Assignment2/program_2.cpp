
// Print 1 to n even number
// input 10
// output : 2 4 6 8 10

#include<iostream>

int main(){

    int n;

    std::cin >> n;
    for(int i = 1;i<=n;i++){
        if (i % 2 == 0)
        {
            std::cout << i << " ";
        }
    }
    return 0;
}

