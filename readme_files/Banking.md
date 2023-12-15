---
name: "Banking"
description: "Round Up functionality for daily transactions using Starling Bank API - Divy Bramhecha"
topics: 
- banking
- full-stack
- java
- react
- spring-boot
- transaction
- typescript
html_url: "https://github.com/TGDivy/Banking"
forks_count: 0
stargazers_count: 1
size: 2787
watchers_count: 1
---

# Round Up App for Starling Bank, using the Starling API

This app allows you to create savings goals and round up your purchases to the nearest pound, and transfer the difference to your savings goal for the last 7 days.

It allows you to neatly see how much you have saved, and how much you have spent.

Built using the Starling API, and the Starling Developer Sandbox.

## Technologies Used

* Frontend
  * React
  * Typescript
  * Material UI
  * Axios
* Backend (API)
  * Java
  * Spring Boot
  * Gson
  * Maven

<img src="Demo/programming_languages.png" width=50% height=50%>

## How to run

* Clone the repo
* Install Node (16 or higher) and NPM (7 or higher)
* Install Java (17 or higher) and Maven
* Make sure ports 3000 and 8080 are free
* Create starling developer sandbox account
* Create a customer in the sandbox
* Copy the customer access token, and paste it into the `start.sh` file, replacing the `STARLING_API_TOKEN` value.
* Alternatively, you can copy the customer access token, and paste it into the `round_up/src/main/java/com/starling_project/round_up/Constants.java` file, replacing the `STARLING_API_TOKEN` value.

run `./start.sh` from the root directory to install dependencies both frontend and backend depedencies and start frontend and backend.

## How to use app - demo video loom (click to play)

<a href="https://www.loom.com/share/e1fbd6827dc3450ab75ce9876ec562f6">
    <p>Loom Message - 21 December 2022 - Watch Video</p>
    
  </a>

[<img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/e1fbd6827dc3450ab75ce9876ec562f6-with-play.gif">](https://www.loom.com/share/e1fbd6827dc3450ab75ce9876ec562f6)

## How the app works

* The app uses the Starling API to:
  * Get the customer's details
  * Their main account details
  * Their balance
  * Savings goals api to create, view, and delete savings goals
  * Savings goals api to add money to a savings goal
  * Transactions api to get the last 7 days of transactions
  * Transactions api to add user notes to a transaction (to mark it as a round up transaction)
* Uses the above APIs in the Java backend to create a REST API which exposes the following endpoints:
  * `/api/accountDetails` - returns the customer's details, and their main account details
  * `/api/createSavingsGoal` - creates a new savings goal
  * `/api/deleteSavingsGoal` - deletes a savings goal
  * `/api/getSavingsGoal` - returns the customer's savings goals, and its balances
  * `/api/addMoneyToSavingsGoal` - adds money to a savings goal
  * `/api/getTransactions` - returns the customer's last 7 days of transactions
  * `/api/roundUpTransactions` - rounds up the customer's last 7 days of transactions, and transfers the difference to the savings goal, and adds a user note to the transaction to mark it as a round up transaction
* Frontend uses the above REST API to:
  * Display the customer's details, and their main account details
  * Display the customer's savings goals, and its balances
  * Create a new savings goal
  * Delete a savings goal
  * Add money to a savings goal
  * Display the customer's last 7 days of transactions
  * Round up the customer's last 7 days of transactions, and transfer the difference to the savings goal, and add a user note to the transaction to mark it as a round up transaction.

## App Demo Screenshots

![Main Page](Demo/main_page.png)
![Pending Round Ups](Demo/pending_roundup.png)
![Completed Round Ups](Demo/completed_roundup.png)
