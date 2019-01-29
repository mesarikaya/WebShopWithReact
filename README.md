This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# Web App Available functionalities:

## General Functionalities:
- NodeJS backend
- MongoDB as database
- React as frontend
	- Redux to support the app state
- Local sign in functionality with JWT
- Local Storage to control user login and logouts
- Typescript to provide static typing for better control of data and its types

# VIEWS
## Standard home page direction for guests
- Container routes to the 'App'presentational view and shows the home page for guests with Login functionality
and enables
- Page has currently automatic login functionalities for the users who has non-expired verified localstorage token
	- In case user is already logged in, login functionality disables and a logout functionality appears
- This page also enables users to do basic searches of Books, Toys and other categories and relevant subcategories. 
Accordingly, it shows the relevant items and controls the store state

![alt text](https://github.com/mesarikaya/WebShopWithReact/blob/master/snapshots/Capture1.PNG)

## Account page
- This route enables sign in or sigup functionality
- Sign is is managed by PassportJS JWT strategy which enables Local storage token validation and expiry
- Additional Social login plugins will be enables later on
- Sign up is done via using sfmtp server of google and it sends a verification email to the user with a token.
Upon verification link click, user is directed to 'verify' route. If the token is verified, then user is directed
to the main page and the current state of the sore is presented. If not, it stays in the 'account' page.
- Page has currently automatic login functionalities for the users who has non-expired verified localstorage token
	- In case user is already logged in, login functionality disables and a logout functionality appears
- This page also enables users to do basic searches of Books, Toys and other categories and relevant subcategories. 
Accordingly, it shows the relevant items and controls the store state

![alt text](https://github.com/mesarikaya/WebShopWithReact/blob/master/snapshots/Capture2.PNG)

## Table of Contents

