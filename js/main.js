$(document).ready(function () {
    // Начало файла main.js

    // ### Боковое меню ###
    // Нажатие на кнопку гамбургера (открыть меню)
    $("#nav-btn-open").click(function () {
        // Отображаем меню
        $("body").toggleClass("openNav");
        // Для дебага
        console.log("Menu opened");
        // Анимируем увеличение ширины
        $(".second_menu").animate({
            width: "70%"
        });
    });
    // Нажатие на кнопку крестика (закрыть меню)
    $("#nav-btn-cancel").click(function () {
        // Для дебага
        console.log("Menu closed");
        // Анимируем уменьшение ширины
        $(".second_menu").animate({
            width: "0%"
        }, {
            // По окончании анимации вызываем функцию
            complete: function () {
                // Скрываем меню
                $("body").toggleClass("openNav");
            }
        });
    });

    // ### Модальное окно с формой ###
    // Отображение модального окна с формой
    var showModal = function () {
        // Просто добавляем или убираем класс display: none;
        $("#modal").toggleClass("dn");
        // Находим блок модального окна
        let modal = document.getElementById("modal");
        // Запускаем функцию анимации
        animateModal({
            // Длительность: 300 мс
            duration: 300,
            // Фукнция тайминга
            timing: function (timeFraction) {
                return timeFraction;
            },
            // Функция отрисовки анимации
            draw: function (progress) {
                // Прозрачность окна равна прогрессу анимации (от 0 до 1)
                modal.style.opacity = progress;
                // Данный блок не работает для мобильных устройств
                if ($(document).width() > 650) {
                    // Изменяем отступ модального окна сверху
                    modal.style.marginTop = progress * 4 + "rem";
                }
            }
        });
    }
    // Функция анимации модального окна
    function animateModal({
        // Длительность
        duration,
        // Функция тайминга
        timing,
        // Функция отрисовки анимации
        draw
    }) {
        // Начало анимации
        let start = performance.now();
        // Анимация через requestAnimationFrame
        requestAnimationFrame(function animate(time) {
            // Рассчитываем время анимации
            let timeFraction = (time - start) / duration;
            // Если время анимации превысило 1, ставим = 1
            if (timeFraction > 1) timeFraction = 1;

            let progress = timing(timeFraction)
            // Запускаем отрисовку
            draw(progress);
            // Если анимация еще не закончена, запускаем ее заново
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }
    // Вешаем обработчик изменений записи в истории браузера
    window.addEventListener("popstate", function (e) {
        // Вызываем открытие или закрытие формы
        showModal();
    });
    // Кнопки "FIND OUT MORE"
    let buttons = document.querySelectorAll(".slbutt");
    // Для каждой из кнопок вешаем обработчик нажатий
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (e) {
            // Если это не ссылка, выходим
            if (e.target.tagName !== "A") return;
            // Инициализируем объект state с полем page
            var state = {
                // Данное поле хранит в себе ссылку на модальное окно
                page: e.target.getAttribute("href")
            };
            // Переходим по этой ссылке
            history.pushState(state, "", state.page);
            // Отображаем модальное окно
            showModal();
            // Блокируем перезагрузку страницы
            e.preventDefault();
        });
    }
    // Конец файла main.js
});
