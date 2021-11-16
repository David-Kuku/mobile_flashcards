# Project Setup

This project was created with [Create React Native App]

To clone this project, run the follow commands on your terminal

```sh
git clone https://github.com/David-Kuku/mobile_flashcards.git
```

navigate to the project's directory

```sh
cd mobile-flashcards
```

Install all the project dependencies

```sh
npm install
```

Run expo to start the bundler

```sh
yarn start
```

This project can be run from a web browser or the Expo client app. This Project was specifically tested with an iOS platform, using the Expo client app on the actual device to develop and test in real time.

# Project overwiew

This project is named "Mobile-flashcards," and it works by allowing users to construct decks, which can be thought of as folders. Adding cards to a deck, starting a quiz with the available cards in it, or deleting a card are all options for decks that have been created. You can make as many decks as you want or add as many cards as you want to a deck. The titles of generated decks are unique, and subsequent decks cannot have the same title as an existing deck.

When a user has enough cards, he or she can quiz themselves based on the questions in the cards connected with that deck, and a score is produced to tell the user of their performance. All available decks are displayed when the app loads, but you won't have any decks in your storage at first. You can design a deck for yourself by clicking on the Add deck tab on the bottom right. You can add cards to your deck after a successful creation, which is simply creating and storing questions and answers in that deck.

You can also start a quiz, which is only possible when a deck contains at least one card. Finally, you can delete a deck that you no longer wish to use. This procedure can be repeated numerous times. A new user will be requested to allow the app to access his or her location, which will be used to deliver local notifications to that user on a daily basis if the user hasn't completed at least one quiz. I hope you enjoy and find this project resourceful.

#### References

- React Native [Documentation]

[create react native app]: https://reactnative.dev/docs/environment-setup
[Documentation]: https://reactnative.dev/docs/getting-started
