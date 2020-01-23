// Данный файл существует еще с предудущего задания
// Оставили для работы формы без модального окна
// Та, что находится внизу сайта

$(document).ready(function () {

    // Функция анимации и блокировки кнопки при нажатии
    let show = function(btn) {
        // Блокируем кнопку
        btn.disabled = true;
        // Добавляем анимированный div загрузки, вместо текста
        btn.innerHTML = "<div class=\"lds-ring\"><div></div><div></div><div></div><div></div></div>";
    };

    // Функция отмены блокировки и анимации кнопки при нажатии
    let hide = function(btn) {
        // Возвращаем текст
        btn.innerHTML = "SEND";
        // Снимаем блокировку кнопки
        btn.disabled = false;
    };

    // ### Работа с формой, AJAX запрос серверу с помощью fetch ###
    // 1. параметр FormID = "myform",
    // id тэга <form> для нужной нам формы
    // 2. параметр Submit Button ID = "myform-sumbit",
    // id кнопки отправки нужной формы
    // Вызываем AJAX функцию с нашими параметрами формы
    fetchForm("myform", "myform-sumbit");

    // Сама функция, которую мы вызываем
    function fetchForm(formID, buttonID) {
        // Находим форму по ID.
        let selectForm = document.getElementById(formID);
        // Находим кнопку формы по ID.
        let selectButton = document.getElementById(buttonID);
        // Получаем ссылку на formcarry из action.
        let formAction = selectForm.getAttribute("action");
        // Получаем метод (post) из method.
        let formMethod = selectForm.getAttribute("method");
        // Получем данные из input-ов формы.
        let formInputs = selectForm.querySelectorAll("input");
        // Получаем данные из textarea формы.
        let formTextAreas = selectForm.querySelectorAll("textarea");

        // Нажатие кнопки отправки
        selectForm.onsubmit = async (e) => {
            // Запрещаем обновление страницы
            e.preventDefault();
            // Блокирует кнопку и отображает анимацию загрузки
            show(selectButton);
            // Создаем объект данных формы
            var formData = new FormData();

            // Заполняем объект данных формы
            for (var i = 0; i < formInputs.length; i++) {
                // Добавляем все инпуты в formData().
                formData.append(formInputs[i].name, formInputs[i].value);
            }
            for (var i = 0; i < formTextAreas.length; i++) {
                // Добавляем все textareas в formData().
                formData.append(formTextAreas[i].name, formTextAreas[i].value);
            }

            // Отправляем запрос на сервер через fetch
            let response = await fetch(formAction, {
                // Метод "POST"
                method: formMethod,
                // Заголовки запроса для formcarry
                headers: {
                    "Accept": "application/json"
                },
                // Данные формы
                body: formData
            });

            // Если статус ok = true
            if (response.ok) {
                // Парсим ответ
                let result = await response.json();
                // Очищаем LocaleStorage
                localStorage.clear();
                // Если это модальное окно, то закрываем
                if (!$("#modal").hasClass("dn")) history.back();
                // Убираем блокировку и анимацию с кнопки
                hide(selectButton);
                // Выводим ответ
                alert(result.title + "\n" + result.message);
            } else {
                // Выводим сообщение об ошибке
                alert("Ошибка!\nПожалуйста, повторите попытку.");
                // Убираем блокировку и анимацию с кнопки
                hide(selectButton);
            }
        };
    }
});