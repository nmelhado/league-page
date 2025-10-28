import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  handleApiError,
  handleFetchError,
  safeJsonParse,
  safeTextParse,
} from "../errorHandler";

describe("errorHandler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("handleApiError", () => {
    it("should return error object with proper structure", () => {
      const error = new Error("Test error");
      const result = handleApiError(error, "test context");

      expect(result).toHaveProperty("error", true);
      expect(result).toHaveProperty(
        "message",
        "An error occurred while fetching data",
      );
      expect(result).toHaveProperty("context", "test context");
    });

    it("should return fallback data when provided", () => {
      const error = new Error("Test error");
      const fallback = { data: "fallback" };
      const result = handleApiError(error, "test context", fallback);

      expect(result).toEqual(fallback);
    });
  });

  describe("safeJsonParse", () => {
    it("should parse valid JSON response", async () => {
      const mockResponse = {
        json: vi.fn().mockResolvedValue({ test: "data" }),
      };

      const result = await safeJsonParse(mockResponse, "test context");
      expect(result).toEqual({ test: "data" });
    });

    it("should handle JSON parsing errors", async () => {
      const mockResponse = {
        json: vi.fn().mockRejectedValue(new Error("JSON parse error")),
      };

      const result = await safeJsonParse(mockResponse, "test context");
      expect(result).toHaveProperty("error", true);
      expect(result).toHaveProperty("data", null);
    });
  });

  describe("safeTextParse", () => {
    it("should parse valid text response", async () => {
      const mockResponse = {
        text: vi.fn().mockResolvedValue("test text"),
      };

      const result = await safeTextParse(mockResponse, "test context");
      expect(result).toBe("test text");
    });

    it("should handle text parsing errors", async () => {
      const mockResponse = {
        text: vi.fn().mockRejectedValue(new Error("Text parse error")),
      };

      const result = await safeTextParse(mockResponse, "test context");
      expect(result).toBe("");
    });
  });
});
