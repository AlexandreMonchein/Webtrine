import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DescriptionB from "../descriptionB.component";

describe("<DescriptionB />", () => {
  const mockDescription = [
    { text: "Premier paragraphe de test" },
    { text: "Deuxième paragraphe de test" },
  ];

  it("should render with image media", () => {
    render(
      <DescriptionB
        datas={{
          media: {
            type: "image",
            src: "/test-image.webp",
            alt: "Test image",
          },
          title: "Test Title",
          description: mockDescription,
          "data-testid": "description-b",
        }}
      />,
    );

    expect(screen.getByTestId("description-b")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Premier paragraphe de test")).toBeInTheDocument();
    expect(screen.getByText("Deuxième paragraphe de test")).toBeInTheDocument();
    expect(screen.getByAltText("Test image")).toBeInTheDocument();
  });

  it("should render with video media", () => {
    render(
      <DescriptionB
        datas={{
          media: {
            type: "video",
            src: "/test-video.mp4",
            extension: "mp4",
            alt: "Test video",
          },
          title: "Video Test",
          description: mockDescription,
        }}
      />,
    );

    expect(screen.getByText("Video Test")).toBeInTheDocument();
    const video = screen.getByLabelText("Test video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("muted");
  });

  it("should render multiple paragraphs", () => {
    const longDescription = [
      { text: "Paragraph 1" },
      { text: "Paragraph 2" },
      { text: "Paragraph 3" },
      { text: "Paragraph 4" },
    ];

    render(
      <DescriptionB
        datas={{
          media: { type: "image", src: "/test.webp" },
          title: "Test",
          description: longDescription,
        }}
      />,
    );

    longDescription.forEach((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument();
    });
  });

  it("should use title as alt text when alt is not provided", () => {
    render(
      <DescriptionB
        datas={{
          media: { type: "image", src: "/test.webp" },
          title: "Default Alt Text",
          description: mockDescription,
        }}
      />,
    );

    expect(screen.getByAltText("Default Alt Text")).toBeInTheDocument();
  });
});
