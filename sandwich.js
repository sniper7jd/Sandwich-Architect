document.addEventListener('DOMContentLoaded', () => {
    // DATA
    // generated multiple elements using https://placehold.co/
    const breads = [
        { id: 'white', name: 'White Bread', image: 'https://placehold.co/200x150/FFF4E0/333333?text=White' },
        { id: 'wheat', name: 'Wheat Bread', image: 'https://placehold.co/200x150/D2B48C/333333?text=Wheat' },
        { id: 'sourdough', name: 'Sourdough', image: 'https://placehold.co/200x150/F5DEB3/333333?text=Sourdough' },
        { id: 'rye', name: 'Rye Bread', image: 'https://placehold.co/200x150/DEB887/333333?text=Rye' },
    ];
    const toppings = {
        patties: [
            { id: 'beef', name: 'Beef Patty', type: 'patty', image: 'https://placehold.co/200x150/8B4513/FFFFFF?text=Beef' },
            { id: 'chicken', name: 'Chicken Patty', type: 'patty', image: 'https://placehold.co/200x150/F0E68C/333333?text=Chicken' },
            { id: 'veggie', name: 'Veggie Patty', type: 'patty', image: 'https://placehold.co/200x150/228B22/FFFFFF?text=Veggie' },
        ],
        vegetables: [
            { id: 'lettuce', name: 'Lettuce', type: 'vegetable', image: 'https://placehold.co/200x150/90EE90/333333?text=Lettuce' },
            { id: 'tomato', name: 'Tomato', type: 'vegetable', image: 'https://placehold.co/200x150/FF6347/FFFFFF?text=Tomato' },
            { id: 'onion', name: 'Onion', type: 'vegetable', image: 'https://placehold.co/200x150/DDA0DD/333333?text=Onion' },
            { id: 'pickle', name: 'Pickles', type: 'vegetable', image: 'https://placehold.co/200x150/6B8E23/FFFFFF?text=Pickles' },
            { id: 'cucumber', name: 'Cucumber', type: 'vegetable', image: 'https://placehold.co/200x150/3CB371/FFFFFF?text=Cucumber' },
            { id: 'peppers', name: 'Bell Peppers', type: 'vegetable', image: 'https://placehold.co/200x150/FFD700/333333?text=Peppers' },
        ],
        sauces: [
            { id: 'ketchup', name: 'Ketchup', type: 'sauce', image: 'https://placehold.co/200x150/FF0000/FFFFFF?text=Ketchup' },
            { id: 'mustard', name: 'Mustard', type: 'sauce', image: 'https://placehold.co/200x150/FFDB58/333333?text=Mustard' },
            { id: 'mayo', name: 'Mayonnaise', type: 'sauce', image: 'https://placehold.co/200x150/FFFFF0/333333?text=Mayo' },
            { id: 'bbq', name: 'BBQ Sauce', type: 'sauce', image: 'https://placehold.co/200x150/A0522D/FFFFFF?text=BBQ' },
            { id: 'ranch', name: 'Ranch', type: 'sauce', image: 'https://placehold.co/200x150/F5F5DC/333333?text=Ranch' },
            { id: 'chipotle', name: 'Chipotle Aioli', type: 'sauce', image: 'https://placehold.co/200x150/CD853F/FFFFFF?text=Chipotle' },
        ]
    };
    const RULES = {
        patty: { max: 1, message: "You can only select one patty." },
        vegetable: { max: 4, message: "You can select a maximum of 4 vegetables." },
        sauce: { max: 3, message: "You can select a maximum of 3 sauces." }
    };

    //  DOM ELEMENTS 
    const elements = {
        breadSelection: document.getElementById('bread-selection'),
        toppingsSelection: document.getElementById('toppings-selection'),
        completionScreen: document.getElementById('completion-screen'),
        breadOptions: document.getElementById('bread-options'),
        toppingsOptions: document.getElementById('toppings-options'),
        summaryPanel: document.getElementById('summaryPanel'),
        summaryContent: document.getElementById('summary-content'),
        finalSummary: document.getElementById('final-summary'),
        buildBtn: document.getElementById('build-btn'),
        changeBreadBtn: document.getElementById('change-bread-btn'),
        startOverBtn: document.getElementById('start-over-btn'),
        warningModal: document.getElementById('warning-modal'),
        warningModalContent: document.getElementById('warning-modal-content'),
        warningMessage: document.getElementById('warning-message'),
        closeModalBtn: document.getElementById('close-modal-btn'),
    };

    // STATE
    let state = { selectedBread: null, selectedToppings: [], view: 'bread' };

    // Merge new state with existing, then re-render
    const update = (newState) => {
        Object.assign(state, newState);
        render();
    };

    const toggleWarning = (show, message = '') => {
        elements.warningMessage.innerHTML = message;
        elements.warningModal.classList.toggle('opacity-0', !show);
        elements.warningModal.classList.toggle('pointer-events-none', !show);
        elements.warningModalContent.classList.toggle('scale-95', !show);
    };

    // RENDER
    function render() {
        // Show/hide views
        elements.breadSelection.classList.toggle('hidden', state.view !== 'bread');
        elements.toppingsSelection.classList.toggle('hidden', state.view !== 'toppings');
        elements.completionScreen.classList.toggle('hidden', state.view !== 'complete');
        elements.summaryPanel.classList.toggle('opacity-0', state.view === 'complete');
        elements.summaryPanel.classList.toggle('pointer-events-none', state.view === 'complete');

        if (state.view !== 'complete') {
            elements.summaryContent.innerHTML = !state.selectedBread
                ? `<p class="text-gray-500 italic text-center mt-8">Your creation starts with bread...</p>`
                : `<div class="font-semibold"><strong>Bread:</strong> ${state.selectedBread.name}</div>
                   ${state.selectedToppings.length > 0
                       ? `<div class="font-semibold mt-4"><strong>Toppings:</strong></div><ul>${state.selectedToppings.map(t => `<li class="ml-4 list-disc">${t.name}</li>`).join('')}</ul>`
                       : `<p class="text-gray-500 italic text-sm">Select some toppings...</p>`}`;
            elements.buildBtn.disabled = !state.selectedBread;
        }

        // Track how many items of each type are selected
        const counts = state.selectedToppings.reduce((acc, t) => ({ ...acc, [t.type]: (acc[t.type] || 0) + 1 }), {});
        document.querySelectorAll('.item-card').forEach(card => {
            const { id, type, topping } = card.dataset;
            const item = topping ? JSON.parse(topping) : null;
            const isSelected = type === 'bread' 
                ? (state.selectedBread && id === state.selectedBread.id)
                : state.selectedToppings.some(t => t.id === id);
            
            card.classList.toggle('selected', isSelected);
            card.classList.toggle('opacity-0', type === 'bread' && state.selectedBread && !isSelected);
            card.classList.toggle('pointer-events-none', type === 'bread' && state.selectedBread && !isSelected);
            card.classList.toggle('disabled', !isSelected && item && counts[item.type] >= RULES[item.type].max);
        });
    }

    // INITIALIZATION
    function init() {
        // build HTML for each item card
        const createItemCardHTML = (item, type) => `
            <div class="item-card bg-white p-4 rounded-lg shadow-md cursor-pointer text-center flex flex-col justify-between" 
                 data-id="${item.id}" data-type="${type}" ${type === 'topping' ? `data-topping='${JSON.stringify(item)}'` : ''}>
                <img src="${item.image}" alt="${item.name}" class="w-full h-24 object-cover rounded-md mb-3 pointer-events-none">
                <span class="font-medium pointer-events-none">${item.name}</span>
            </div>`;

        elements.breadOptions.innerHTML = breads.map(b => createItemCardHTML(b, 'bread')).join('');
        elements.toppingsOptions.innerHTML = Object.entries(toppings).map(([category, items]) => {
            const itemType = items[0].type;
            const ruleText = RULES[itemType] ? `(Max ${RULES[itemType].max})` : '';
            return `
            <div>
                <h3 class="text-xl font-semibold mb-3">${category.charAt(0).toUpperCase() + category.slice(1)} ${ruleText}</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">${items.map(item => createItemCardHTML(item, 'topping')).join('')}</div>
            </div>`;
        }).join('');

        // Event Listeners
        elements.changeBreadBtn.addEventListener('click', () => update({ selectedBread: null, selectedToppings: [], view: 'bread' }));
        elements.startOverBtn.addEventListener('click', () => update({ selectedBread: null, selectedToppings: [], view: 'bread' }));
        
        elements.breadOptions.addEventListener('click', e => {
            const card = e.target.closest('.item-card[data-type="bread"]');
            if (card) {
                update({ selectedBread: breads.find(b => b.id === card.dataset.id) });
                setTimeout(() => update({ view: 'toppings' }), 500);
            }
        });

        elements.toppingsOptions.addEventListener('click', e => {
            const card = e.target.closest('.item-card[data-type="topping"]');
            if (!card || card.classList.contains('disabled')) return;
            
            const topping = JSON.parse(card.dataset.topping);
            const isSelected = state.selectedToppings.some(t => t.id === topping.id);
            
            if (isSelected) {
                update({ selectedToppings: state.selectedToppings.filter(t => t.id !== topping.id) });
            } else {
                const counts = state.selectedToppings.reduce((acc, t) => ({ ...acc, [t.type]: (acc[t.type] || 0) + 1 }), {});
                if (counts[topping.type] >= RULES[topping.type].max) {
                    return toggleWarning(true, RULES[topping.type].message);
                }
                update({ selectedToppings: [...state.selectedToppings, topping] });
            }
        });

        // Build final sandwich
        elements.buildBtn.addEventListener('click', () => {
            const errors = [];
            if (!state.selectedToppings.some(t => t.type === 'patty')) errors.push("You must select exactly one patty.");
            if (!state.selectedToppings.some(t => t.type === 'vegetable')) errors.push("You must select at least one vegetable.");

            if (errors.length) return toggleWarning(true, "Please fix the following:<br>" + errors.map(e => `&bull; ${e}`).join('<br>'));
            
            elements.finalSummary.innerHTML = `<p><strong>Bread:</strong> ${state.selectedBread.name}</p><p class="mt-2"><strong>Toppings:</strong></p><ul class="list-disc list-inside">${state.selectedToppings.map(t => `<li>${t.name}</li>`).join('')}</ul>`;
            update({ view: 'complete' });
        });

        // Modal close
        elements.closeModalBtn.addEventListener('click', () => toggleWarning(false));
        elements.warningModal.addEventListener('click', e => e.target === elements.warningModal && toggleWarning(false));
        
        render();
    }

    init();
});


