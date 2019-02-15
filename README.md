# Noteful
- [Client](https://noted-client.herokuapp.com)
- [Server](https://noted-server.herokuapp.com/api)


![Screenshot](https://i.imgur.com/ro6IbMb.png)
![Screenshot 2](https://i.imgur.com/0rtvoY8.png)
![Screenshot 3](https://i.imgur.com/m7dmF86.png)

## Summary
Noted is an application focused on helping users learn musical notation and improve their skills as a classical musician. Utilizing a spaced repetition algorithm, a user's question queue is built based on if concepts are answered correctly with empahsis on incorrect questions appearing more often. Users can track their learning progress by comparing between sessions.

## Tech Stack
- React
- Redux
- Node/Express
- MongoDB
- Passport

## Features
- Active learning using spaced repetition.
- Feedback provided after each answered question.
- Tracks and reports user progress after each learning session.
- Comparisons of user progress between sessions.

# NOTED API DOCS
## METRIC
### GET /api/metric

**Purpose**: To retrieve telemetry back to the progress page
**Place**: Progress page
**Protected Endpoint**

**Response Body:**
```
  { 
    "lastSessionScore": "66.67", 
    "lastSessionAvg": "100", 
    "allSessionAvg": "70"
  }
```
### POST /api/metric/startSession

**Purpose**: To creates a new session (an empty array) for the user. Each question score will be stored in this array. 
**Place**: When the user hits the let's learn button
**Protected End Point**

### POST /api/metric/endSession

**Purpose**: To take the raw score data and create metrics out if it. Ex: (avg, sum, etc.)
**Place**: When either a user hits the logout button or the dashboard button while they are in 'learning' mode. 
**Protected End Point**

## QUESTION
### GET /api/question

**Purpose**: To retrieve and display the next question in the queue to the user. 
**Place**: When the user just answered a question. 
**Protected Endpoint**

**Response Body**
```
  { 
    "question": { 
      img: src="data:image/gif;base64,R0lGODypoG8wKOuwsP/g4P/...", 
      name: "glissando", 
      function: "a continuous slide upward or downward between two notes.", 
      mValue: "2"
     }
  }
```

## SCORE
### POST /api/score

**Pupose**: When the users guesses the name of the symbol, this guess is given to the backend to determine if it is correct or not. The backend then responds with whether the user is correct or not. 
**Place** This happens right after a user guesses the name of a symbol. 

**Request Body**: 
``` 
  { 
    "quess": "glizzyando"
  }
```

**Response Body**: 
``` 
  { 
    "isValid": "incorrect",
    "currMemoryStrength": "2"
  }
```

## USER
### POST /api/user

**Purpose:** Registers a user
**Place:** Landing page

**Response Body:**
```
  { 
    "username": "acrowell", 
    "password": "password123", 
    "fullname": "The Dude"
  }
```

## AUTH
### POST /api/auth/login

**Purpose**: To allow user's to login into their account 
**Place**: Login Page

**Response Body:**
```
  {
    "authToken": "supersecrettoken"
  }
```

### POST /api/auth/refresh

**Purpose**: To obtain a renewed access token

**Response Body :**
```
{
  "authToken": "supersecrettoken"
}
```




