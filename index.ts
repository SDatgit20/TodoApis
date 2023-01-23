import { Controller } from "./Controller";
import {TaskController} from "./taskController";
const express = require('express');
export const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
