
// D
// You are given two integers 𝐿 and 𝑅 . Print all integers from 𝐿 to 𝑅 in increasing order.

// Input
// The first line contains two integers 𝐿 and 𝑅
//  (−10^5 ≤𝐿 ≤ 𝑅≤ 10^5).

// Output
// Print all integers from 𝐿 to 𝑅, separated by spaces.

// Example
// Input Copy
// 3 7
// Output Copy
// 3 4 5 6 7

#include <iostream>

int main()
{
    int L, R;

    std::cin >> L >> R;

    for (L; L <= R; L++)
    {
        std::cout << L << " ";
    }
}

