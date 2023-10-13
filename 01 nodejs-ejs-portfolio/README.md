# Node.js EJS Portfolio Project

Welcome to the Node.js project using EJS for creating a portfolio website. This project allows you to showcase your portfolio and includes error handling and dynamic user pages.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```shell
   cd nodejs-ejs-portfolio
   ```

3. Install the project dependencies using npm:

   ```shell
   npm install
   ```

4. Start the development server:

   ```shell
   npm start
   ```

## Usage

Once the development server is up and running, you can access the following routes:

- [http://localhost:3000/](http://localhost:3000/): Visit this URL to view your portfolio.
- [http://localhost:3000/error](http://localhost:3000/error): Use this URL to see the error page.
- [http://localhost:3000/users/:anyuser](http://localhost:3000/users/:anyuser): This dynamic route generates a page with EJS according to the parameter passed through the URL. Replace `:anyuser` with the username you want to display.

## Project Structure

The project's file structure might look like this:

```plaintext
nodejs-ejs-portfolio/
|-- node_modules/
|-- public/
|   |-- images/
|   |-- script/
|   |-- stylesheets/
|-- views/
|   |-- index.ejs
|   |-- error.ejs
|-- index.js
|-- package.json
|-- package-lock.json
|-- README.md
```

- The `public` directory contains static assets such as CSS, JavaScript, and images.
- The `views` directory holds EJS templates for various pages including the home page, error page, and dynamic user pages.
- `index.js` is the main application file that sets up the server and routing.

Feel free to customize and expand the project to create your own portfolio website.

Happy coding!

```
You should replace <repository_url> with the actual URL of your GitHub repository where the project is hosted. This markdown provides an overview of the project and how to get started with it.
```