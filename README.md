# Quizzer

An example of a node.js, Strongloop and Mongodb API driven Angular client

To run:

* Install: node.js, npm, and mongodb.
* Install [Strongloop](https://docs.strongloop.com/display/public/LB/Installing+StrongLoop).
* Clone this repository - `git clone https://github.com/jneyer/quizzer.git`
* Go to the checkout directory and run `npm install` to download dependencies.
* Prepare the mongodb database for persistent storage:
    * Create a directory `mkdir mongodb`
    * Or `tar zxvf mongodb.tgz` to extract my development database
* Run the script `start_mongodb.sh`.
* Run `apic start` - to start the server.
* Run `apic edit` - to launch the API editor.

The web client should be running on [http://localhost:4001/#/]()
