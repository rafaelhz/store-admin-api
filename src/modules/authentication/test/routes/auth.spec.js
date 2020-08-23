const {
  initResources,
  fetch,
  closeResources,
} = require("../../../../utils/tests");
const authService = require("../../services/auth");

jest.mock("../../../authentication/services/auth");

describe("Authentication - Routes", () => {
  beforeAll(initResources);
  afterAll(closeResources);
  beforeEach(jest.resetAllMocks);

  describe("/api/auth/login - POST", () => {
    it("Returns access token", async () => {
      authService.login.mockResolvedValue({
        accessToken: "token",
      });

      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: {
          email: "user@gmail.com",
          password: "123456",
        },
      });

      expect(authService.login).toHaveBeenCalledWith(
        "user@gmail.com",
        "123456"
      );
      expect(res.status).toEqual(200);
      expect(await res.json()).toEqual({
        accessToken: "token",
      });
    });
  });
});
