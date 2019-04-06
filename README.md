# Train Schedule App
App  simulates a train arrival board, with a display showing train arrivals and times, and an input section to add new trains. Trains can be removed from the board by clicking the "-" icon next to the Name field.

User can enter a train's Name, Destination, Frequency (how frequently it arrives, in minutes) and its First Arrival Time. The uses the moment.js library to take this data, plus the current time, and calculate the train's next arrival time, and how many minutes that is from the current time.

The app uses Firebase to store and retrieve all train information.
