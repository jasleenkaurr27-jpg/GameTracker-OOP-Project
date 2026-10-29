
#ifndef GAME_H
#define GAME_H

#include <string>
using namespace std;

class Game {
private:
    int id;
    string name;
    string status;
    int progress;
    float rating;

public:
    Game(int id, string name);

    int getId() const;
    string getName() const;
    string getStatus() const;
    int getProgress() const;
    float getRating() const;

    void setStatus(string newStatus);
    void setProgress(int newProgress);
    void setRating(float newRating);
    void display() const;
};

#endif