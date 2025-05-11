
<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.



### Prerequisites

Make sure you have the following software installed on your local machine:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

  

### Installation


1. **Clone the repository**
    ```bash
    git clone https://github.com/Pranavsai0407/text-anything.git
    cd text-anything
    ```

2. **Install backend dependencies**
    ```bash
    cd ./backend
    npm install
    ```


3. **Install frontend dependencies**
    ```bash
    cd ./frontend
    npm install
    ```

4. **Start the backend server**
    ```bash
    cd ..
    cd ./backend
    node index.js
    ```
5. **Make a .env file in root folder of frontend and add VITE_BACKEND_URL**
    ```bash
    In frontend/.env:
    VITE_BACKEND_URL=http://localhost:5001
    ```

6. **Start the frontend server**
    ```bash
    cd ./frontend
    npm run dev
    ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>
