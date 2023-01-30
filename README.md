
# Todo list and task manager

This is a node js based application which helps the user to organize their tasks and group them into a list of task associated to a particular thing.

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
Try running the tests

```bash
  npm test
```

## API Reference

#### Get all lists

```http
  GET localhost:3000/todolist/
```

#### Get list by id

```http
  GET localhost:3000/todolist/:listid
```

#### Create new list

```http
  POST localhost:3000/todolist/add
```

#### Edit list

```http
  PUT localhost:3000/todolist/edit
```

#### Delete list by list id

```http
  DELETE localhost:3000/todolist/:listid
```

#### Get task by list id

```http
  GET localhost:3000/todolist/:listid/tasks
```

#### Get task by id

```http
  GET localhost:3000/todolist/task/:id
```


#### Get all pending task

```http
  GET localhost:3000/todolist/pendingTasks
```

#### Get all completed task

```http
  GET localhost:3000/todolist/completedTask
```

#### Create new task

```http
  POST localhost:3000/todolist/addTask
```

#### Toggle task status

```http
  GET localhost:3000/todolist/toggleTask/:id
```

#### Edit task

```http
  PUT localhost:3000/todolist/editTask
```

#### Delete task by id

```http
  DELETE localhost:3000/todolist/task/:id
