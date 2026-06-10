jQuery(document).ready(function ($) {
    // Статусы
    const STATUS_FREE = 'Свободный участок';
    const STATUS_HOUSE_READY = 'Участок с готовым домом';
    const STATUS_HOUSE_BUILDING = 'Участок с домом';
    const STATUS_RESERVED = 'Забронированный участок';
    const STATUS_SOLD = 'Проданный участок';

    const statusColors = {
        [STATUS_FREE]: '#ABDE36',
        [STATUS_HOUSE_READY]: '#ABDE36',
        [STATUS_HOUSE_BUILDING]: '#ABDE36',
        [STATUS_RESERVED]: '#DEB736',
        [STATUS_SOLD]: '#b2b2b280',
    };

    // Значения по умолчанию 
    const DEFAULT_AREA_PRICE = 3; // цена за сотку участка, если не указана стоимость участка, но указана площадь участка
    const DEFAULT_HOUSE_PRICE = 2; // цена за кв. метр дома, если не указана стоимость дома, но указана площадь дома


    // Основные данные по участкам
    const locationData = {
        '267': { status: STATUS_HOUSE_READY, name: 'Модерн L', area: 8.98, price: '3592000', houseArea: 235, housePrice: 12757000, 'house-link': 'https://svoi12.ru/p/modernl/', image: '267.jpg' },
        '235': { status: STATUS_HOUSE_BUILDING, name: 'Райт S', area: 6.49, price: '2920500', houseArea: 120, housePrice: 9300000, image: 'rites.jpg' },
        '277': { status: STATUS_HOUSE_READY, name: 'Сканди S+', area: 7.53, price: '3012000', houseArea: 140, housePrice: 11800000, 'house-link': 'https://svoi12.ru/p/scandisplus/', image: 'skandisplnew.jpg'},
        '285': { status: STATUS_HOUSE_BUILDING, name: 'Барн S', area: 9.18, price: '3672000', houseArea: 185, housePrice: 10500000, 'house-link': 'https://svoi12.ru/p/barnx/', image: 'barns.jpg' },
        '288': { status: STATUS_SOLD, name: 'Модерн S+', area: 8.74, price: '3496000', houseArea: 170, housePrice: 11320000, 'house-link': 'https://svoi12.ru/p/modernsplus/', image: 'modernsgar.jpg' },
        '289': { status: STATUS_HOUSE_BUILDING, name: 'Барн М', area: 9.93, price: '3972000', houseArea: 200, housePrice: 12000000, 'house-link': 'https://svoi12.ru/p/barnm/', image: 'barnm.jpg' },
        '292': { status: STATUS_HOUSE_BUILDING, name: 'Модерн XL', area: 15, price: '6750000', houseArea: 225, housePrice: 13500000, 'house-link': 'https://svoi12.ru/p/modernxl/', image: 'modernxl.jpg' },
        '300': { status: STATUS_HOUSE_BUILDING, name: 'Сканди S', area: 9.12, price: '3648000', houseArea: 140, housePrice: 9800000, 'house-link': 'https://svoi12.ru/p/scandisplus/', image: 'skandis.jpg' },
        '305': { status: STATUS_FREE, name: '305', area: 10, price: '3500000'}, 
        '306': { status: STATUS_FREE, name: '306', area: 10, price: '3500000'},
        '307': { status: STATUS_FREE, name: '305', area: 10, price: '3500000'},
        '308': { status: STATUS_FREE, name: '308', area: 8.36, price: '2926000'}, 
        '309': { status: STATUS_FREE, name: '309', area: 8.36, price: '2926000'},
        '310': { status: STATUS_FREE, name: '310', area: 8.36, price: '2926000'},
        '220': { status: STATUS_HOUSE_BUILDING, name: '220', area: 8.5, price: '3418000', housePrice: 8000000, image: '1006newbarn2.jpg'},
        '221': { status: STATUS_HOUSE_BUILDING, name: '220', area: 8.5, price: '3419000', housePrice: 8000000, image: '1006newbarn2.jpg'},
        '311': { status: STATUS_FREE, name: '311', area: 8.35, price: '2922500'},
        '232': { status: STATUS_RESERVED, name: '232', area: 8.35, price: '2922500'},
        '312': { status: STATUS_FREE, name: '312', area: 9.24, price: '3234000'},
        '248': { status: STATUS_HOUSE_BUILDING, name: 'Райт М', area: 9.56, price: '3824000', houseArea: 160, housePrice: 11200000, image: 'ritem.jpg'},
        '249': { status: STATUS_HOUSE_BUILDING, name: 'Райт М', area: 9.55, price: '3820000', houseArea: 160, housePrice: 11200000, image: 'ritem.jpg'},
        '250': { status: STATUS_SOLD, name: 'Модерн S+', area: 9.55, price: '3820000', houseArea: 175, housePrice: 11000000, 'house-link': 'https://svoi12.ru/p/modernsplus/', image: 'modernsgar.jpg'},
        '247': { status: STATUS_HOUSE_BUILDING, name: 'Сканди S', area: 9.24, price: '3696000', houseArea: 140, housePrice: 9800000, 'house-link': 'https://svoi12.ru/p/scandis/', image: 'skandis.jpg'},
        '245': { status: STATUS_HOUSE_BUILDING, name: 'Райт S', area: 7.07, price: '2828000', houseArea: 120, housePrice: 8500000, image: 'rites.jpg'},
        '243': { status: STATUS_HOUSE_BUILDING, name: 'Райт М', area: 9.24, price: '3696000', houseArea: 160, housePrice: 11200000, image: 'ritem.jpg'},
        '239': { status: STATUS_HOUSE_BUILDING, name: 'Барн М', area: 9.45, price: '4252500', houseArea: 200, housePrice: 12000000, 'house-link': 'https://svoi12.ru/p/barnm/', image: 'barnm.jpg'},
        '228': { status: STATUS_HOUSE_BUILDING, name: 'Сканди S', area: 9.84, price: '3936000', houseArea: 140, housePrice: 9800000, 'house-link': 'https://svoi12.ru/p/rites/', image: '1006rites.jpg'},
        '229': { status: STATUS_HOUSE_BUILDING, name: 'Модерн S+', area: 9.31, price: '3724000', houseArea: 140, housePrice: 9300000, 'house-link': 'https://svoi12.ru/p/moderns/', image: 'modernspl.jpg'},
        '236': { status: STATUS_HOUSE_BUILDING, name: 'Барн S', area: 8.26, price: '3717000', houseArea: 185, housePrice: 10500000, 'house-link': 'https://svoi12.ru/p/barnx/', image: 'barns.jpg'},
        '238': { status: STATUS_RESERVED, name: 'Барн М', area: 9.45, price: '4252500', houseArea: 200, housePrice: 12000000, 'house-link': 'https://svoi12.ru/p/barnm/', image: 'barnm.jpg'},
        '219': { status: STATUS_HOUSE_BUILDING, name: 'Барн S', area: 9.34, price: '3736000', houseArea: 185, housePrice: 10500000, 'house-link': 'https://svoi12.ru/p/barnx/'},
        '227': { status: STATUS_HOUSE_BUILDING, name: 'Барн XS', area: 6.43, price: '2572000', houseArea: 90, housePrice: 7100000, 'house-link': 'https://svoi12.ru/p/barnxs/', image: 'barnxs.jpg'},
        '231': { status: STATUS_HOUSE_BUILDING, name: 'Модерн S', area: 8.19, price: '3276000', houseArea: 170, housePrice: 9500000, 'house-link': 'https://svoi12.ru/p/moderns/', image: 'mods231.jpg'},
        '223': { status: STATUS_FREE, name: '223', area: 8.54, price: '3416000'},
        '224': { status: STATUS_FREE, name: '224', area: 8.54, price: '3416000'},
        '237': { status: STATUS_SOLD, name: '237'},
        '233': { status: STATUS_SOLD, name: '233'},
        '226': { status: STATUS_SOLD, name: '226'},
        '240': { status: STATUS_SOLD, name: '240'},
        '244': { status: STATUS_SOLD, name: '244'},
        '246': { status: STATUS_SOLD, name: '246'},
        '251': { status: STATUS_SOLD, name: '251'},
        '253': { status: STATUS_SOLD, name: '253'},
        '254': { status: STATUS_SOLD, name: '254'},
        '255': { status: STATUS_SOLD, name: '255'},
        '256': { status: STATUS_SOLD, name: '256'},
        '257': { status: STATUS_SOLD, name: '257'},
        '258': { status: STATUS_SOLD, name: '258'},
        '259': { status: STATUS_SOLD, name: '259'},
        '261': { status: STATUS_SOLD, name: '261'},
        '262': { status: STATUS_SOLD, name: '262'},
        '263': { status: STATUS_SOLD, name: '263'},
        '265': { status: STATUS_SOLD, name: '265'},
        '266': { status: STATUS_SOLD, name: '266'},
        '268': { status: STATUS_SOLD, name: '268'},
        '269': { status: STATUS_SOLD, name: '269'},
        '270': { status: STATUS_SOLD, name: '270'},
        '271': { status: STATUS_SOLD, name: '271'},
        '272': { status: STATUS_SOLD, name: '272'},
        '273': { status: STATUS_SOLD, name: '273'},
        '274': { status: STATUS_SOLD, name: '274'},
        '275': { status: STATUS_SOLD, name: '275'},
        '276': { status: STATUS_SOLD, name: '276'},
        '278': { status: STATUS_SOLD, name: '278'},
        '279': { status: STATUS_SOLD, name: '279'},
        '280': { status: STATUS_SOLD, name: '280'},
        '281': { status: STATUS_SOLD, name: '281'},
        '282': { status: STATUS_SOLD, name: '282'},
        '283': { status: STATUS_SOLD, name: '283'},
        '284': { status: STATUS_SOLD, name: '284'},
        '286': { status: STATUS_SOLD, name: '286'},
        '287': { status: STATUS_SOLD, name: '287'},
        '291': { status: STATUS_SOLD, name: '291'},
        '290': { status: STATUS_SOLD, name: '290'},
        '295': { status: STATUS_SOLD, name: '295'},
        '296': { status: STATUS_SOLD, name: '296'},
        '297': { status: STATUS_SOLD, name: '297'},
        '301': { status: STATUS_SOLD, name: '301'},
    };

    // Инфраструктура
    const infraData = {
        'padel': { name: 'padel', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'tennis': { name: 'tennis', image: 'tenkort.jpg', link: 'https://svoi12.ru/' },
        'stage': { name: 'stage', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'rope': { name: 'rope', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'workout': { name: 'workout', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'parking': { name: 'parking', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'fish': { name: 'fish', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'water': { name: 'water', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'lake': { name: 'lake', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'kindergarden': { name: 'kindergarden', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'yoga': { name: 'yoga', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'art': { name: 'art', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'company': { name: 'company', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'company_2': { name: 'company_2', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'cafe': { name: 'cafe', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'park': { name: 'park', image: 'sempark.jpg', link: 'https://svoi12.ru/' },
        'park_2': { name: 'park_2', image: 'sempark.jpg', link: 'https://svoi12.ru/' },
        'field': { name: 'field', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'dog': { name: 'dog', image: 'pldsob.jpg', link: 'https://svoi12.ru/' },
        'pharmacy': { name: 'pharmacy', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'shop': { name: 'shop', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'playground': { name: 'playground', image: 'nophoto.jpg', link: 'https://svoi12.ru/' },
        'playground_2': { name: 'playground_2', image: 'dp1.jpg', link: 'https://svoi12.ru/' },
        'playground_3': { name: 'playground_3', image: 'dp2.jpg', link: 'https://svoi12.ru/' },
        'playground_4': { name: 'playground_4', image: 'dp3.jpg', link: 'https://svoi12.ru/' },
        'playground_5': { name: 'playground_5', image: 'dp4.jpg', link: 'https://svoi12.ru/' },
        'playground_6': { name: 'playground_6', image: 'dp2.jpg', link: 'https://svoi12.ru/' },
        'playground_7': { name: 'playground_7', image: 'dp3.jpg', link: 'https://svoi12.ru/' },
        'playground_8': { name: 'playground_8', image: 'dp4.jpg', link: 'https://svoi12.ru/' },
        'playground_9': { name: 'playground_9', image: 'dp2.jpg', link: 'https://svoi12.ru/' },
        'playground_10': { name: 'playground_10', image: 'dp3.jpg', link: 'https://svoi12.ru/' },
        'playground_11': { name: 'playground_11', image: 'dp4.jpg', link: 'https://svoi12.ru/' },
        'playground_12': { name: 'playground_12', image: 'dp2.jpg', link: 'https://svoi12.ru/' },
        'gate': { name: 'gate', image: 'kpp.jpg', link: 'https://svoi12.ru/' },
        'gate_2': { name: 'gate_2', image: 'kpp.jpg', link: 'https://svoi12.ru/' }
    };

    // Hover для инфраструктуры — показываем подсказку с названием
    Object.keys(infraData).forEach(function (id) {
        const $elem = $('#' + id);
        if (!$elem.length) return;

        const data = infraData[id];
        const name = data.name || '';

        // Наведение
        $elem.css('cursor', 'pointer');

        $elem.hover(
            function (event) {
                // Создаём tooltip
                let $tooltip = $('#infra-tooltip');
                if (!$tooltip.length) {
                    $tooltip = $('<div id="infra-tooltip"></div>').appendTo('body');
                    $tooltip.css({
                        'position': 'absolute',
                        'background': '#333',
                        'color': '#fff',
                        'padding': '4px 8px',
                        'border-radius': '4px',
                        'font-size': '12px',
                        'pointer-events': 'none',
                        'white-space': 'nowrap',
                        'z-index': 1000,
                        'opacity': 0,
                        'transition': 'opacity 0.2s'
                    });
                }

                $tooltip.text(name).css({
                    top: event.pageY + 10 + 'px',
                    left: event.pageX + 10 + 'px',
                    opacity: 1
                });
            },
            function () {
                // Скрываем tooltip
                $('#infra-tooltip').css('opacity', 0);
            }
        );

        // Обновляем позицию tooltip при движении мыши
        $elem.on('mousemove', function (event) {
            const $tooltip = $('#infra-tooltip');
            if ($tooltip.length && $tooltip.css('opacity') !== '0') {
                $tooltip.css({
                    top: event.pageY + 10 + 'px',
                    left: event.pageX + 10 + 'px'
                });
            }
        });
    });  

    



    // Функция окраски
    function setStatusColor(element, status) {
    if (!statusColors[status]) return;

    const id = $(element).attr('id');
    const $pin = $('#pin-' + id);

    // Меняем цвет pin, если есть
    if ($pin.length) {
        $pin.find('rect').css('fill', statusColors[status]);
    }

    // Меняем fill и stroke для самого участка
    $(element).attr('fill', statusColors[status]);
    $(element).attr('stroke', statusColors[status]);
}

    // Инициализация участков
    Object.keys(locationData).forEach(function (id) {
        const $elem = $('#' + id);
        if (!$elem.length) return;

        const data = locationData[id];
        const attrs = {};

        // Добавляем только реально указанные значения
        if (data.name) attrs['data-locationname'] = data.name;
        if (data.area !== undefined && data.area !== null) attrs['data-locationarea'] = data.area;
        if (data.price !== undefined && data.price !== null) attrs['data-locationprice'] = data.price;
        if (data.houseArea !== undefined && data.houseArea !== null) attrs['data-housearea'] = data.houseArea;
        if (data.housePrice !== undefined && data.housePrice !== null) attrs['data-houseprice'] = data.housePrice;

        $elem.attr(attrs);

        const status = data.status || STATUS_FREE;
        setStatusColor($elem, status);

        // Получаем pin соответствующего участка
        const $pin = $('#pin-' + id);

        // Сбрасываем прозрачность и задаём плавный переход
        $elem.css({
            'cursor': 'pointer',
            'opacity': '0',
            'transition': 'opacity 0.3s ease'
        });
        $pin.css({
            'opacity': '1',          // pin виден по умолчанию
            'transition': 'opacity 0.3s ease'
        });

        // hover на элемент участка
        $elem.hover(
            function () {
                $(this).css('opacity', '0.33'); // подсветка области
                $pin.css('opacity', '0');       // pin становится прозрачным
            },
            function () {
                $(this).css('opacity', '0');    // убираем подсветку области
                $pin.css('opacity', '1');       // pin возвращается
            }
        );
    });

    // Показ/скрытие balloon
    function showBalloon() {
        $('#balloon').addClass('balloon--active');
        $('#balloon-overlay').addClass('active');
    }

    function hideBalloon() {
        $('#balloon').removeClass('balloon--active');
        $('#balloon-overlay').removeClass('active');
    }

    $('#balloon-overlay').on('click', hideBalloon);



    // ✅ ЕДИНЫЙ обработчик
    $('#map').on('click', 'path, g', function () {

        const id = $(this).closest('[id]').attr('id');
        if (!id) return;

        // ======================
        // УЧАСТКИ
        // ======================
        if (locationData[id]) {

            const data = locationData[id];
            const status = data.status || STATUS_FREE;

            const area = data.area != null
                ? Number(data.area).toLocaleString('ru-RU') + ' соток'
                : null;

            const rawPrice = data.price ?? null;
            const houseAreaRaw = data.houseArea ?? null;
            const housePriceRaw = data.housePrice ?? null;

            const image = data.image ? `./img/${data.image}` : './img/default.jpg';

            let locationPriceValue = rawPrice !== null
                ? Number(rawPrice)
                : (data.area != null ? data.area * DEFAULT_AREA_PRICE : null);

            let housePriceValue = housePriceRaw !== null
                ? Number(housePriceRaw)
                : (houseAreaRaw != null ? houseAreaRaw * DEFAULT_HOUSE_PRICE : null);

            let totalPriceValue = data.totalPrice ?? (
                (locationPriceValue || 0) + (housePriceValue || 0)
            );

            function updateField(sel, val, wrap = null) {
                const $el = $(sel);
                const $wrap = wrap ? $(wrap) : $el;
                val ? ($el.text(val), $wrap.show()) : $wrap.hide();
            }

            updateField("#location-number", data.name);
            updateField("#location-status", status);
            updateField("#location-area", area, ".line:has(#location-area)");
            updateField("#location-price", locationPriceValue ? locationPriceValue.toLocaleString('ru-RU') + ' ₽' : '', ".line--location-price");
            updateField("#house-area", houseAreaRaw ? houseAreaRaw + ' м²' : '', ".line:has(#house-area)");
            updateField("#house-price", housePriceValue ? housePriceValue.toLocaleString('ru-RU') + ' ₽' : '', ".line:has(#house-price)");
            updateField("#total-price", totalPriceValue ? totalPriceValue.toLocaleString('ru-RU') + ' ₽' : '', ".line--total-price");

            $('.house__img').attr('src', image).show();

            if (data['house-link']) {
                $("#house-btn").attr("href", data['house-link']).show();
            } else {
                $("#house-btn").hide();
            }

            if (status === STATUS_SOLD) {
                $(".line--location-price, .line--total-price, .house").hide();
            } else if (status === STATUS_FREE) {
                $(".line--total-price").addClass("visually-hidden");
                $(".house").hide();
            } else {
                $(".house").show();
                $(".line--total-price").removeClass("visually-hidden");
            }

            showBalloon();
            return;
        }

        // ======================
        // ИНФРАСТРУКТУРА
        // ======================
        // ======================

if (infraData[id]) {

    const data = infraData[id];
    const image = data.image ? `./img/${data.image}` : null;

    // всегда скрываем номер участка для инфраструктуры
    $("#location-number").hide();

    // name → в статус
    $("#location-status").text(data.name || '');

    // скрываем линии и описание дома
    $(".line").hide();
    $(".house__description").hide();

    // картинка
    if (image) {
        $('.house__img').attr('src', image);
        $(".house").show();
    } else {
        $(".house").hide();
    }

    // кнопка "Подробнее"
    if (data.link) {
        $("#contact-btn")
            .attr("href", data.link)
            .attr("target", "_blank")
            .text("Подробнее")
            .show();
    } else {
        $("#contact-btn").hide();
    }

    // скрываем кнопку дома
    $("#house-btn").hide();

    showBalloon();
    return;
}
    });

    $('#svg').on('click', function (e) {
        const id = e.target.id;
        if (!id || (!(id in locationData) && !(id in infraData))) {
            hideBalloon();
        }
    });

    $('.balloon__close-button').on('click', function (event) {
        event.preventDefault();
        hideBalloon();
    });

});
