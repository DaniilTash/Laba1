const path = require('path');
const express = require('express');
var fs = require('fs');
const app = express();

toDos = [
    {
        "description" : "Купить продукты",
        "tags" : [ "шопинг", "рутина" ]
    },
    {
        "description" : "Сделать несколько новых задач",
        "tags" : [ "писательство", "работа" ]
    },
    {
        "description" : "Подготовиться к лекции в понедельник",
        "tags" : [ "работа", "преподавание" ]
    },
    {
        "description" : "Ответить на электронные письма",
        "tags" : [ "работа" ]
    },
    {
        "description" : "Вывести Грейси на прогулку в парк",
        "tags" : [ "рутина", "питомцы" ]
    },
    {
        "description" : "Закончить писать книгу!",
        "tags" : [ "писательство", "работа" ]
    }
];


app.use(express.static(path.join(__dirname, 'src')))
    

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}`);
});

app.get("/todos.json", function (req, res) {
    res.json(toDos);
});

app.post("/send", function (req, res) {
    console.log("Данные были отправлены на сервер!");
    // простой объект отправлен обратно
    res.json({"message":"Вы размещаетесь на сервере!"});
});  

app.use(express.urlencoded());

app.post("/SendTodos", function (req, res) {
    // сейчас объект сохраняется в req.body
    var newToDo = req.body;
    console.log(newToDo);
    toDos.push(newToDo);
    // отправляем простой объект
    res.json({"message":"добавление прошло успешно!"});
});     

app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});