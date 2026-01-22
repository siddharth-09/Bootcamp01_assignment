#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main() {
    ifstream input("input.cpp");

    if (!input) {
        cout << "Cannot open input file\n";
        return 1;
    }

    string line;
    ofstream output;
    int fileNo = 0;
    bool write = false;

    while (getline(input, line)) {

        // check for //----
        if (line.find("//----") != string::npos) {
            if (output.is_open())
                output.close();

            fileNo++;
            string filename = "program_" + to_string(fileNo) + ".cpp";
            output.open(filename);

            write = true;
            continue;
        }

        // write only after //----
        if (write) {
            output << line << endl;
        }
    }

    if (output.is_open())
        output.close();

    input.close();

    cout << "Created " << fileNo << " files.\n";
    return 0;
}
