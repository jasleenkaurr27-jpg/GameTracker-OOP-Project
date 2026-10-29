
#include "Game.h"
#include <iostream>

Game::Game(int id, string name) {
    this->id = id;
    this->name = name;
    status = "Want to Play";
    progress = 0;
    rating = 0.0f;
}

int Game::getId() const {
    return id;
}

string Game::getName() const {
    return name;
}

string Game::getStatus() const {
    return status;
}

int Game::getProgress() const {
    return progress;
}

float Game::getRating() const {
    return rating;
}

void Game::setStatus(string newStatus) {
    status = newStatus;
}

void Game::setProgress(int newProgress) {
    if (newProgress >= 0 && newProgress <= 100) {
        progress = newProgress;
    }
}

void Game::setRating(float newRating) {
    if (newRating >= 0 && newRating <= 5) {
        rating = newRating;
    }
}

void Game::display() const {
    cout << "\nGame ID: " << id
         << "\nName: " << name
         << "\nStatus: " << status
         << "\nProgress: " << progress << "%"
         << "\nRating: " << rating << "/5\n";
}