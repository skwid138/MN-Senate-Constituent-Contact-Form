## Constituent Contact Form

### Problem
- Constituents need an easier way to contact their Senators via the web.

### Solution
- One form with the ability to select by Senator or District
- Inputs for Constituent's name, phone number, mailing address, email address, and a message for their Senator.
- A checkbox to prove the user is human
- A submit button that sends the message to the Senator's eamil and stores the input in a database.

## Technologies

### Backend
- Node.js
- Express.js
- dotenv
- Request
- pg w/ PostgreSQL

### Frontend
- AngularJS
- AngularJS Material
- AngularJS reCaptcha
- Google Civiv API
- Google reCaptcha

## How To Use
- Fork and Clone the repository.
- Navigate to the directory in terminal
- From terminal run <code>npm install</code>
- Once that completes create a .env file in the root directory
    * <code>EMAIL_UN=[email here]</code>
    * <code>EMAIL_PW=[email here]</code>
    * <code>GOOGLE_API=[Google API key here]</code>
    * <code>SECRET=[Google reCaptcha secret here]</code>
    * <code>PORT=8080</code>
- From terminal run <code>npm start</code> (you'll see the console display 'server is listening on port'...)
- Open a browser and visit the url 127.0.0.1:8080 (or port specified in .env file)