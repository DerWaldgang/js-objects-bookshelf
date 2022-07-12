
let start_text1 = "1) Открыть и прочитать книгу (openAndRead(index, pages)) указав номер книги и кол-во страниц .\n"
let start_text2 = "2) Когда количество страниц этой книги окончатся вам предложат поставить рейтинг.\n"
let start_text3 = "3) После этого ваша книга войдет в коллекцию прочитанных книг.\n"
let start_text4 = '4) Вы всегда можете просмотреть (showReadedBook(name)) прочитанную вами книгу и посмотреть какую оценку вы поставили.\n' 
let start_text5 = "5) Вы также можете просмотреть весь список (showLibrary()) прочитанных вами книг.\n"
let start_text6 = "6) И наконец, вы можете просмотреть книги (showBooksToRead)которые вы начали читать, но еще не оконочили, а мы вам покажем сколько страниц еще осталось."


const bookshelf = {

    start: function () {
        console.log('Ваша полка книг пуста, если желаете добавить книгу впишите .addedBooksToRead и укажите название книги, автора, кол-во страниц и какая по счету в списке.')
        console.log(`Также, после добавления книги вы можете:\n ${start_text1} ${start_text2} ${start_text3} ${start_text4} ${start_text5} ${start_text6}`)
    },
    // список книг для чтения
    booksToRead: [],
    // библиотека - прочитанные и оцененные книги
    library: [],

    // добавляю книги в раздел книг которые нужно прочитать (у которых еще кол-во страниц больше 0)
    addedBooksToRead: function (name, author, pages, index) {
        this.booksToRead.push({name: name, author: author, pages: parseInt(pages), index: parseInt(index)})
        // помимо в список чтение добавляем еще и в библотеку, в дальнейшем после прочтения книги, просто добавим рейтинг в библиотеке
        this.library.push({name: name, author: author, pages: parseInt(pages), index: parseInt(index)})
    },

    // Функция показывает книги которые нужно прочитать из списка (bookToRead)
    showBooksToRead: function (){
        for(let i = 0; i < this.booksToRead.length; i++){
            console.log(`${this.booksToRead[i].name} '${this.booksToRead[i].author}', осталось ${this.booksToRead[i].pages} страниц, ${this.booksToRead[i].index} книга в списке.`)
        }
    },

    // Функция открывает книги по его индексу и читает кол-во указанных страниц из книги.

    openAndRead: function (index, pages) {
        // если количество оставшихся страниц больше, чем книги которые указаны как прочитанные то - 1) проверка.
        if(this.booksToRead[index-1].pages > pages) {
            // если количество оставшихся страниц меньше либо равно 0 то - 2) проверка.
            if(this.booksToRead[index-1].pages <= 0){
                // добавить в библиотеку.
                console.log('Поздаравляю вы полностью прочитали книгу, мы поставим ее в библиотеку, но прежде поставьте ей рейтинг')
                this.addToLibrary(index)
            } else { // иначе убираем указанное количество страниц.
                this.booksToRead[index-1].pages -= parseInt(pages)
                console.log(`Вы прочитали ${pages} страниц у книги ${this.booksToRead[index-1].name}, осталось еще ${this.booksToRead[index-1].pages}.`)
            } 
        } else { // если 1ая проверка не прошла, значит можно смело утверждать, что прочитали больше чем осталось, по сути прочитали всю книгу.
            console.log('Поздаравляю вы полностью прочитали книгу, мы поставим ее в библиотеку, но прежде поставьте ей рейтинг')
            this.addToLibrary(index) // добавляем в библиотеку (library).
        }},

    // Функция добавляет книги в библиотеку (library) и просит их оценит от 1 до 5, и также удалаяет ее из списка книг для чтения (booksToRead).
    addToLibrary: function (index) {
        this.library[index-1].rate = parseInt(prompt('Оцените книгу от 1 до 5: '))
        console.log(`Книга ${this.library[index-1].name} оценена в ${this.library[index-1].rate} баллов и добавлена в библиотеку!`)
        this.booksToRead.splice(index-1,1)
    },
    // Функция показывает библиотеку (library) с уже прочитанными книгами у которых есть рейтинг.
    showLibrary: function () {
        for(let i = 0; i < this.library.length; i++){
            console.log(`${this.library[i].name} '${this.library[i].author}', ${this.library[i].pages} страниц, оценка ${this.library[i].rate}, ${this.library[i].index} книга в списке.`)
        }
    },
}
