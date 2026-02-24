import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Banner from "../banner.component";
import { BannerDatas } from "../banner.types";

// Mock customer utils
vi.mock("../../../customer.utils", () => ({
  getCustomer: () => "showcase",
}));

describe("<Banner />", () => {
  const defaultBannerData: BannerDatas = {
    features: {
      multi: false,
      medium: false,
      mask: true,
    },
    title: "Test Banner Title",
    subTitle: "Test Subtitle",
    images: [{ name: "test-image" }],
    textPosition: "bottom-left",
  };

  describe("Component rendering", () => {
    it("should render with default props", () => {
      render(<Banner {...defaultBannerData} />);

      expect(screen.getByTestId("bannerRoot")).toBeInTheDocument();
      expect(screen.getByText("Test Banner Title")).toBeInTheDocument();
      expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    });

    it("should render section element", () => {
      render(<Banner {...defaultBannerData} />);

      const section = screen.getByTestId("bannerRoot");
      expect(section.tagName).toBe("SECTION");
    });

    it("should render image with correct src", () => {
      render(<Banner {...defaultBannerData} />);

      const image = screen.getByAltText("Background test-image");
      expect(image).toHaveAttribute("src", "/assets/showcase/test-image.webp");
    });

    it("should render without title when not provided", () => {
      const dataWithoutTitle = { ...defaultBannerData, title: undefined };
      render(<Banner {...dataWithoutTitle} />);

      expect(
        screen.queryByRole("heading", { level: 1 }),
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("bannerRoot")).toBeInTheDocument();
    });

    it("should render second subtitle when provided", () => {
      const dataWithSecondSubtitle = {
        ...defaultBannerData,
        subTitle2: "Second Subtitle",
      };
      render(<Banner {...dataWithSecondSubtitle} />);

      const subtitles = screen.getAllByRole("heading", { level: 2 });
      expect(subtitles).toHaveLength(2);
      expect(screen.getByText("Second Subtitle")).toBeInTheDocument();
    });
  });

  describe("Text positioning", () => {
    const positions = [
      "top-left",
      "center-left",
      "bottom-left",
      "center-top",
      "center",
      "center-bottom",
      "top-right",
      "center-right",
      "bottom-right",
    ] as const;

    positions.forEach((position) => {
      it(`should apply ${position} position class`, () => {
        const data = { ...defaultBannerData, textPosition: position };
        const { container } = render(<Banner {...data} />);

        // Convert kebab-case to camelCase for CSS class lookup
        const camelCasePosition = position.replace(/-([a-z])/g, (g) =>
          g[1].toUpperCase(),
        );
        const textContainer = container.querySelector(
          `[class*="${camelCasePosition}"]`,
        );
        expect(textContainer).toBeInTheDocument();
      });
    });
  });

  describe("Features", () => {
    it("should apply medium height class", () => {
      const mediumData = {
        ...defaultBannerData,
        features: { ...defaultBannerData.features, medium: true },
      };
      render(<Banner {...mediumData} />);

      const section = screen.getByTestId("bannerRoot");
      expect(section.className).toMatch(/medium/);
    });

    it("should apply mask overlay when mask is true", () => {
      const { container } = render(<Banner {...defaultBannerData} />);

      const backgroundContainer = container.querySelector(
        '[class*="backgroundContainer"]',
      );
      expect(backgroundContainer?.className).toMatch(/mask/);
    });

    it("should not apply mask when mask is false", () => {
      const noMaskData = {
        ...defaultBannerData,
        features: { ...defaultBannerData.features, mask: false },
      };
      const { container } = render(<Banner {...noMaskData} />);

      const backgroundContainer = container.querySelector(
        '[class*="backgroundContainer"]',
      );
      expect(backgroundContainer?.className).not.toMatch(/mask/);
    });
  });

  describe("Multi-image carousel", () => {
    const multiImageData: BannerDatas = {
      ...defaultBannerData,
      features: { ...defaultBannerData.features, multi: true },
      images: [{ name: "image-1" }, { name: "image-2" }, { name: "image-3" }],
    };

    it("should render all images", () => {
      render(<Banner {...multiImageData} />);

      expect(screen.getByAltText("Background image-1")).toBeInTheDocument();
      expect(screen.getByAltText("Background image-2")).toBeInTheDocument();
      expect(screen.getByAltText("Background image-3")).toBeInTheDocument();
    });

    it("should render selector buttons for multi-image carousel", () => {
      render(<Banner {...multiImageData} />);

      const selectors = screen.getAllByRole("button");
      expect(selectors).toHaveLength(3);
    });

    it("should change active image when selector is clicked", async () => {
      const user = userEvent.setup();
      const { container } = render(<Banner {...multiImageData} />);

      const selectors = screen.getAllByRole("button");

      // Click second selector
      await user.click(selectors[1]);

      await waitFor(() => {
        const images = container.querySelectorAll('img[class*="background"]');
        // Check if second image has active class
        expect(images[1].className).toMatch(/active/);
      });
    });

    it("should support keyboard navigation for selectors", async () => {
      const user = userEvent.setup();
      render(<Banner {...multiImageData} />);

      const selectors = screen.getAllByRole("button");

      // Focus and press Enter on second selector
      selectors[1].focus();
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(selectors[1].className).toMatch(/active/);
      });
    });

    it("should not render selectors when multi is false", () => {
      render(<Banner {...defaultBannerData} />);

      const selectors = screen.queryAllByRole("button");
      expect(selectors).toHaveLength(0);
    });
  });

  describe("Contact buttons", () => {
    const contactData: BannerDatas = {
      ...defaultBannerData,
      contact: [
        {
          type: "call",
          displayedText: "Call us",
          hiddenText: "+33 1 23 45 67 89",
        },
        {
          type: "redirect",
          displayedText: "Contact",
          hiddenText: "Redirecting...",
        },
      ],
    };

    it("should render contact buttons", () => {
      render(<Banner {...contactData} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThanOrEqual(2);
      expect(buttons[0]).toHaveTextContent("Call us");
      expect(buttons[1]).toHaveTextContent("Contact");
    });

    it("should render overlay when contact is provided", () => {
      const { container } = render(<Banner {...contactData} />);

      const overlay = container.querySelector('[class*="overlay"]');
      expect(overlay).toBeInTheDocument();
    });

    it("should render contact container", () => {
      const { container } = render(<Banner {...contactData} />);

      const contactContainer = container.querySelector(
        '[class*="contactContainer"]',
      );
      expect(contactContainer).toBeInTheDocument();
    });
  });

  describe("Copyright links", () => {
    const copyrightData: BannerDatas = {
      ...defaultBannerData,
      images: [
        {
          name: "test-image",
          copyright: {
            url: "https://example.com/copyright",
            title: "Image Credit",
          },
        },
      ],
    };

    it("should render copyright link", () => {
      render(<Banner {...copyrightData} />);

      const link = screen.getByRole("link", { name: "Image Credit" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com/copyright");
    });

    it("should not render copyright link when not provided", () => {
      render(<Banner {...defaultBannerData} />);

      const links = screen.queryAllByRole("link");
      expect(links).toHaveLength(0);
    });
  });

  describe("TypeScript types", () => {
    it("should accept all valid TextPosition values", () => {
      const positions: BannerDatas["textPosition"][] = [
        "top-left",
        "center-left",
        "bottom-left",
        "center-top",
        "center",
        "center-bottom",
        "top-right",
        "center-right",
        "bottom-right",
      ];

      positions.forEach((position) => {
        const data = { ...defaultBannerData, textPosition: position };
        const { unmount } = render(<Banner {...data} />);
        expect(screen.getByTestId("bannerRoot")).toBeInTheDocument();
        unmount();
      });
    });
  });
});
