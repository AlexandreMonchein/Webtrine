import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AlertView } from "../alertview.component";
import type { AlertViewProps } from "../alertview.types";

// Mock getCustomer
vi.mock("../../../../customer.utils", () => ({
  getCustomer: () => "showcase",
}));

// Mock useLoadComponent
vi.mock("../../../utils/useLoadComponents.hook", () => ({
  useLoadComponent: (iconName: string | null) => {
    if (!iconName) return null;
    return ({ size }: { size: number }) => (
      <svg data-testid={`icon-${iconName}`} width={size} height={size}>
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  },
}));

describe("<AlertView />", () => {
  let props: AlertViewProps;

  beforeEach(() => {
    props = {
      logo: "test-logo",
      title: "Test Title",
      description: "Test Description",
      ctaText: "Test CTA",
      onClose: vi.fn(),
    };
  });

  it("should render the component", () => {
    render(<AlertView {...props} />);
    expect(screen.getByTestId("alertviewRoot")).toBeInTheDocument();
  });

  it("should render logo when provided", () => {
    render(<AlertView {...props} />);
    const logo = screen.getByAltText("test-logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      "/assets/showcase/icons/test-logo.webp",
    );
  });

  it("should not render logo when not provided", () => {
    render(<AlertView {...props} logo={undefined} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("should render title when provided", () => {
    render(<AlertView {...props} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should not render title when not provided", () => {
    render(<AlertView {...props} title={undefined} />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("should render description when provided", () => {
    render(<AlertView {...props} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("should not render description when not provided", () => {
    const { container } = render(
      <AlertView {...props} description={undefined} />,
    );
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });

  it("should render CTA button when text and onClose provided", () => {
    render(<AlertView {...props} />);
    const button = screen.getByText("Test CTA");
    expect(button).toBeInTheDocument();
  });

  it("should not render CTA button when text is missing", () => {
    render(<AlertView {...props} ctaText={undefined} />);
    expect(screen.queryByText("Test CTA")).not.toBeInTheDocument();
  });

  it("should not render CTA button when onClose is missing", () => {
    render(<AlertView {...props} onClose={undefined} />);
    expect(screen.queryByText("Test CTA")).not.toBeInTheDocument();
  });

  it("should have default variant by default", () => {
    render(<AlertView {...props} />);
    const element = screen.getByTestId("alertviewRoot");
    expect(element.className).not.toContain("alertviewRootInfo");
    expect(element.className).not.toContain("alertviewRootSuccess");
    expect(element.className).not.toContain("alertviewRootWarning");
    expect(element.className).not.toContain("alertviewRootError");
  });

  it("should render minimal alert with only required props", () => {
    render(<AlertView title="Minimal Title" ctaText="OK" onClose={vi.fn()} />);
    expect(screen.getByTestId("alertviewRoot")).toBeInTheDocument();
    expect(screen.getByText("Minimal Title")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("should call onClose when CTA button is clicked", () => {
    const onCloseMock = vi.fn();
    render(<AlertView {...props} onClose={onCloseMock} />);
    const button = screen.getByText("Test CTA");
    button.click();
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when overlay is clicked", () => {
    const onCloseMock = vi.fn();
    render(<AlertView {...props} onClose={onCloseMock} />);
    const overlay = screen.getByTestId("alertviewOverlay");
    overlay.click();
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when modal content is clicked", () => {
    const onCloseMock = vi.fn();
    render(<AlertView {...props} onClose={onCloseMock} />);
    const modal = screen.getByTestId("alertviewRoot");
    modal.click();
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it("should render icon when ctaIcon is provided", () => {
    render(<AlertView {...props} ctaIcon="chevronRight" />);
    const icon = screen.getByTestId("icon-chevronRight");
    expect(icon).toBeInTheDocument();
  });

  it("should not render icon when ctaIcon is not provided", () => {
    render(<AlertView {...props} ctaIcon={undefined} />);
    expect(screen.queryByTestId(/^icon-/)).not.toBeInTheDocument();
  });
});
