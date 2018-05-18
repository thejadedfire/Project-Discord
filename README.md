# Project Discord
#### Marysa Williams' and Aayushi Roy's 2017-18 year long project.

### A general description of the project
This project is to use the Discord API and community provided tools to program a ‘bot’, an automated user.

**Team Name** : "Project Discord"


**We can say that the steps we aim to take are**:
1. Research Discord API
2. Create a communal area to store our programs, and a discord server to implement it.
3. Create an “echo” bot: responds “pong” every time a user says “ping”
4. Bot that responds to “/”commands  
   ⋅⋅⋅**Progress is here**⋅⋅⋅
5. Bot can take information from discord
6. Bot can take information from the internet  (webhooks)
7. Bot can play music.

**Likely challenges** 
  * The resources online are not clear about how to create a bot.
  * Programs are hard to install on the school computers.
  * If the project is really supposed to go to the end of the year, Aayushi will leave before the project is completed, unless we move the final deadline up by a month.

**Topics you believe you will have to learn to complete the project**
  * Python/JavaScript
  * Databases
  * Understanding foreign API

**Why you believe it can be achieved this year.**
The team is composed of hard working individuals, both of us have been to programming competitions, and participate in SHE++. We have good personal synergy, having taken the previous class together.

# Week April 17-20
### Planning
The goal we have for the week is to set up a command handler for our discord bot. Right now, the biggest problem is understanding the discord API. A large majority of it is user-created. In addition, the language we are using is JavaScript, a language we are not very familiar with. One issue in particular is that the school computers do not allow us to download the necessary software for the project, so we’ll have to make sure we know the days we’re working on the project in class so we can bring in our laptops. I also plan to explore more about the music function of discord bots, although it is not likely that this feature will be implemented any time soon. Another long term goal is to have our program/bot pull and redistribute information gained from accessing the internet. Ideally, this could be used in the form of posting information like definitions to words, or top forum posts. As the week goes on, we’ll continuously be testing our bot as we add new and edit existing commands, as well as looking at other existing bots.

### Progress
This week, we set up a pair of bots and a general server so that we could both work on different aspects of the bot while having a common testing area. We are currently working on a command handler, but we decided to also focus on other essential and interesting issues regarding our bot. Aayushi ran into a few problems while doing so, but ended up creating bots, adding them to the servers, getting configuration files set up and experimenting with different commands with arguments. Marysa has been working on a program for the bot in Java that looks at word association. We have both been looking to each other for help with our own issues while working together as a team.

# Week April 23-27
### Planning
This week we plan to finish setting up a command handler for the discord bot, work on member greetings and permissions, researching webhooks. We also plan to finish debugging the Java program regarding word association and probability, and then translate it into JavaScript for the bot to use. With the help of some of the resources available online, we are making good progress with the command handler and other aspects in JavaScript for the bot. We are currently working out the last bugs in the Java program, which will ultimately allow us to generate a set number of connected words, based on probability, from a provided file. The program somewhat emulates AutoFill or AutoCorrect. We will be continuously testing both the Java program as we debug it and the JavaScript code for the bot.

### Progress
At this point in time, our project has a good foundation. The bot is responsive to commands and we set up a command handler. The groundwork for a program that can respond to user’s input like a human is being laid. We have made significant advances in understanding the discord API. We also debugged the Java Markov chain program and will be translating it into JavaScript soon. We’ve been using resources online when we run into issues, and we also talk to each other in order to get another viewpoint on the problem. If we are able to continue at this pace, the results look promising. 

# Week April 30-May 4
### Planning
This week, we will finish setting up our project on GitHub so we have a central location for us to share our code, in addition to our shared server on Discord for testing. We will be researching and writing asynchronous code that will allow us to interact with the user while we pull information from a URL. While researching reading from URLs, we found a Java program that allows you to input a URL and it returns the HTML for the website, which got us ultimately interested in XSS, which is a type of computer security vulnerability typically found in web applications.

### Progress
Github has been set up. This will greatly help communication and efficacy. Github is a code-sharing service. We have written some explanations of our own on what we studied, like XSS, HTTP protocols, and databases. Some issues that we have encountered are the difficult subject of networking. We are also looking toward integrating online with webhooks. Upon further inspection, we doubt that cross site scripting will be much of an issue with our bot, mainly because it’s not a site. Music playing is being looked into as well.

# Week May 7 - 11
### Planning
This seems like our halfway point in our project. We estimate that we will implement a database function by the end of this week. Currently, I am studying SQLite. Our goal is to set up a database that has player names and how often they’ve done something. I believe that this function would demonstrate mastery and knowledge of the subject of databases. Data transfer is a main component of this bot, and configuring a database to hold and manipulate data is crucial for the development of this project as a whole. Next, I intend to research webhooks and the process of extracting information from online websites or databases. Some resources have been found that aid in webhooks so that one does not have to code all the programs themselves. Plenty of websites can be used to get data from, such as wikipedia, google, or other databases. 
### Progress
We have set up a basic database that records the username, the name of the tag, and how many times the user has called it, and we have the ability to easily add, edit, and remove tags. We are almost done modifying it so that it takes in commands and records how many times it has been used, all the users that have used it, the time of last call, and the user that called it last. We are also currently researching methods and APIs and how to connect them with JavaScript for the bot. 

# Week May 14-18
### Planning
This week, we are going to scout out APIs to implement. We are gathering information on how NodeJS organizes its code. Modules are a large component of NodeJS, and they are sections of stand-alone, reusable code. We will also finish altering the current database to fit the new specifications and then test it in our shared server, making changes and adding features as needed. Absences caused by AP exams might slightly hinder our progress but despite that, we are still on track. We have already accomplished a majority of the tasks we set out to do with our bot at the beginning of the year, and are changing out some of our short-term goals, such as playing music, which we might come back to if we have time, with adding a database.


