import { Router } from "express";
import { faker } from "@faker-js/faker";

const router = Router();


const generateProducts = (quantity) => {
  const products = [];
  for (let i = 0; i < quantity; i++) {
    products.push({
      id: faker.string.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      image: faker.image.url(), 
      category: faker.commerce.department(),
      quantity: faker.number.int({ min: 1, max: 100 }), 
      status: faker.datatype.boolean(), 
    });
  }
  return products;
};


const generateUsers = (quantity) => {
  const users = [];
  for (let i = 0; i < quantity; i++) {
    users.push({
      id: faker.string.uuid(),
      first_name: faker.person.firstName(), 
      last_name: faker.person.lastName(), 
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 100 }), 
      password: faker.internet.password(),
    });
  }
  return users;
};


router.post("/generateData", (req, res) => {
  const { users = 50, products = 50 } = req.body;

  if (isNaN(users) || isNaN(products)) {
    return res.status(400).json({ message: "Los valores deben ser números" });
  }

  const generatedUsers = generateUsers(Number(users));
  const generatedProducts = generateProducts(Number(products));

  res.status(200).json({
    users: generatedUsers,
    products: generatedProducts,
  });
});


router.get("/users", (req, res) => {
  const generatedUsers = generateUsers(50); 
  res.status(200).json(generatedUsers);
});


router.get("/products", (req, res) => {
  const generatedProducts = generateProducts(50); 
  res.status(200).json(generatedProducts);
});

export default router;