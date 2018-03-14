const cart = require('./cart.js');
const cars = require('./data/cars.js');

describe('Cart Properties:', () => {
  test('Expect cart to default to be an empty array.', () => {
    expect(Array.isArray(cart.cart)).toEqual(true);
    expect(cart.cart.length).toEqual(0);
  });

  test('Expect the default total property to be 0.', () => {
    expect(cart.total).toEqual(0);
  });

});

describe('Cart Methods:', () => {
  afterEach(() => {
    cart.cart = [];
    cart.total = 0;
  });

  test('expect the cart length to increase by 1 on each call of addToCart.', () => {
    cart.addToCart(cars[0]);
    cart.addToCart(cars[1]);

    expect(cart.cart.length).toEqual(2);
    expect(cart.cart[0]).toEqual(cars[0]);
    expect(cart.cart[1]).toEqual(cars[1]);
  });

  test("expect the total property to increase by the car object's price on each call of addToCart.", () => {
    cart.addToCart(cars[0]);
    cart.addToCart(cars[2]);
    cart.addToCart(cars[8]);

    expect(cart.total).toEqual(cars[0].price + cars[2].price + cars[8].price);
  });

  test('expect the cart length to decrease by 1 on each call of removeFromCart.', () => {
    cart.addToCart(cars[0]);
    cart.addToCart(cars[2]);
    cart.addToCart(cars[8]);
    cart.addToCart(cars[1]);

    cart.removeFromCart(2, cars[8].price);

    expect(cart.cart.length).toEqual(3);
    expect(cart.cart[0]).toEqual(cars[0]);
    expect(cart.cart[1]).toEqual(cars[2]);
    expect(cart.cart[2]).toEqual(cars[1]);

    cart.removeFromCart(0, cars[0].price);

    expect(cart.cart.length).toEqual(2);
    expect(cart.cart[0]).toEqual(cars[2]);
    expect(cart.cart[1]).toEqual(cars[1]);
  });

  test('removeFromCart() should decrease the total property.', () => {
    cart.addToCart(cars[0]);
    cart.addToCart(cars[2]);
    cart.addToCart(cars[8]);
    cart.addToCart(cars[1]);

    cart.removeFromCart(3, cars[8].price);

    expect(cart.total).toEqual(cars[0].price + cars[2].price + cars[1].price);
  });

  test("expect the total property to decrease by the car object's price on each call of checkout.", () => {
    cart.addToCart(cars[0]);
    cart.addToCart(cars[2]);
    cart.addToCart(cars[8]);
    cart.addToCart(cars[1]);

    cart.checkout();

    expect(cart.cart.length).toEqual(0);
    expect(cart.total).toEqual(0);
  });

});