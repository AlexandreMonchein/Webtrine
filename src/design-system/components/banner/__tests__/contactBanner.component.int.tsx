import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ContactBanner from "../contactBanner.component";
import styles from "../contactBanner.module.css";
import type { ContactBannerProps } from "../contactBanner.types";

describe("<ContactBanner />", () => {
  let props: ContactBannerProps;

  beforeEach(() => {
    props = {
      datas: {
        title: "LE STUDIO.",
        media: {
          type: "image",
          src: "/test-image.jpg",
          alt: "Test image",
        },
        infoTitle: "INFORMATIONS",
        content: [
          { text: "First line of information" },
          { text: "Second line of information" },
        ],
        "data-testid": "contact-banner-test",
      },
    };

    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  it("should render the component", () => {
    render(<ContactBanner {...props} />);
    expect(screen.getByTestId("contact-banner-test")).toBeInTheDocument();
  });

  it("should render the main title", () => {
    render(<ContactBanner {...props} />);
    expect(screen.getByText("LE STUDIO.")).toBeInTheDocument();
  });

  it("should render the info title", () => {
    render(<ContactBanner {...props} />);
    expect(screen.getByText("INFORMATIONS")).toBeInTheDocument();
  });

  it("should render all content items", () => {
    render(<ContactBanner {...props} />);
    expect(screen.getByText("First line of information")).toBeInTheDocument();
    expect(screen.getByText("Second line of information")).toBeInTheDocument();
  });

  it("should render image when media type is image", () => {
    render(<ContactBanner {...props} />);
    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe("IMG");
  });

  it("should render video when media type is video", () => {
    const videoProps = {
      datas: {
        ...props.datas,
        media: {
          type: "video" as const,
          src: "/test-video.mp4",
          extension: "mp4",
        },
      },
    };
    const { container } = render(<ContactBanner {...videoProps} />);
    const video = container.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(video?.tagName).toBe("VIDEO");
  });

  it("should render back to top button", () => {
    render(<ContactBanner {...props} />);
    const button = screen.getByRole("button", { name: /back to top/i });
    expect(button).toBeInTheDocument();
  });

  it("should scroll to top when button is clicked", async () => {
    const user = userEvent.setup();
    render(<ContactBanner {...props} />);

    const button = screen.getByRole("button", { name: /back to top/i });
    await user.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("should render multiple content items correctly", () => {
    const multipleContentProps = {
      datas: {
        ...props.datas,
        content: [
          { text: "Item 1" },
          { text: "Item 2" },
          { text: "Item 3" },
          { text: "Item 4" },
        ],
      },
    };
    render(<ContactBanner {...multipleContentProps} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
    expect(screen.getByText("Item 4")).toBeInTheDocument();
  });

  it("should use default alt text for image if not provided", () => {
    const propsWithoutAlt = {
      datas: {
        ...props.datas,
        media: {
          type: "image" as const,
          src: "/test-image.jpg",
        },
      },
    };
    render(<ContactBanner {...propsWithoutAlt} />);
    const image = screen.getByAltText("Contact banner image");
    expect(image).toBeInTheDocument();
  });

  it("should use default data-testid if not provided", () => {
    const propsWithoutTestId = {
      datas: {
        title: "Test",
        media: { type: "image" as const, src: "/test.jpg" },
        infoTitle: "Info",
        content: [{ text: "Test" }],
      },
    };
    render(<ContactBanner {...propsWithoutTestId} />);
    expect(screen.getByTestId("contact-banner")).toBeInTheDocument();
  });

  it("should apply withSpacer class when withSpacer is true", () => {
    const propsWithSpacer = {
      datas: {
        ...props.datas,
        content: [
          { text: "Address line", withSpacer: true },
          { text: "Opening hours" },
        ],
      },
    };
    render(<ContactBanner {...propsWithSpacer} />);

    // Find the paragraph containing "Address line"
    const addressParagraph = screen.getByText("Address line");
    expect(addressParagraph).toHaveClass(styles.infoTextWithSpacer);
  });

  it("should not apply withSpacer class when withSpacer is false or undefined", () => {
    render(<ContactBanner {...props} />);

    // Find the first paragraph (no withSpacer property)
    const firstParagraph = screen.getByText("First line of information");
    expect(firstParagraph).not.toHaveClass("infoTextWithSpacer");
  });
});
