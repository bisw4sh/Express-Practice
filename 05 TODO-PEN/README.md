## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone <repo>
   ```

2. Change your working directory to the project folder:

   ```bash
   cd <repo_name>
   ```

3. Install the required dependencies using npm:

   ```bash
   npm install
   ```

4. Start Postgre server & execute the query specified in [database.sql](./database.sql)  

4. Start the application:

   ```bash
   npm start
    ```
## Making Requests

After you've successfully started the application, you can make requests to the available routes. Here are the routes you can interact with:

| HTTP Method | Endpoint                    | Description      |
|-------------|-----------------------------|------------------|
| GET         | http://localhost:3000       | getAllTODO       |
| POST        | http://localhost:3000       | addTODO          |
| PATCH       | http://localhost:3000/:id   | updateTODO       |
| DELETE      | http://localhost:3000/:id   | deleteTODO       |
| GET         | http://localhost:3000/:id   | getATODO         |

You can use tools like [curl](https://curl.se/) or [Postman](https://www.postman.com/) to make HTTP requests to these routes. Make sure to include any required parameters and headers as specified in the project documentation.