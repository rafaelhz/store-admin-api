/* eslint-disable sonarjs/no-duplicate-string */
const {
  initResources,
  fetch,
  closeResources,
} = require("../../../../utils/tests");
const categoryService = require("../../services/category");
const authService = require("../../../authentication/services/auth");

jest.mock("../../services/category");
jest.mock("../../../authentication/services/auth");

const API_URL = "/api/categories";

const category = {
  id: "1",
  name: "category test",
};

const customer = {
  role: "ROLE_CUSTOMER",
};

const admin = {
  role: "ROLE_ADMIN",
};

describe("Category - Routes", () => {
  beforeAll(initResources);
  afterAll(closeResources);
  beforeEach(jest.resetAllMocks);

  describe("/api/categories - GET", () => {
    it("Returns categories", async () => {
      categoryService.getCategories.mockResolvedValue([category]);
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(API_URL);

      expect(categoryService.getCategories).toHaveBeenCalledTimes(1);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual([category]);
    });

    it("Returns unauthorized status when token is invalid", async () => {
      authService.decodeToken.mockResolvedValue(null);

      const res = await fetch(API_URL);

      expect(res.status).toBe(401);
    });
  });

  describe("/api/categories/:id - GET", () => {
    it("Returns the category", async () => {
      categoryService.getCategoryById.mockResolvedValue(category);
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(`${API_URL}/${category.id}`);

      expect(categoryService.getCategoryById).toHaveBeenCalledWith(category.id);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(category);
    });

    it("Returns unauthorized status when token is invalid", async () => {
      authService.decodeToken.mockResolvedValue(null);

      const res = await fetch(`${API_URL}/${category.id}`);

      expect(res.status).toBe(401);
    });
  });

  describe("/api/categories - POST", () => {
    it("Creates the category", async () => {
      categoryService.createCategory.mockResolvedValue(category);
      authService.decodeToken.mockResolvedValue({
        user: admin,
      });

      const res = await fetch(API_URL, {
        method: "POST",
        body: {
          name: category.name,
        },
      });

      expect(categoryService.createCategory).toHaveBeenCalledWith({
        name: category.name,
      });
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(category);
    });

    it("Returns unauthorized status when token is invalid", async () => {
      authService.decodeToken.mockResolvedValue(null);

      const res = await fetch(API_URL, {
        method: "POST",
        body: {
          name: category.name,
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
          name: category.name,
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

  describe("/api/categories - PUT", () => {
    it("Updates the category", async () => {
      categoryService.updateCategory.mockResolvedValue(category);
      authService.decodeToken.mockResolvedValue({
        user: admin,
      });

      const res = await fetch(`${API_URL}/${category.id}`, {
        method: "PUT",
        body: {
          name: category.name,
        },
      });

      expect(categoryService.updateCategory).toHaveBeenCalledWith({
        id: category.id,
        name: category.name,
      });
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(category);
    });

    it("Returns unauthorized status when token is invalid", async () => {
      authService.decodeToken.mockResolvedValue(null);

      const res = await fetch(`${API_URL}/${category.id}`, {
        method: "PUT",
        body: {
          name: category.name,
        },
      });

      expect(res.status).toBe(401);
    });

    it("Returns forbidden status when user is not admin", async () => {
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(`${API_URL}/${category.id}`, {
        method: "PUT",
        body: {
          name: category.name,
        },
      });

      expect(res.status).toBe(403);
    });

    it("Returns bad request status when data is invalid", async () => {
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(`${API_URL}/${category.id}`, {
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

  describe("/api/categories - DELETE", () => {
    it("Deletes the category", async () => {
      categoryService.deleteCategory.mockResolvedValue(true);
      authService.decodeToken.mockResolvedValue({
        user: admin,
      });

      const res = await fetch(`${API_URL}/${category.id}`, {
        method: "DELETE",
      });

      expect(categoryService.deleteCategory).toHaveBeenCalledWith(category.id);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ deleted: true });
    });

    it("Returns unauthorized status when token is invalid", async () => {
      authService.decodeToken.mockResolvedValue(null);

      const res = await fetch(`${API_URL}/${category.id}`, {
        method: "DELETE",
      });

      expect(res.status).toBe(401);
    });

    it("Returns forbidden status when user is not admin", async () => {
      authService.decodeToken.mockResolvedValue({
        user: customer,
      });

      const res = await fetch(`${API_URL}/${category.id}`, {
        method: "DELETE",
      });

      expect(res.status).toBe(403);
    });
  });
});
