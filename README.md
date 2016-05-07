# pm
Symfony обертка для http://ludwigbistronovsky.ru/tools/e/

Как использовать
-----

Для начала загляни в sample.html. Если все еще непонятно, что к чему, продолжай читать.

Это код из sample.html:

<div>PM sample</div>
    <script>
        var prefpath = './'; // это нужно для того, чтобы правильно подгружались темплейты и все такое
                             // по умолчанию все что ставится через composer кладется в директорию vendor
                             // эта директория может быть выше на один уровень чем корень хоста
                             // чтобы require.js и angular нашли все необходимые файлы, нужно определить префикс пути до них
                             // на сайте Людвига это '/pm/';
    </script>
    <script src="app/require.js"></script> // подключаем require.js (без него была каша из подключаемых js-ников)
    <script src="app/app.js"></script>     // само приложение
    <span ng-controller="rootCtrl"></span>
    <section data-ui-view on-scroll>
        <div ng-include="templates.index"></div>
    </section>
</div>


Если остались вопросы
---------------------

Пишите: a.aleksu@gmail.com
