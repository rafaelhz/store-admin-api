const {
  initResources,
  fetch,
  closeResources,
} = require("../../../../utils/tests-utils");
const categoryService = require("../../services/category");

jest.mock("../../services/category");

const API_URL = "/api/categories";

const category = {
  id: "1",
  name: "category test",
};

describe("Category - Routes", () => {
  beforeAll(initResources);
  afterAll(closeResources);
  beforeEach(jest.resetAllMocks);

  it("Returns the categories", async () => {
    categoryService.getCategories.mockResolvedValue([category]);

    const res = await fetch(API_URL);

    expect(categoryService.getCategories).toHaveBeenCalledTimes(1);
    expect(res.status).toEqual(200);
    expect(await res.json()).toEqual([category]);
  });

  it("Returns the category", async () => {
    categoryService.getCategoryById.mockResolvedValue(category);

    const res = await fetch(`${API_URL}/${category.id}`);

    expect(categoryService.getCategoryById).toHaveBeenCalledWith(category.id);
    expect(res.status).toEqual(200);
    expect(await res.json()).toEqual(category);
  });

  it("Creates the category", async () => {
    categoryService.createCategory.mockResolvedValue(category);

    const res = await fetch(API_URL, {
      method: "POST",
      body: {
        name: category.name,
      },
    });

    expect(categoryService.createCategory).toHaveBeenCalledWith({
      name: category.name,
    });
    expect(res.status).toEqual(200);
    expect(await res.json()).toEqual(category);
  });

  it("Updates the category", async () => {
    categoryService.updateCategory.mockResolvedValue(category);

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
    expect(res.status).toEqual(200);
    expect(await res.json()).toEqual(category);
  });

  it("Deletes the category", async () => {
    categoryService.deleteCategory.mockResolvedValue(true);

    const res = await fetch(`${API_URL}/${category.id}`, {
      method: "DELETE",
    });

    expect(categoryService.deleteCategory).toHaveBeenCalledWith(category.id);
    expect(res.status).toEqual(200);
    expect(await res.json()).toEqual({ deleted: true });
  });
});
