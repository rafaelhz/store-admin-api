const authService = require("../../services/auth");
const userRepository = require("../../repositories/user");
const crypto = require("../../../../utils/crypto");

jest.mock("../../repositories/user");
jest.mock("../../../../utils/crypto");

const email = "user@gmail.com";
const password = "123456";

describe("Authentication Service - Login", () => {
  beforeEach(jest.resetAllMocks);
  it("Throws error when email is not found", async () => {
    userRepository.getUserByEmail.mockResolvedValue(null);

    await expect(authService.login(email, password)).rejects.toThrow(
      "Invalid username or password"
    );
  });

  it("Throws error when password is wrong", async () => {
    userRepository.getUserByEmail.mockResolvedValue({
      email,
      password,
    });

    crypto.bcryptCompare.mockResolvedValue(false);

    await expect(authService.login(email, password)).rejects.toThrow(
      "Invalid username or password"
    );
  });

  it("Returns access token when email and password are correct", async () => {
    userRepository.getUserByEmail.mockResolvedValue({
      email,
      password,
    });

    crypto.bcryptCompare.mockResolvedValue(true);

    const result = await authService.login(email, password);

    expect(result).toEqual({
      accessToken: expect.anything(),
    });
  });
});
