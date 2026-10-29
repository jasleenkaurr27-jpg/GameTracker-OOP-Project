
#include "Game.h"
#include <iostream>
#include <vector>
#include <limits>
using namespace std;

int main() {
    vector<Game> games;
    int choice;
    int nextId = 1;

    do {
        cout << "\n===== GAMETRACKER OOP =====\n";
        cout << "1. Add Game\n";
        cout << "2. View All Games\n";
        cout << "3. Update Game Status\n";
        cout << "4. Update Progress\n";
        cout << "5. Update Rating\n";
        cout << "6. Delete Game\n";
        cout << "0. Exit\n";
        cout << "Enter choice: ";

        if (!(cin >> choice)) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Please enter a number.\n";
            continue;
        }

        if (choice == 1) {
            string name;
            cout << "Enter game name: ";
            getline(cin >> ws, name);

            games.emplace_back(nextId++, name);
            cout << "Game added successfully!\n";
        }
        else if (choice >= 2 && choice <= 6) {
            if (games.empty()) {
                cout << "No games available. Add a game first.\n";
                continue;
            }

            for (const Game& game : games) {
                game.display();
            }

            int id;
            cout << "Enter Game ID: ";
            if (!(cin >> id)) {
                cin.clear();
                cin.ignore(numeric_limits<streamsize>::max(), '\n');
                cout << "Invalid ID.\n";
                continue;
            }

            int index = -1;
            for (int i = 0; i < (int)games.size(); i++) {
                if (games[i].getId() == id) {
                    index = i;
                    break;
                }
            }

            if (index == -1) {
                cout << "Game not found.\n";
                continue;
            }

            if (choice == 2) {
                games[index].display();
            }
            else if (choice == 3) {
                string status;
                cout << "Enter status (Want to Play/Playing/Completed): ";
                getline(cin >> ws, status);
                games[index].setStatus(status);
                cout << "Status updated.\n";
            }
            else if (choice == 4) {
                int progress;
                cout << "Enter progress (0-100): ";
                cin >> progress;
                if (cin && progress >= 0 && progress <= 100) {
                    games[index].setProgress(progress);
                    cout << "Progress updated.\n";
                } else {
                    cin.clear();
                    cin.ignore(numeric_limits<streamsize>::max(), '\n');
                    cout << "Progress must be between 0 and 100.\n";
                }
            }
            else if (choice == 5) {
                float rating;
                cout << "Enter rating (0-5): ";
                cin >> rating;
                if (cin && rating >= 0 && rating <= 5) {
                    games[index].setRating(rating);
                    cout << "Rating updated.\n";
                } else {
                    cin.clear();
                    cin.ignore(numeric_limits<streamsize>::max(), '\n');
                    cout << "Rating must be between 0 and 5.\n";
                }
            }
            else if (choice == 6) {
                games.erase(games.begin() + index);
                cout << "Game deleted.\n";
            }
        }
        else if (choice != 0) {
            cout << "Invalid choice.\n";
        }

    } while (choice != 0);

    cout << "Thank you for using GameTracker!\n";
    return 0;
}