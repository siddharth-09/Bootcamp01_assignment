#include <iostream>
using namespace std;

int main() {
    string people1First;
    string people1Last;
    string people2First;
    string people2Last;
    cin >> people1First >> people1Last;
    cin >> people2First >> people2Last;

    if(people1Last == people2Last){
        cout << "YES";
    }
    else{
        cout << "NO";
    }

}