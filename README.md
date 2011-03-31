# 1. Описание

TODO

# 2. Установка

TODO

Пока наиболее удобно так:

* git clone git@github.com:afelix/csso.git
* открыть в браузере файл csso.html
* проверять

Неудобно:

* git clone git@github.com:afelix/csso.git
* node ccli.js файл.css
* в ccli.js раскомментировать нужный формат вывода и комментировать ненужный

# 3. Использование

TODO

# 4. Минимизация

TODO

## 4.1. Минимизация без изменения структуры

TODO

### 4.1.1. Удаление whitespace

TODO

Было:
    .test
    {
        margin-top: 1em;
        
        margin-left  : 2em;
    }
Стало:
    .test{margin-top:1em;margin-left:2em}
Для большего удобства чтения текст остальных примеров приводится с пробелами (переводом строки и т.п.).

### 4.1.2. Удаление лишних `;`

TODO

Было:
    .test {
        margin-top: 1em;;;
        ;;
    }
Стало:
    .test {
        margin-top: 1em
    }

### 4.1.3. Удаление комментариев

TODO

Было:
    /* comment */

    .test /* comment */ {
        /* comment */ margin-top: /* comment */ 1em;
    }
Стало:
    .test {
        margin-top: 1em
    }

### 4.1.4. Удаление неправильного @charset

TODO

Было:
    @charset 'UTF-8';
    @charset 'ISO-8859-15';
Стало:
    @charset 'UTF-8'

### 4.1.5. Удаление пустых элементов стиля

TODO

Было:
    .test0 {
        font:;
        color: red;
        :green;
    }
    
    .test1 {
    }
Стало:
    .test0 {
        color: red;
    }

### 4.1.6. Оптимизация цвета

TODO

Было:
    .test {
        color: yellow;
        border-color: #c0c0c0;
        background: #ffffff;
        border-top-color: #f00;
        outline-color: rgb(0, 0, 0);
    }
Стало:
    .test {
        color: #ff0;
        border-color: silver;
        background: #fff;
        border-top-color: red;
        outline-color: #000
    }

### 4.1.7. Оптимизация числовых значений

TODO

Было:
    .test {
        fakeprop: .0 0. 0.0 000 00.00 0px 0.1 0.1em 0.000em 00% 00.00% 010.00
    }
Стало:
    .test {
        fakeprop: 0 0 0 0 0 0 .1 .1em 0 0% 0% 10
    }

### 4.1.8. Оптимизация margin и padding

TODO

Было:
    .test0 {
        margin-top: 1em;
        margin-right: 2em;
        margin-bottom: 3em;
        margin-left: 4em;
    }
    
    .test1 {
        margin: 1 2 3 2
    }
    
    .test2 {
        margin: 1 2 1 2
    }
    
    .test3 {
        margin: 1 1 1 1
    }
    
    .test4 {
        margin: 1 1 1
    }
    
    .test5 {
        margin: 1 1
    }
Стало:
    .test0 {
        margin: 1em 2em 3em 4em
    }
    
    .test1 {
        margin: 1 2 3
    }
    
    .test2 {
        margin: 1 2
    }
    
    .test3, .test4, .test5 {
        margin: 1
    }

### 4.1.9. Склеивание многострочных строк в однострочные

TODO

Было:
    .test[title="abc\
    def"] {
        background: url("foo/\
    bar")
    }

Стало:
    .test[title="abcdef"] {
        background: url("foo/bar")
    }

### 4.1.10. Оптимизация `font-weight`

TODO

Было:
    .test0 {
        font-weight: bold
    }
    
    .test1 {
        font-weight: normal
    }
Стало:
    .test0 {
        font-weight: 700
    }
    
    .test1 {
        font-weight: 400
    }

## 4.2. Минимизация с изменением структуры

TODO

### 4.2.1. Расчёт стиля

TODO

#### 4.2.1.1. Сведение блоков с одинаковыми селекторами

TODO

Было:
    .test0 {
        color: red;
        margin: 0;
    }
    
    .test1 {
        font-size: 12pt
    }
    
    .test0 {
        line-height: 3cm
    }
    
    .test1 {
        text-indent: 3em;
    }
Стало:
    .test0 {
        color: red;
        margin: 0;
        line-height: 3cm
    }
    
    .test1 {
        font-size: 12pt;
        text-indent: 3em
    }

#### 4.2.1.2. Удаление перекрываемых свойств

TODO

Было:
    .test {
        color: red;
        margin: 0;
        line-height: 3cm;
        color: green;
    }
Стало:
    .test {
        margin: 0;
        line-height: 3cm;
        color: green
    }

### 4.2.2. Группирование

TODO

#### 4.2.2.1. Частичное выделение свойств

TODO

Суммарная длина выделяемых свойств должна быть больше суммарной длины копируемых селекторов.

a) Выделение произошло.

Было:
    .test0 {
        color: red;
        font: x-large/110% "New Century Schoolbook", serif;
        margin: 10px;
    }
    
    .test1 {
        color: red;
        font: x-large/110% "New Century Schoolbook", serif;
        margin: 20px;
    }
Стало (перенос произошёл):
    .test0, .test1 {
        color: red;
        font: x-large/110% "New Century Schoolbook",serif;
    }
    
    .test0 {
        margin: 10px;
    }
    
    .test1 {
        margin: 20px;
    }
б) Выделение не произошло.

Было:
    .test0 {
        color: red;
        margin: 10px;
    }
    
    .test1 {
        color: red;
        margin: 20px;
    }
Стало:
    .test0 {
        color: red;
        margin: 10px;
    }
    
    .test1 {
        color: red;
        margin: 20px;
    }

#### 4.2.2.2. Вниз

TODO

Было:

Стало:

#### 4.2.2.3. Вверх

TODO

Было:

Стало:

### 4.2.3. Управление структурными изменениями

TODO

#### 4.2.3.1. Защита от удаления

Было без защиты:
    .test {
        color: red;
    }
    
    .test {
        color: green;
    }
Стало:
    .test {
        color: green
    }
Было с защитой:
    .test {
        /*p*/color: red;
    }
    
    .test {
        color: green;
    }
Стало:
    .test {
        color: red; <-- свойство не было перекрыто 'color: green'
        color: green
    }

#### 4.2.3.2. Защита от смены порядка

TODO

Было без защиты:
    .test0 {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    
    .test1 {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
Стало:
    .test0, .test1 { <-- порядок '.test1' перекрыл порядок '.test0'
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
Было с защитой:
    TODO
Стало:
    TODO