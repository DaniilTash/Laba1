var main = function (toDoObjects) {
  "use strict";

  var ads = toDoObjects.map(function (toDo) {
    return toDo.description;
  });

  $.post("send", {}, function (response) {
    // этот обратный вызов выполняется при ответе сервера
    console.log("Мы отправили данные и получили ответ сервера!");
    console.log(response);
  });

  $(".tabs a span").toArray().forEach(function (element) {
    $(element).on("click", function () {
      var $element = $(element);
      $(".tabs a span").removeClass("active");
      $element.addClass("active");
      var $content;
      if($element.parent().is(":nth-child(1)")){
        $content = $("<ul>");
        for (var i = ads.length - 1; i >= 0; i--) {
          $content.append($("<li>").text(ads[i]));
        }
      }
      else if($element.parent().is(":nth-child(2)")){
        $content = $("<ul>");
        ads.forEach(function(ad){
          $content.append($("<li>").text(ad));
        });
      }
      else if($element.parent().is(":nth-child(3)")){
        var organizedByTag = organizeByTags(toDoObjects);
          $content = $("<ul>");
          organizedByTag.forEach(function (tag) {
            var $tagName = $("<h3>").text(tag.name);
            $content.append($tagName);
            tag.toDos.forEach(function (description) {
              var $li = $("<li>").text(description);
              $content.append($li);
          });}
          )}
      else if($element.parent().is(":nth-child(4)")){
        $content = $("<form>");
        $content.append($("<label for='title'>").text('Заголовок'));
        $content.append($("<input type='text' name='title'>"));
        $content.append($("<label for='tags'>").text('Теги'));
        $content.append($("<input type='text' name='tags'>"));
        $content.append($("<button type='submit'>").text('Добавить объявление'));
        $content.on("submit", function(event) {
          event.preventDefault();
          var title = $content.find("input[name='title']").val();
          var tags = $content.find("input[name='tags']").val().split(",");

          $.post("SendTodos", {"description":title, "tags":tags}, function (response) {
            toDoObjects.push({"description":title, "tags":tags});
            ads = toDoObjects.map(function (toDo) {
              return toDo.description;
            });
            console.log(response);
          });

          ads = toDoObjects.map(function (toDo) {
            return toDo.description;
          });  
          $("main .tabcontent").empty();
          $(".tabs a span").removeClass("active");
          $(".tabs a:first-child span").trigger("click");
        });
      }
      $("main .tabcontent").empty().append($content);
      return false;
    });
  });
};

var organizeByTags = function (toDoObjects) {
  // создание пустого массива для тегов
  var tags = [];
  // перебираем все задачи toDos
  toDoObjects.forEach(function (toDo) {
  // перебираем все теги для каждой задачи
  toDo.tags.forEach(function (tag) {
  // убеждаемся, что этого тега
  // еще нет в массиве
  if (tags.indexOf(tag) === -1) {
  tags.push(tag);
  }
  });
  });
  var tagObjects = tags.map(function (tag) {
    // здесь мы находим все задачи,
    // содержащие этот тег
    var toDosWithTag = [];
    toDoObjects.forEach(function (toDo) {
    // проверка, что результат
    // indexOf is *не* равен -1
    if (toDo.tags.indexOf(tag) !== -1) {
    toDosWithTag.push(toDo.description);
    }
    });
    // мы связываем каждый тег с объектом, который
    // содержит название тега и массив
    return { "name": tag, "toDos": toDosWithTag };
    });
    return tagObjects;
    };

$(document).ready(function () {
  $.getJSON("todos.json", function (toDoObjects) {
    main(toDoObjects);
  });
});  



/*
<form>
          <label for="title">Заголовок:</label>
          <input type="text" id="title" name="title"><br>
          <label for="description">Описание:</label>
          <textarea id="description" name="description"></textarea><br>
          <button type="submit">Добавить объявление</button>
        </form>
*/