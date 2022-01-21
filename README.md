# kalpas-task-1.0

## How to Install

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/bskumawat09/kalpas-task-1.0.git
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install dependancies

1. Move to the directory where your project is stored.
2. Run the follwoing command.
```bash
npm install
```

### Setting up environment

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.

## How to run

### Running API server locally

```bash
node app.js
```

You will know server is running by checking the output of the command `node app.js`

```bash
Listening on port 3000
Database connected to DB_STRING
```

**Note:** `DB_STRING` will be your MongoDB connection string.

### Stopping API server

```
Press CTRL+C
```
