class Form extends React.Component {

    // Конструктор
    constructor(props) {

        // Вызываем конктруктор родителя
        super(props);
        // Берем значение имени из LocalStorage
        var name = localStorage.getItem("name") || "";
        // Проверяем валидность
        var nameIsValid = this.validateName(name);
        // Берем значение Email из LocalStorage
        var mail = localStorage.getItem("mail") || "";
        // Берем значение комментария из LocalStorage
        var comment =  localStorage.getItem("comment") || "";

        // Стартовые присвоения состояний
        this.state = {
            // Имя
            name: name,
            // Почта
            mail: mail,
            // Комментарий
            comment: comment,
            // Валидность имени
            nameValid: nameIsValid
        }

        // Биндинг всех методов
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    // Метод блокировки и анимации кнопки при нажатии
    show(btn) {
        // Блокируем кнопку
        btn.disabled = true;
        // Добавляем анимированный div загрузки, вместо текста
        btn.innerHTML = "<div class=\"lds-ring\"><div></div><div></div><div></div><div></div></div>";
    }

    // Метод отмены блокировки и анимации кнопки при нажатии
    hide(btn) {
        // Возвращаем текст на место иконки загрузки
        btn.innerHTML = "SEND";
        // Снимаем блокировку кнопки
        btn.disabled = false;
    }

    // Метод проверки длины имени
    validateName(name) {
        return name.length > 1;
    }

    // Обработчик на изменение имени
    handleChangeName(event) {
        // Берем значение инпута имени
        let val = event.target.value;
        // Выводим в консоль введенные символы
        console.log("Имя: " + val);
        // Проверяем валидность имени
        var valid = this.validateName(val);
        // Меняем состояние
        this.setState({
            name: event.target.value,
            nameValid: valid
        });
        // Записываем в LocalStorage
        localStorage.setItem("name", event.target.value);
    }

    // Обработчик на изменение почты
    handleChangeMail(event) {
        // Берем значение инпута почты
        var val = event.target.value;
        // Выводим в консоль введенные символы
        console.log("Mail: " + val);
        // Меняем состояние
        this.setState({
            mail: event.target.value
        });
        // Записываем в LocalStorage
        localStorage.setItem("mail", event.target.value);
    }

    // Обработчик на изменение комментария
    handleChangeComment(event) {
        // Берем значение поля комментария
        var val = event.target.value;
        // Выводим в консоль введенные символы
        console.log("Comment: " + val);
        // Меняем состояние
        this.setState({
            comment: event.target.value
        });
        // Записываем в LocalStorage
        localStorage.setItem("comment", event.target.value);
    }

    // Метод очистки LocalStorage
    resetForm() {
        // Меняем поля на пустые строки
        localStorage.setItem("name", "");
        localStorage.setItem("mail", "");
        localStorage.setItem("comment", "");
        // Меняем состояние
        this.setState({
            name: "",
            mail: "",
            comment: "",
        });
        // Очищаем инпуты и поля
        $(".name1").value = "";
        // Закрываем форму с помощью кнопки назад
        history.back();
    }

    // Обработчик нажатия кнопки назад
    handleSubmit(e) {
        // Запрет обновления страницы
        e.preventDefault();
        // Проверка валидности имени
        if (this.state.nameValid === true) {
            // Включаем блокировку и анимацию кнопки
            this.show(document.getElementById("modal-myform-sumbit"));
            // Отправляем форму на сервер
            fetch("https://formcarry.com/s/AFY3jk7Zmzm", {
                // Метод
                method: "POST",
                // Данные формы
                body: JSON.stringify(this.state),
                // Заголовки
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            }).then(
                (response) => (response.json())
            ).then((response) => {
                // Если успешно
                if (response.status === "success") {
                    // Выводим сообщение об отправке
                    alert("Сообщение отправлено!");
                    // Убираем анимацию и блокировку кнопки
                    this.hide(document.getElementById("modal-myform-sumbit"));
                    // Очищаем и закрываем форму
                    this.resetForm();
                // Если ошибка
                } else if (response.status === "fail") {
                    // Выводим сообщение об ошибке
                    alert("Ошибка отправки! Пожалуйста, повторите попытку.")
                    // Отключаем анимацию и блокировку кнопки
                    this.hide(document.getElementById("modal-myform-sumbit"));
                }
            })
        } else {
            alert("Ошибка ввода! Проверьте корректность введеного имени.");
        }
    }

    // Рендер формы
    render() {
        return (
            <div className="forma container">
                <div className="form_content">
                    <div className="contacts1">
                        <div className="title">AVIS ELECTRONICS</div>
                        <div>+86 (186) 66660854</div>
                        <div className="email">
                            <p className="label">E-Mail: </p><a href="#">sales@aviselectronics.com</a>
                        </div>
                        <div>Mon-Fri: 09:00 - 18:00, <br /> Sat: 09:00 - 12:00 (UTC +08:00)</div>
                    </div>
                    <form id="modal-myform" onSubmit={this.handleSubmit} method="POST" accept-charset="UTF-8">
                        <input className="name1 db" name="firstName" placeholder="Name" type="text" value={this.state.name} onChange={this.handleChangeName}/>
                        <input className="name1 db" name="email" placeholder="E-mail" type="email" value={this.state.mail} onChange={this.handleChangeMail}/>
                        <textarea className="name2 db" name="comment" placeholder="Comment" rows="5" value={this.state.comment} onChange={this.handleChangeComment}/>
                        <button id="modal-myform-sumbit" className="btn butt3" type="submit">Send</button>
                    </form>
                </div>
            </div>
        );
    }
}

// Создаем экземпляр класса
// Параметры: Тэг класса с его атрибутами, переменная куда вставлять
ReactDOM.render(<Form />, document.getElementById('modal'));