import * as chai from "chai";
import supertest from "supertest";


const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Test de carts", function () {
    it("Debe crear un carrito y devolver su ID", function (done) {
        requester.post("/api/carts")
            .send({}) 
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property("_id");
                done();
            });
    });

    it("Debe agregar un producto a un carrito", function (done) {
        requester.post("/api/carts")
            .send({})
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const cartId = res.body._id;

                requester.post(`/api/carts/${cartId}/product/123456`)
                    .send({ quantity: 2 })
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body).to.have.property("products").that.is.an("array");
                        done();
                    });
            });
    });
});

describe("Test de productos", function () {
    it("Debe agregar un producto y devolverlo con un ID", function (done) {
        requester.post("/api/products")
            .send({
                title: "Producto de prueba",
                price: 100,
                stock: 10
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property("_id");
                done();
            });
    });
});

describe("Test de users", function () {
    it("Debe registrar un usuario y devolverlo con un ID", function (done) {
        requester.post("/api/users")
            .send({
                first_name: "Juan",
                last_name: "Pérez",
                email: "juan@example.com",
                age: 30,
                password: "123456"
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property("_id");
                done();
            });
    });
});