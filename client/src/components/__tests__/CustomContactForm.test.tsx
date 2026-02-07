import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CustomContactForm from "../CustomContactForm";

// Mock fetch
global.fetch = vi.fn();

describe("CustomContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock IP geolocation API to return +1 by default
    (global.fetch as any).mockImplementation((url: string) => {
      if (url.includes('ipapi.co')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ country_calling_code: '+1' }),
        });
      }
      // For HubSpot API, return success by default (can be overridden in individual tests)
      return Promise.resolve({
        ok: true,
        json: async () => ({}),
      });
    });
  });

  it("renders the form when isOpen is true", () => {
    render(<CustomContactForm isOpen={true} onClose={() => {}} />);
    
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("john@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("1234567890")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your message here...")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<CustomContactForm isOpen={false} onClose={() => {}} />);
    
    expect(screen.queryByText("Get in Touch")).not.toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    const onClose = vi.fn();
    render(<CustomContactForm isOpen={true} onClose={onClose} />);
    
    const closeButton = screen.getByLabelText("Close modal");
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalled();
  });

  it("updates form fields when user types", async () => {
    const user = userEvent.setup();
    render(<CustomContactForm isOpen={true} onClose={() => {}} />);
    
    const nameInput = screen.getByPlaceholderText("John Doe") as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText("john@example.com") as HTMLInputElement;
    
    await user.type(nameInput, "Jane Smith");
    await user.type(emailInput, "jane@example.com");
    
    expect(nameInput.value).toBe("Jane Smith");
    expect(emailInput.value).toBe("jane@example.com");
  });

  it("renders searchable country code selector", async () => {
    render(<CustomContactForm isOpen={true} onClose={() => {}} />);
    
    // SearchableCountrySelect renders a button with the selected country code
    const countryButtons = screen.getAllByRole("button");
    const countryButton = countryButtons.find(btn => btn.textContent?.includes("+"));
    
    expect(countryButton).toBeInTheDocument();
    expect(countryButton?.textContent).toContain("+");
  });

  it("submits form with correct data to HubSpot API", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.mocked(fetch);
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);
    
    render(<CustomContactForm isOpen={true} onClose={() => {}} />);
    
    await user.type(screen.getByPlaceholderText("John Doe"), "Jane Smith");
    await user.type(screen.getByPlaceholderText("john@example.com"), "jane@example.com");
    // Country code is auto-detected, skip manual selection
    await user.type(screen.getByPlaceholderText("1234567890"), "9876543210");
    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0], "Job"); // First (and only) select is reason to contact
    await user.type(screen.getByPlaceholderText("Your message here..."), "Test message");
    
    const submitButton = screen.getByText("Send Message");
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("hsforms.com"),
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
    });
  });

  it("shows success message after successful submission", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.mocked(fetch);
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);
    
    render(<CustomContactForm isOpen={true} onClose={() => {}} />);
    
    await user.type(screen.getByPlaceholderText("John Doe"), "Jane Smith");
    await user.type(screen.getByPlaceholderText("john@example.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("1234567890"), "9876543210");
    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0], "Job"); // First (and only) select is reason to contact
    await user.type(screen.getByPlaceholderText("Your message here..."), "Test message");
    
    await user.click(screen.getByText("Send Message"));
    
    await waitFor(() => {
      expect(screen.getByText("Message Sent Successfully!")).toBeInTheDocument();
    });
  });

  it("shows error message on failed submission", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.mocked(fetch);
    
    // First call is IP geolocation (success), second call is HubSpot (failure)
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ country_calling_code: '+1' }),
      } as Response)
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);
    
    render(<CustomContactForm isOpen={true} onClose={() => {}} />);
    
    await user.type(screen.getByPlaceholderText("John Doe"), "Jane Smith");
    await user.type(screen.getByPlaceholderText("john@example.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("1234567890"), "9876543210");
    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0], "Job"); // First (and only) select is reason to contact
    await user.type(screen.getByPlaceholderText("Your message here..."), "Test message");
    
    await user.click(screen.getByText("Send Message"));
    
    await waitFor(() => {
      expect(screen.getByText("Failed to submit form")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("disables submit button while submitting", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.mocked(fetch);
    
    // First call is IP geolocation (success), second call is HubSpot (delayed success)
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ country_calling_code: '+1' }),
      } as Response)
      .mockImplementationOnce(
        () => new Promise((resolve) => setTimeout(() => resolve({
          ok: true,
          json: async () => ({}),
        } as Response), 100))
      );
    
    render(<CustomContactForm isOpen={true} onClose={() => {}} />);
    
    await user.type(screen.getByPlaceholderText("John Doe"), "Jane Smith");
    await user.type(screen.getByPlaceholderText("john@example.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("1234567890"), "9876543210");
    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0], "Job"); // First (and only) select is reason to contact
    await user.type(screen.getByPlaceholderText("Your message here..."), "Test message");
    
    const submitButton = screen.getByText("Send Message") as HTMLButtonElement;
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(submitButton.disabled).toBe(true);
      expect(screen.getByText("Sending...")).toBeInTheDocument();
    });
  });
});
