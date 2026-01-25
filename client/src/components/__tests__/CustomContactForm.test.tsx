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

  it("changes country code when dropdown is selected", async () => {
    const user = userEvent.setup();
    render(<CustomContactForm isOpen={true} onClose={() => {}} />);
    
    const countrySelect = screen.getByDisplayValue("+1") as HTMLSelectElement;
    await user.selectOptions(countrySelect, "+44");
    
    expect(countrySelect.value).toBe("+44");
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
    await user.selectOptions(screen.getByDisplayValue("+1"), "+44");
    await user.type(screen.getByPlaceholderText("1234567890"), "9876543210");
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
    await user.type(screen.getByPlaceholderText("Your message here..."), "Test message");
    
    await user.click(screen.getByText("Send Message"));
    
    await waitFor(() => {
      expect(screen.getByText("Message Sent Successfully!")).toBeInTheDocument();
    });
  });

  it("shows error message on failed submission", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.mocked(fetch);
    
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);
    
    render(<CustomContactForm isOpen={true} onClose={() => {}} />);
    
    await user.type(screen.getByPlaceholderText("John Doe"), "Jane Smith");
    await user.type(screen.getByPlaceholderText("john@example.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("1234567890"), "9876543210");
    await user.type(screen.getByPlaceholderText("Your message here..."), "Test message");
    
    await user.click(screen.getByText("Send Message"));
    
    await waitFor(() => {
      expect(screen.getByText("Failed to submit form")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("disables submit button while submitting", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.mocked(fetch);
    
    mockFetch.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        json: async () => ({}),
      } as Response), 100))
    );
    
    render(<CustomContactForm isOpen={true} onClose={() => {}} />);
    
    await user.type(screen.getByPlaceholderText("John Doe"), "Jane Smith");
    await user.type(screen.getByPlaceholderText("john@example.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("1234567890"), "9876543210");
    await user.type(screen.getByPlaceholderText("Your message here..."), "Test message");
    
    const submitButton = screen.getByText("Send Message") as HTMLButtonElement;
    await user.click(submitButton);
    
    expect(submitButton.disabled).toBe(true);
    expect(screen.getByText("Sending...")).toBeInTheDocument();
  });
});
