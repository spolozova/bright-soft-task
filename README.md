# Тестовое задание для веб-разработчика Angular

## [Live DEMO](https://tv-users-test.vercel.app/)

## Описание

Нужно сделать таблицу с пользователями, в которой будет отображаться имя пользователя и любимый канал.
Любимый канал должен выбираться на основе предпочтений пользователя.

## Задача

1. Реализуйте компонент с таблицей: в первой колонке отображение имени пользователя, во второй колонке отображение любимого канала.
2. Реализуйте получение данных пользователей и передач по запросу. Не нужно создавать crud-сервер, получайте все необходимые данные из `json`, которые доступны в `assets`. Пример такого запроса уже есть в `app.component.ts`. Сделайте запросы асинхронными.
3. Реализуйте логику нахождения любимого канала. Она очень простая: любимым каналом считается тот, чьи передачи пользователю нравятся в большинстве.
Например: `Ivan Ivanov` любит передачи с идентификаторами(`favorite_content_id`) 1, 2, и 5 - это передачи с названиями `Новости`, `Загадка дыры` и `Ещё одна передача`. Две из этих передач принадлежат телеканалу с идентификатором(`channel_id`) 1, и одна передача принадлежит телеканалу с идентификатором 4. Получается что этому пользователю нравятся в большинстве передачи телеканала с идентификатором 1 - это `Первый канал`. Соответственно у этого пользователя в таблице должен стоять этот канал. Если получается несколько любимых телеканалов, то они должны отображаться через запятую.
5. Реализуйте отдельный компонент для добавления пользователя в таблицу. Это может быть либо модальное окно, либо дополнительная строка в таблице с вводом данных.
Форма заполнения данных должна содержать:
    * инпут для ввода имени
    * селектор для выбора передач из списка с возможностью множественного выбора
    * кнопка добавления пользователя
6. Для запроса добавления используйте фейковый пост-запрос, например на [https://reqres.in/api/users](https://reqres.in/api/users). Продумайте отображение о статусе добавления: спиннер или хотя бы блокировку кнопки пока запрос отправляется. Если запрос упал с ошибкой, то на форме должен отобразиться текст с ошибкой.
7. Подключите к проекту бутстрап, используйте его стили.
8. Разрешается подключать различные библиотеки.
9. Используйте данный репозиторий в качестве шаблона, внесите в него свои правки и запушьте в свой репозиторий.
10. Добавьте модели данных и используйте их в коде.
10. Будет плюсом, если задеплоите куда-нибудь готовый проект, например на [https://www.heroku.com/](https://www.heroku.com/) или [https://vercel.com/](https://vercel.com/) и добавите ссылку в `README.md` своего репозитория.

## Файлы
При необходимости можете добавлять в эти файлы свои данные.
* `users.json` - пользователи
* `content.json` - передачи
* `tv_channels.json` - каналы
