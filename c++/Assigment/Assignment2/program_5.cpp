
//G
/* Count Numbers 

output : 
Number of positive integers
Number of negative integers
Number of even integers
Number of odd integers


input : 5
        -2 -3 0 6 7
output : 
2
2
3
2
*/

#include<iostream>
using std::cout;
using std::endl;
using std::cin;
int main(){

    int n;
    std::cin >> n;
    int list = 0;
    int postive_number = 0;
    int negative_number = 0;
    int even_number = 0;
    int odd_number = 0;

    for(int i = 1;i<=n;i++){
        std::cin >> list;
        if(list > 0){ //Postive number(even or odd)
            postive_number++;
            if(list%2 == 0){
                even_number++;
            }
            else{
                odd_number++;
            }
        }
        else if(list < 0){ //Negative number(even or odd)
            negative_number++;
            if(list%2 == 0){
                even_number++;
            }
            else{
                odd_number++;
            }
        }
        else if(list == 0 ){ // Zero is even number
            even_number++;
        }
    }
    
   cout << postive_number << endl << negative_number << endl << even_number << endl << odd_number;
}

