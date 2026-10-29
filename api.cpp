
#include "Game.h"
#include <iostream>
#include <string>

using namespace std;

int main(int argc, char* argv[]) {
    if (argc < 3) {
        cout << "{\"error\":\"Please provide an action and game name\"}";
        return 1;
    }

    string action = argv[1];
    string name = argv[2];

    if (action == "add") {
        Game game(1, name);

        cout << "{";
        cout << "\"id\":" << game.getId() << ",";
        cout << "\"name\":\"" << game.getName() << "\",";
        cout << "\"status\":\"" << game.getStatus() << "\",";
        cout << "\"progress\":" << game.getProgress() << ",";
        cout << "\"rating\":" << game.getRating();
        cout << "}";

        return 0;
    }

    cout << "{\"error\":\"Unknown action\"}";
    return 1;
}