# Movie-Voting-Website

## Brief Description
Movies are the best entertainment source. We all love watching series and movies online over the comfort of both mobile and screens at home. Our website is primarily an online movie voting portal.
The beauty of the portal is the top search box, which is prompt and easy. This makes it favorable among the users.
People can easily nominate up to five of their favorite movies. It also provides the feature to remove their nomination. People can watch the trailer over the website in fantastic quality without switching their screens. Our website also provides a Leaderboard page, where users can see top voted movies.
Admins have the authority to blacklist a movie.

## Features:
### 1. Signup: 
Enter full name, email and set a password.

![alt text](https://i.ibb.co/jRnRdNS/Whats-App-Image-2021-01-31-at-9-13-47-PM.jpg)

### 2. Login: 
Users can log in using the email id and password.
![alt text](https://i.ibb.co/2YB7Xzy/Whats-App-Image-2021-01-31-at-9-11-57-PM.jpg)

### 3. Homepage:

![alt text](https://i.ibb.co/54n2rrp/Whats-App-Image-2021-01-31-at-9-14-05-PM.jpg)

* The home page displays various movies, and a user can nominate his/her favorite movie by clicking on the nominate button.
* It also contains a search bar where users can easily search movies.
* User can nominate a movie by clicking on the blue plus button associated with each movie card.
* When a movie is nominated, the button changes to a Green button, whereas if the movie is blacklisted, it changes to a Red Block button.
* A User can vote for a max of five movies.
* Users can nominate a maximum of 5 movies.
![alt text](https://i.ibb.co/HN0mHXS/Whats-App-Image-2021-01-31-at-9-14-25-PM.jpg)
#### Admin Features:
* Admins have the authority to Blacklist a movie, which throws that blacklisted movie out of the race to appear on the leaderboard. Now this movie can no longer be nominated, and if it were nominated already by any user before then, it would be removed automatically.
* If you are an admin, you will see a button on the Movie Card to blacklist that particular movie.
![alt text](https://i.ibb.co/3Y1k4Mk/Whats-App-Image-2021-01-31-at-9-14-32-PM.jpg)

### 4. Movie Details Page:
* Users can find a detailed description of movies such as cast, rating, overview, release date, and genre.
* They can also watch the trailer and find similar movies by clicking on the movie image on the Homepage.
* This eases users' task to nominate a movie by selecting movies of their favorite actors/actress, director, and watch the trailer.

    
![alt text](https://i.ibb.co/yVcJWZV/Whats-App-Image-2021-01-31-at-9-21-31-PM.jpg)

![alt text](https://i.ibb.co/t3pc2rZ/Whats-App-Image-2021-01-31-at-9-20-30-PM.jpg)
    
### 5. Profile Page: 
* You can see your name and email in this area. 
* By clicking the link in the navbar, you can visit your complete profile. 
* See complete profile comprising your details as entered during signup and the list of movies nominated by you.
* You can also remove a nominated movie by clicking on the Remove button.
![alt text](https://i.ibb.co/CMZ6q2n/Whats-App-Image-2021-01-31-at-9-23-11-PM.jpg)
### 6. Leaderboard Page:
* By clicking the link in the navbar, you can visit the Leaderboard page. 
* The Leaderboard shows the rank of movies based on the nominations provided by various users.
![alt text](https://i.ibb.co/QX1CqS2/Whats-App-Image-2021-01-31-at-9-23-35-PM.jpg)
    
## Tech Stack/Technologies Used
* React Js
* Node.js
* Expressjs
* MongoDb


## Future scopes:
* Filter/ Sort the movies on the Homepage according to genres, release date, etc.
* User can create a watchlist of their own and share it with their friends.


## Setup Steps:
1. Open Terminal.
2. Change the current working directory to the location where you want the cloned directory.
3. Copy the following command in the terminal to clone the project:
#### `git clone https://github.com/shreyagupta428/Movie-Voting-Website.git`
4. Change your current directory to the cloned directory.
5. In the project directory, run:
#### `npm start`
Runs the app in the development mode.
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

6. Change the directory to the backend folder and run:
#### `node server`
Runs the backend on the 5000 port.

