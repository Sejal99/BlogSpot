
# Blog Application



## Introduction
The goal of this web application is to develop a versatile blogging platform where registered creators can author and publish blogs publicly, while users can interact by commenting and sharing their thoughts on the content.
## Table of Contents
Features  
Tech Stack  
Setup  
Running the Application   
Contribution Guidelines  
Contact

## Features
Pagination, Search and Sort implementation on server side for robust support  
Authentication using JWT Tokens  
Comprehensive CRUD Operations with Commenting Feature  
Image Upload and Management  
## Tech Stack

Fontend: Next.js, Redux, TailwindCSS, Typescript, Javascript

Backend: Node, Express, Mongodb,AWS
## Setup
To setup the application locally, follow these steps:

*Fork this repo to create your own copy to work from.

*Clone the repository you forked to your local machine using:

   git clone <your_url>  

*Navigate to the Server directory using command "cd server" and create a .env file and copy contents of .env.example file to .env file and add all secret keys to setup MongoDB database.

*Install dependencies in server directory of project:

   npm install

*Start the server using command:

   npm start

*Now Navigate to the client directory using command "cd client" and create a .env.local file and copy contents of .env.sample file to .env.local file and add server URL.

*Install dependencies in client directory of project:

   npm install

*Start the application using command:

   npm run dev

*Open http://localhost:3000 in your browser to see the application.
## Contribution Guidelines
Welcome! If you want to contribute to the project, please follow these steps:

*Clone and setup this application locally by following above application setup steps.

*Create a new branch for the issue you assigned to work on, using below command:

   git checkout -b your_branch_name

*Make your changes to the code.

*Once you are satisfied with your changes, commit them with a descriptive commit message using below command:

   git add .
   git commit -m "added feature"

*Push your changes to your forked repository:

   git push origin your_branch_name

*Create a pull request by clicking the "Pull request" button on the original repository page.

*Wait for the project admin to review your pull request and provide feedback.

If your pull request is accepted, it will be merged into the main branch of the project. Congratulations, you've contributed to the project!


## Contact
If you have any queries,please feel free to contact on LinkedIn: https://www.linkedin.com/in/sejal-srivastava-469502194/