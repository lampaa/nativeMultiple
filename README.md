# nativeMultiple
Плагин для расширения нативного слайдера

Посмотреть пример можно тут: http://lampaa.github.io/nativemultiple/

<h3>Инициализация</h3>

```js
$('input[name=three]').nativeMultiple({
    stylesheet: "slider",
    onCreate: function() {
        console.log(this);
    },
    onChange: function(first_value, second_value) {
        console.log('onchange', [first_value, second_value]);
    },
    onSlide: function(first_value, second_value) {
        console.log('onslide', [first_value, second_value]);
    }
});
```

```html
<input type="range" min="0" max="180" step="20" value="0,10" />
```



<h3>Параметры плагина</h3>

```stylesheet``` - дополнительный класс для слайдера.



<h3>Параметры элемента</h3>

```min```  - минимальное значение

```max```  - максимальное значение

```step```  - шаг слайдера (по умолчанию 1, этот параметр можно опустить)

```value```  - начальное и конечное значения ползунков через запятую. При отсутствии запятой начальное и конечное равняются данному значению. При отсутствии значения начальное и конечное равны минимальному и максимальному значению соответственно.



<h3>События</h3>

```onCreate``` возникает при инициализации слайдера.

```onSlide```  возникает при движении одного из ползунков.

```onChange```  возникает при завершении движения одного из ползунков.

<h3>Реализации</h3>
https://github.com/comerc/meteor-autoform-nativemultiple - обертка для Meteor AutoForm
