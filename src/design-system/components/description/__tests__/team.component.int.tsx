import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Team from "../team.component";
import type { TeamProps } from "../team.types";

// Mock du module customer.utils
vi.mock("../../../../customer.utils", () => ({
  getCustomer: () => "test-customer",
}));

const createTeamProps = (overrides = {}): TeamProps => ({
  type: "team",
  preTitle: "Meet the team",
  title: "Our Amazing Team",
  description: "We are a group of passionate professionals.",
  members: [
    {
      name: "John Doe",
      position: "CEO",
      image: "member_1",
      imageAlt: "John Doe profile",
    },
    {
      name: "Jane Smith",
      position: "CTO",
      image: "member_2",
      imageAlt: "Jane Smith profile",
    },
  ],
  ...overrides,
});

describe("Team Component", () => {
  it("renders all elements correctly", () => {
    const props = createTeamProps();
    render(<Team {...props} />);

    expect(screen.getByText("Meet the team")).toBeInTheDocument();
    expect(screen.getByText("Our Amazing Team")).toBeInTheDocument();
    expect(
      screen.getByText("We are a group of passionate professionals."),
    ).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
    expect(screen.getByText("CTO")).toBeInTheDocument();
  });

  it("renders member images with correct src and alt", () => {
    const props = createTeamProps();
    render(<Team {...props} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("alt", "John Doe profile");
    expect(images[1]).toHaveAttribute("alt", "Jane Smith profile");
    expect(images[0]).toHaveAttribute(
      "src",
      expect.stringContaining("member_1.webp"),
    );
    expect(images[1]).toHaveAttribute(
      "src",
      expect.stringContaining("member_2.webp"),
    );
  });

  it("renders without preTitle when not provided", () => {
    const props = createTeamProps({ preTitle: undefined });
    render(<Team {...props} />);

    expect(screen.queryByText("Meet the team")).not.toBeInTheDocument();
    expect(screen.getByText("Our Amazing Team")).toBeInTheDocument();
  });

  it("renders without title when not provided", () => {
    const props = createTeamProps({ title: undefined });
    render(<Team {...props} />);

    expect(screen.queryByText("Our Amazing Team")).not.toBeInTheDocument();
    expect(screen.getByText("Meet the team")).toBeInTheDocument();
  });

  it("renders without description when not provided", () => {
    const props = createTeamProps({ description: undefined });
    render(<Team {...props} />);

    expect(
      screen.queryByText("We are a group of passionate professionals."),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Our Amazing Team")).toBeInTheDocument();
  });

  it("renders members without positions when position is optional", () => {
    const props = createTeamProps({
      members: [
        {
          name: "Alice Brown",
          image: "member_3",
          imageAlt: "Alice Brown profile",
        },
        {
          name: "Bob White",
          position: "Developer",
          image: "member_4",
          imageAlt: "Bob White profile",
        },
      ],
    });
    render(<Team {...props} />);

    expect(screen.getByText("Alice Brown")).toBeInTheDocument();
    expect(screen.queryByText("Alice Brown")).toBeInTheDocument();
    // Alice n'a pas de position
    expect(screen.getByText("Bob White")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });

  it("renders multiple team members correctly", () => {
    const props = createTeamProps({
      members: [
        {
          name: "Member 1",
          position: "Position 1",
          image: "img1",
          imageAlt: "Member 1",
        },
        {
          name: "Member 2",
          position: "Position 2",
          image: "img2",
          imageAlt: "Member 2",
        },
        {
          name: "Member 3",
          position: "Position 3",
          image: "img3",
          imageAlt: "Member 3",
        },
        {
          name: "Member 4",
          position: "Position 4",
          image: "img4",
          imageAlt: "Member 4",
        },
      ],
    });
    render(<Team {...props} />);

    expect(screen.getByText("Member 1")).toBeInTheDocument();
    expect(screen.getByText("Member 2")).toBeInTheDocument();
    expect(screen.getByText("Member 3")).toBeInTheDocument();
    expect(screen.getByText("Member 4")).toBeInTheDocument();
    expect(screen.getByText("Position 1")).toBeInTheDocument();
    expect(screen.getByText("Position 2")).toBeInTheDocument();
    expect(screen.getByText("Position 3")).toBeInTheDocument();
    expect(screen.getByText("Position 4")).toBeInTheDocument();
  });

  it("does not render header section when all header fields are missing", () => {
    const props = createTeamProps({
      preTitle: undefined,
      title: undefined,
      description: undefined,
    });
    const { container } = render(<Team {...props} />);

    // Header section ne doit pas être rendu
    const headerElement = container.querySelector('[class*="header"]');
    expect(headerElement).not.toBeInTheDocument();

    // Mais les membres doivent toujours être rendus
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("handles empty members array", () => {
    const props = createTeamProps({ members: [] });
    const { container } = render(<Team {...props} />);

    // La grille de membres ne devrait pas être rendue
    const gridElement = container.querySelector('[class*="membersGrid"]');
    expect(gridElement).not.toBeInTheDocument();

    // Mais le header devrait toujours être là
    expect(screen.getByText("Our Amazing Team")).toBeInTheDocument();
  });

  it("renders with single team member", () => {
    const props = createTeamProps({
      members: [
        {
          name: "Solo Member",
          position: "The Only One",
          image: "solo",
          imageAlt: "Solo Member profile",
        },
      ],
    });
    render(<Team {...props} />);

    expect(screen.getByText("Solo Member")).toBeInTheDocument();
    expect(screen.getByText("The Only One")).toBeInTheDocument();
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1);
  });

  it("member names are rendered as h3 headings", () => {
    const props = createTeamProps();
    render(<Team {...props} />);

    const johnHeading = screen.getByRole("heading", {
      level: 3,
      name: "John Doe",
    });
    const janeHeading = screen.getByRole("heading", {
      level: 3,
      name: "Jane Smith",
    });

    expect(johnHeading).toBeInTheDocument();
    expect(janeHeading).toBeInTheDocument();
  });

  it("title is rendered as h2 heading", () => {
    const props = createTeamProps();
    render(<Team {...props} />);

    const titleHeading = screen.getByRole("heading", {
      level: 2,
      name: "Our Amazing Team",
    });

    expect(titleHeading).toBeInTheDocument();
  });

  it("has teamRoot data-testid by default", () => {
    const props = createTeamProps();
    render(<Team {...props} />);

    expect(screen.getByTestId("teamRoot")).toBeInTheDocument();
  });
});
