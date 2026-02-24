import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ToggleButton } from "../classicButton.component";

describe("<ToggleButton />", () => {
  describe("Component rendering", () => {
    it("should render with default displayed text", () => {
      render(
        <ToggleButton
          type="call"
          displayedText="Show phone"
          hiddenText="+33 1 23 45 67 89"
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("Show phone");
      expect(screen.getByTestId("toggleButtonRoot")).toBeInTheDocument();
    });

    it("should render button element", () => {
      render(
        <ToggleButton
          type="call"
          displayedText="Click me"
          hiddenText="Hidden"
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "button");
    });
  });

  describe("Call type behavior", () => {
    it("should toggle between displayedText and hiddenText on click", async () => {
      const user = userEvent.setup();

      render(
        <ToggleButton
          type="call"
          displayedText="Show phone"
          hiddenText="+33 1 23 45 67 89"
        />,
      );

      const button = screen.getByRole("button");

      // Initially shows displayedText
      expect(button).toHaveTextContent("Show phone");

      // Click to show hiddenText
      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveTextContent("+33 1 23 45 67 89");
      });

      // Click again to show displayedText
      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveTextContent("Show phone");
      });
    });

    it("should toggle multiple times", async () => {
      const user = userEvent.setup();

      render(
        <ToggleButton
          type="call"
          displayedText="Display"
          hiddenText="Hidden"
        />,
      );

      const button = screen.getByRole("button");

      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveTextContent("Hidden");
      });

      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveTextContent("Display");
      });

      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveTextContent("Hidden");
      });
    });
  });

  describe("Redirect type behavior", () => {
    it("should redirect to /contact on click", async () => {
      const user = userEvent.setup();
      const originalLocation = window.location;

      // Mock window.location
      delete (window as any).location;
      (window as any).location = { href: "" };

      render(
        <ToggleButton
          type="redirect"
          displayedText="Contact us"
          hiddenText="Redirecting..."
        />,
      );

      const button = screen.getByRole("button");

      await user.click(button);

      expect(window.location.href).toBe("/contact");

      // Restore original location
      (window as any).location = originalLocation;
    });

    it("should not toggle text for redirect type", async () => {
      const user = userEvent.setup();
      const originalLocation = window.location;

      // Mock window.location
      delete (window as any).location;
      (window as any).location = { href: "" };

      render(
        <ToggleButton
          type="redirect"
          displayedText="Contact us"
          hiddenText="Redirecting..."
        />,
      );

      const button = screen.getByRole("button");

      // Text should remain the same
      expect(button).toHaveTextContent("Contact us");

      await user.click(button);

      // Text should still be displayedText (redirect happens immediately)
      expect(button).toHaveTextContent("Contact us");

      // Restore original location
      (window as any).location = originalLocation;
    });
  });

  describe("Width calculation", () => {
    it("should render offscreen content for width calculation", () => {
      const { container } = render(
        <ToggleButton
          type="call"
          displayedText="Short"
          hiddenText="Very long hidden text"
        />,
      );

      // Offscreen container should exist
      const offscreenContainer = container.querySelector(
        '[class*="offscreenContentContainer"]',
      );
      expect(offscreenContainer).toBeInTheDocument();

      // Both texts should be in offscreen container
      const offscreenSpans = offscreenContainer?.querySelectorAll("span");
      expect(offscreenSpans).toHaveLength(2);
    });
  });

  describe("TypeScript types", () => {
    it("should accept valid ButtonType", () => {
      render(
        <ToggleButton type="call" displayedText="Test" hiddenText="Hidden" />,
      );

      render(
        <ToggleButton
          type="redirect"
          displayedText="Test"
          hiddenText="Hidden"
        />,
      );

      expect(screen.getAllByRole("button")).toHaveLength(2);
    });
  });
});
