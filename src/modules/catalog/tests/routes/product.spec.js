/* eslint-disable sonarjs/no-duplicate-string */
const {
  initResources,
  fetch,
  closeResources,
} = require("../../../../utils/tests");
const productService = require("../../services/product");
const authService = require("../../../authentication/services/auth");

jest.mock("../../services/product");
jest.mock("../../../authentication/services/auth");

const API_URL = "/api/products";

const productId = "1";

const product = {
  name: "test",
  description: "description",
  imageUrl: "http://images.com/test.jpg",
  categoryId: "1",
  price: 4200,
};

const customer = {
  role: "ROLE_CUSTOMER",
};

const admin = {
  role: "ROLE_ADMIN",
};

describe("Product - Routes", () => {
  beforeAll(initResources);
  afterAll(closeResources);
  beforeEach(jest.resetAllMocks);

  describe("/api/products - GET", () => {
    it("Returns products", async () => {
      productService.getProducts.mockResolvedValue([product]);
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(API_URL);

      expect(productService.getProducts).toHaveBeenCalledTimes(1);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual([product]);
    });

    it("Returns unauthorized status when token is invalid", async () => {
      authService.decodeToken.mockResolvedValue(null);

      const res = await fetch(API_URL);

      expect(res.status).toBe(401);
    });
  });

  describe("/api/products/:id - GET", () => {
    it("Returns the product", async () => {
      productService.getProductById.mockResolvedValue(product);
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(`${API_URL}/${productId}`);

      expect(productService.getProductById).toHaveBeenCalledWith(productId);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(product);
    });

    it("Returns unauthorized status when token is invalid", async () => {
      authService.decodeToken.mockResolvedValue(null);

      const res = await fetch(`${API_URL}/${productId}`);

      expect(res.status).toBe(401);
    });
  });

  describe("/api/products - POST", () => {
    it("Creates the product", async () => {
      productService.createProduct.mockResolvedValue(product);
      authService.decodeToken.mockResolvedValue({
        user: admin,
      });

      const res = await fetch(API_URL, {
        method: "POST",
        body: {
          ...product,
        },
      });

      expect(productService.createProduct).toHaveBeenCalledWith({
        ...product,
      });
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(product);
    });

    it("Returns unauthorized status when token is invalid", async () => {
      authService.decodeToken.mockResolvedValue(null);

      const res = await fetch(API_URL, {
        method: "POST",
        body: {
          ...product,
        },
      });

      expect(res.status).toBe(401);
    });

    it("Returns forbidden status when user is not admin", async () => {
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(API_URL, {
        method: "POST",
        body: {
          ...product,
        },
      });

      expect(res.status).toBe(403);
    });

    it("Returns bad request status when data is invalid", async () => {
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(API_URL, {
        method: "POST",
        body: {
          name: "",
        },
      });

      expect(res.status).toBe(400);
      expect(await res.json()).toEqual({
        error: '"name" is not allowed to be empty',
      });
    });
  });

  describe("/api/products - PUT", () => {
    it("Updates the product", async () => {
      productService.updateProduct.mockResolvedValue(product);
      authService.decodeToken.mockResolvedValue({
        user: admin,
      });

      const res = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        body: {
          ...product,
        },
      });

      expect(productService.updateProduct).toHaveBeenCalledWith({
        id: productId,
        ...product,
      });
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(product);
    });

    it("Returns unauthorized status when token is invalid", async () => {
      authService.decodeToken.mockResolvedValue(null);

      const res = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        body: {
          ...product,
        },
      });

      expect(res.status).toBe(401);
    });

    it("Returns forbidden status when user is not admin", async () => {
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        body: {
          ...product,
        },
      });

      expect(res.status).toBe(403);
    });

    it("Returns bad request status when data is invalid", async () => {
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        body: {
          name: "",
        },
      });

      expect(res.status).toBe(400);
      expect(await res.json()).toEqual({
        error: '"name" is not allowed to be empty',
      });
    });
  });

  describe("/api/products - DELETE", () => {
    it("Deletes the product", async () => {
      productService.deleteProduct.mockResolvedValue(true);
      authService.decodeToken.mockResolvedValue({
        user: admin,
      });

      const res = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
      });

      expect(productService.deleteProduct).toHaveBeenCalledWith(productId);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ deleted: true });
    });

    it("Returns unauthorized status when token is invalid", async () => {
      authService.decodeToken.mockResolvedValue(null);

      const res = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
      });

      expect(res.status).toBe(401);
    });

    it("Returns forbidden status when user is not admin", async () => {
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
      });

      expect(res.status).toBe(403);
    });
  });
});
