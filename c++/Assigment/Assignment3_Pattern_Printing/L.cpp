// L. Hollow Diamond
/*

input : 3
output :
  *
 * *
*   *
 * *
  *
*/

#include <iostream>
using std::cin;
using std::cout;
using std::endl;

int main()
{
    int n;
    cin >> n;

    // straight hollow triangle
    for (int i = 1; i <= n-1; i++)
    {
        for (int k = n; k > i; k--)
        {
            cout << " ";
        }
        for (int j = 1; j <= i; j++)
        {
            if (j == n || j == i || j == 1)
            {
                cout << "*";
                if (j != i)
                {
                    cout << " ";
                }
            }
            else
            {
                cout << "  ";
            }
        }
        cout << endl;
    }
    // inverse hollow
     for(int i = 1;i<=n;i++){
         //for space print
         for(int k = 1;k < i;k++){
             cout << " ";
         }
         //for star print
         for(int j = n;j>=i;j--){
             if( j == n || j == i){
                 cout << "*";
                 if(j!=i){
                     cout << " ";
                 }
             }
             else{
                 cout << "  ";
             }
         }
         cout << endl;
     }
}