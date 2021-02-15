# Kurant-app
## Under construction

An application where you can keep track of the expenses (an expense is made when a member is late, lost a bet or some rule is broken) for two different teams. This app is tailored to fit the needs of a specific person/position during the reception of new students at KTH, so the application wouldn't make much sense to anyone outside the management team of the reception. 

I decided to make this after I, last year, realized that I hate using excel with a burning passion. This app does not replace excel and its uses by any means, but can be a good replacement to some of its functions (mainly keeping track of expenses). This seemd reasonably challenging as it has multiple features, user authentication, authorization, persistent storage and a REST API (which I built myself). 


Dependencies:

- express
- cors
- mongoose
- jsonwebtoken
- bcryptjs
- axios
- react router dom
- cookie-parser

Things I wish I had done differently:
#### Architectural pattern
 Using a user interface architectural pattern (eg. MVP) to better separate the view logic from business logic. This also maximizes the amount of testable code.

#### Testing
At the moment I have used Insomnia to test the API; however, it would have been practical to use a testing-framework to test the UI and API-calls to save time and to be able to scale the application without manually testing all components and features with console.log-statements. 

#### Planning
I spent some time planning the project; hoeever, I wish that I had done more research on eg. REST APIs and different ways to implement them using Node and Express.
