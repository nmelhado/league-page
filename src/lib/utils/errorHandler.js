/**
 * Centralized error handling utility
 * Replaces console.error with proper error handling
 */

/**
 * Handle API errors with proper logging and fallback
 * @param {Error} error - The error object
 * @param {string} context - Context where the error occurred
 * @param {Object} fallbackData - Fallback data to return
 * @returns {Object} Error response or fallback data
 */
export function handleApiError(
  error,
  context = "Unknown",
  fallbackData = null,
) {
  // In production, you might want to send errors to a logging service
  // For now, we'll use a more structured approach than console.error

  const errorInfo = {
    message: error.message || "Unknown error",
    context,
    timestamp: new Date().toISOString(),
    stack: error.stack,
  };

  // In development, still log to console but in a structured way
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context}] API Error:`, errorInfo);
  }

  // Return fallback data or error response
  return (
    fallbackData || {
      error: true,
      message: "An error occurred while fetching data",
      context,
    }
  );
}

/**
 * Handle fetch errors with retry logic
 * @param {string} url - The URL that failed
 * @param {Error} error - The error object
 * @param {number} retryCount - Current retry attempt
 * @returns {Promise} Retry promise or error
 */
export async function handleFetchError(url, error, retryCount = 0) {
  const maxRetries = 3;
  const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff

  if (retryCount < maxRetries) {
    // Wait before retrying
    await new Promise((resolve) => setTimeout(resolve, retryDelay));

    try {
      return await fetch(url, { compress: true });
    } catch (retryError) {
      return handleFetchError(url, retryError, retryCount + 1);
    }
  }

  // Max retries reached, return error
  return handleApiError(
    error,
    `Fetch failed for ${url} after ${maxRetries} retries`,
  );
}

/**
 * Safe JSON parsing with error handling
 * @param {Response} response - Fetch response object
 * @param {string} context - Context for error handling
 * @returns {Promise<Object>} Parsed JSON or error object
 */
export async function safeJsonParse(response, context = "JSON parsing") {
  try {
    return await response.json();
  } catch (error) {
    return handleApiError(error, context, { error: true, data: null });
  }
}

/**
 * Safe text parsing with error handling
 * @param {Response} response - Fetch response object
 * @param {string} context - Context for error handling
 * @returns {Promise<string>} Parsed text or empty string on error
 */
export async function safeTextParse(response, context = "Text parsing") {
  try {
    return await response.text();
  } catch (error) {
    // For text parsing, return empty string on error rather than error object
    if (process.env.NODE_ENV === "development") {
      console.error(`[${context}] Text parsing error:`, error);
    }
    return "";
  }
}
