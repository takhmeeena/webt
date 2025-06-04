$(document).ready(function () {
    const menu = JSON.parse(localStorage.getItem('gildedFlameMenu')) || [];

    menu.forEach(dish => {
        const id = dish.category.replace(/\s/g, '') + 'List';
        $('#' + id).append(`
            <li>${dish.name} <span class="price">$${dish.price}</span></li>
        `);
    });

    const total = menu.reduce((sum, dish) => sum + parseFloat(dish.price), 0);
    $('#totalPrice').text(`Total Price: $${total.toFixed(2)}`);
});
