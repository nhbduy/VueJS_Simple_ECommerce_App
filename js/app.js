new Vue({
    el: '#app',
    data: {
        products: [{
                id: 1,
                name: 'MacBook Pro (15 inch)',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 2999,
                inStock: 50
            },
            {
                id: 2,
                name: 'Samsung Galaxy Note 7',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 299,
                inStock: 755
            },
            {
                id: 3,
                name: 'HP Officejet 5740 e-All-in-One-printer',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 149,
                inStock: 5
            },
            {
                id: 4,
                name: 'iPhone 7 cover',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 49,
                inStock: 42
            },
            {
                id: 5,
                name: 'iPad Pro (9.7 inch)',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 599,
                inStock: 0
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 19,
                inStock: 81
            }
        ],

        cart: {
            items: []
        },

        isShowingCart: false
    },

    filters: {
        currency: function (value) {
            var formatter = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });

            return formatter.format(value);
        }
    },

    methods: {
        addToCart: function (product) {
            var cartItem = this.getCartItem(product);
            if (cartItem != null) {
                cartItem.qty++;
            } else {
                this.cart.items.push({
                    prod: product,
                    qty: 1
                });
            }

            product.inStock--;
        },

        getCartItem: function (product) {
            for (var i = 0; i < this.cart.items.length; i++) {
                if (this.cart.items[i].prod.id == product.id) {
                    return this.cart.items[i];
                }
            }

            return null;
        },

        increaseQty: function (cartItem) {
            cartItem.prod.inStock--;
            cartItem.qty++;
        },

        decreaseQty: function (cartItem) {
            cartItem.qty--;
            cartItem.prod.inStock++;

            if (cartItem.qty == 0) {
                this.removeItemFromCart(cartItem)
            }
        },

        removeItemFromCart: function (cartItem) {
            var index = this.cart.items.indexOf(cartItem);

            if (index !== -1) {
                this.cart.items.splice(index, 1);
            }
        },

        checkout: function () {
            if (confirm('Are you sure to purchase these products in your cart?')) {
                // this.cart.items.forEach(function (item) {
                //     item.prod.inStock += item.qty;
                // });

                this.cart.items = [];
            }
        }
    },

    computed: {
        cartTotal: function () {
            var total = 0;
            this.cart.items.forEach(function (item) {
                total += item.qty * item.prod.price;
            });

            return total;
        },
        taxAmount: function () {
            return ((this.cartTotal * 10) / 100);
        }
    },
});