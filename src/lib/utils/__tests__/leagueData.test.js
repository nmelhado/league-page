import { describe, it, expect, vi, beforeEach } from "vitest";
import { getLeagueData } from "../helperFunctions/leagueData";

// Mock the stores and dependencies
vi.mock("svelte/store", () => ({
  get: vi.fn(),
  update: vi.fn(),
}));

vi.mock("$lib/stores", () => ({
  leagueData: {
    update: vi.fn(),
  },
}));

vi.mock("$lib/utils/leagueInfo", () => ({
  leagueID: "test-league-id",
}));

vi.mock("$lib/utils/errorHandler", () => ({
  handleApiError: vi.fn(),
  handleFetchError: vi.fn(),
  safeJsonParse: vi.fn(),
}));

describe("leagueData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return cached data when available", async () => {
    const { get } = await import("svelte/store");
    const mockData = { league_id: "test-league-id", name: "Test League" };
    get.mockReturnValue({ "test-league-id": mockData });

    const result = await getLeagueData("test-league-id");
    expect(result).toEqual(mockData);
  });

  it("should handle fetch errors gracefully", async () => {
    const { get } = await import("svelte/store");
    const { handleApiError } = await import("$lib/utils/errorHandler");

    get.mockReturnValue({});
    handleApiError.mockReturnValue({ error: true, message: "API Error" });

    const result = await getLeagueData("test-league-id");
    expect(handleApiError).toHaveBeenCalled();
    expect(result).toHaveProperty("error", true);
  });
});
