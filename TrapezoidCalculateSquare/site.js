function calculateTrapezoidArea() {
    const method = $('#calcMethod').val();
    $('#answer').show(300);

    switch (method) {
        case 'standard':
            standardArea();
            break;
        case 'diagonals':
            diagonalsArea();
            break;
        case 'middleLine':
            middleLineArea();
            break;
    }
}

function getTrapezoidValues() {
    return {
        val1: parseFloat($('.field1').val()),
        val2: parseFloat($('.field2').val()),
        val3: parseFloat($('.field3').val())
    };
}

function standardArea() {
    const { val1, val2, val3 } = getTrapezoidValues();
    let area = 0.5 * (val1 + val2) * val3;
    $('#answer').text(`Площадь трапеции: ${area.toFixed(2)}`);
}

function diagonalsArea() {
    const { val1, val2, val3 } = getTrapezoidValues();
    let area = 0.5 * (val1 * val2) * Math.sin(val3 * Math.PI / 180);
    $('#answer').text(`Площадь трапеции: ${area.toFixed(2)}`);
}

function middleLineArea() {
    const { val1, val2 } = getTrapezoidValues();
    $('#answer').text(`Площадь трапеции: ${val1 * val2}`);
}

function generateTrapezoidFields() {
    const method = $('#calcMethod').val();

    $('#answer').hide(300);
    $('.field1, .field2, .field3').val('');

    switch (method) {
        case 'standard':
            $('.field1').attr('placeholder', 'сторона a');
            $('.field2').attr('placeholder', 'сторона b');
            $('.field3').attr('placeholder', 'высота h');

            $('.field3').show(300);
            break;
        case 'diagonals':
            $('.field1').attr('placeholder', 'диагональ d1');
            $('.field2').attr('placeholder', 'диагональ d2');
            $('.field3').attr('placeholder', 'угол а');

            $('.field3').show(300);
            break;
        case 'middleLine':
            $('.field1').attr('placeholder', 'средняя линия m');
            $('.field2').attr('placeholder', 'высота h');

            $('.field3').hide(300);
            break;
    }
}