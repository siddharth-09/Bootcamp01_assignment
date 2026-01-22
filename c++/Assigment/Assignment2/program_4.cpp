
// E
/* Print All Uppercase Alphabets */

#include<iostream>

int main(){
    int ascii_value = int('A');
    int i = 1;
    while(i<=26){
        std::cout << char(ascii_value) << " ";
        ascii_value++;
        i++;
    }
}

