$(document).ready(function () {
    let menu = JSON.parse(localStorage.getItem('gildedFlameMenu')) || [];
    const validCategories = ['Grilled Skewers', 'Side Dishes', 'Drinks', 'Desserts'];

    function saveMenu() {
        localStorage.setItem('gildedFlameMenu', JSON.stringify(menu));
    }

    function renderMenu() {
        $('#menuList').empty();
        menu.forEach((dish, index) => {
            $('#menuList').append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${dish.name} (${dish.category})
                    <span class="badge bg-primary rounded-pill">$${dish.price}</span>
                    <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </li>
            `);
        });

        $('.delete-btn').click(function () {
            const index = $(this).data('index');
            menu.splice(index, 1);
            saveMenu();
            renderMenu();
        });
    }

    $('#addDishBtn').click(function () {
        const name = $('#dishName').val().trim();
        const price = $('#dishPrice').val();
        const category = $('#dishCategory').val();

        if (name && price && validCategories.includes(category)) {
            menu.push({ name, price, category });
            saveMenu();
            renderMenu();
            $('#dishName').val('');
            $('#dishPrice').val('');
            $('#dishCategory').val('');
        } else {
            alert('Please fill all fields and choose a valid category.');
        }
    });

    renderMenu();
});

