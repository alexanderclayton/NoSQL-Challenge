# Alex Clayton's Social Network API

## Introduction
This project was developed by Alex Clayton as part of the KU Coding Bootcampt 18-NoSQL Challenge.  This is a social network api that utilizes MongoDB to handle our database information.

## What's in the project?
The acceptance criteria for this project are as follows:

1.  WHEN I enter the command to invoke the application
    THEN my server is started and the Mongoose models are synced to the MongoDB database

    Running `npm start` boots up the server and syncs the models to the MongoDB database

2.  WHEN I open API GET routes in Insomnia for users and thoughts
    THEN the data for each of these routes is displayed in a formatted JSON

    This was set up in the controllers files under each of the GET methods


3.  WHEN I test API POST, PUT, and DELETE routes in Insomnia
    THEN I am able to successfully create, update, and delete users and thoughts in my database

    This was also set up in the controller files.  We did have a few issues with the DELETE routes, but were able to resolve this for the thoughts.


4.  WHEN I test API POST and DELETE routes in Insomnia
    THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

    This was again set up in the controller files.  We experienced some of the same issues as we did with the thoughts, however we were not able to resolve this at the time of submitting the assignment, but it should prove to be an exciting debugging exercise for the future :)

## URL of the Application Walkthrough Video:

[Walkthrough Video](https://drive.google.com/file/d/1RFXxDLkB_a7qaUMmHdl7O1RCjnKIKk8g/view)