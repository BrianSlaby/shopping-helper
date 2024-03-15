# Shopping Helper

## Overview

I wanted to expand on the [Scrimba Shopping List](https://github.com/BrianSlaby/scrimba-shopping-list) project that I made earlier in the [Scrimba Frontend Developer Career Path](https://scrimba.com/learn/frontend).  The idea is for this expanded project to use a Google Firebase cloud firestore database with authentication instead of the realtime database without authentication used in the original project.  I also wanted to include the option to create multiple lists to facilitate organization, with checkboxes (in the original project clicking on a list item simply deleted it).

## Live Site URL

[Shopping Helper](https://shopping-helper-list-organizer.netlify.app/)

## Features

-Account creation and login through Firebase Authentication.
-Firebase Security Rules keep your data secure.
-Input allows for creation of multiple custom named lists.
-All data are stored in a Firebase Firestore Database.
-Inactive lists have contents hidden to prevent clutter.
-Active lists show contents, and input to create new list items.
-List items have checkboxes; checking an item moves it to the bottom of the list.
-List items can be deleted individually; entire lists can also be deleted.

## Dependencies

-React.js
-Google Firebase
-Vite

## Instructions For Running This Project Locally

1. Clone the project locally from this GitHub repo.
2. Navigate to the project directory in your command line.
3. Run `npm install` in your command line.
4. Run `npm run dev` in your command line.
5. Access the app in your browser using the URL provided by Vite from the previous step.

## Outstanding Issues

The "Forgot Password" button currently fails to send the password reset email from Firebase.  The site URL has been added to the list of authorized domains in Firebase.  ChatGPT suggested that it might be an issue with CORS, which I know virtually nothing about.  It also suggested that it may have been an issue with running the app in localhost.  I was hoping that the issue would resolve itself once the site was deployed with Netlify, but I'm getting the same error.  Hopefully I'll be able to figure out the issue relatively quickly.

I spent a lot of time trying to implement an update profile modal for users to change their email, password, or delete their account.  This turned out to be much more complicated than anticipated, and some of my issues might be related to CORS like the password reset functionality.  I eventually moved the relevant components onto a separate git branch, which I may revisit in the future.

## Learning Notes

I wanted to build this using React, to get more practice with it. One focus that I've had while working on this project is to improve my file/folder structure and use of components. A majority of the project's code ended up in the Home file at first, and it was very quickly becoming difficult to navigate even with a relatively small project like this. When the time came to build the first modal, I started by creating separate component files since the warning modal for deleting a list was extremely straightforward.  Then, fresh off of that work flow, I split the nested list code into separate list components.  Deciding how to structure everything was initially harder than I'd anticipated, especially since I had all of the code in front of me as a getHTML type function like I'd been using in vanilla JavaScript. Once I started splitting everything up one piece at a time and figuring out which props I'd need to pass everything clicked into place, and the resulting code was much more readable.

Overall I'm really happy with my file/folder structure.  This project was a fun experience because it was the first time that I experience firsthand the benefits of using React over vanilla JavaScript.  I've only worked on relatively small scale projects so far, so while I've understood the advantages of React on a theoretical level I hadn't gotten the chance to benefit from them yet.  

I did a lot of experimentation with this project that isn't necessarily evident in the final build.  I messed around with some components and UI design that I ultimately scrapped.  I also got to play around with a lot of options in the firestore database, including updating my data structure a couple of times.  Learning the limitations of what you can do with data in firestore was illuminating.  I also wanted to give a shout out to ChatGPT, which I've been trying to use more often for troubleshooting.  For some issues it's much faster that using Google.  It can also be convenient to just copy and paste large blocks of code when I know there's a dumb little mistake somewhere, because ChatGPT will find it much faster than I will, especially if I've been working for a long time already and my brain is fried.  Equally valuable were the few instances where I was (rightfully) skeptical of responses.  I think being able to quickly realize when ChatGPT gets something wrong or doesn't fully understand the issue is a really important skill to hone.