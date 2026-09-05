import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MultiDataTable from "../multiDataTable.component";
import type { MultiDataTableProps } from "../multiDataTable.types";

const createProps = (
  overrides: Partial<MultiDataTableProps> = {},
): MultiDataTableProps => ({
  title: "Visite chien / Promenade",
  subTitle: "*Tarifs dégressifs de 15% à partir du 2ème animal",
  hash: "visite-chien",
  features: { centeredTitles: true },
  tables: [
    {
      columns: [
        { header: "1 chien", key: "type" },
        { header: "Tarif / heure", key: "price1" },
      ],
      data: [{ type: "Visite ponctuelle", price1: "25 €" }],
    },
    {
      columns: [
        { header: "2 chien", key: "type" },
        { header: "Tarif / heure", key: "price1" },
      ],
      data: [{ type: "Visite ponctuelle", price1: "43 €" }],
    },
  ],
  ...overrides,
});

describe("<MultiDataTable />", () => {
  it("should render", () => {
    render(<MultiDataTable {...createProps()} />);
    expect(screen.getByTestId("multiDataTableRoot")).toBeInTheDocument();
  });

  it("should render the shared title with the hash as id", () => {
    render(<MultiDataTable {...createProps()} />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Visite chien / Promenade",
    });
    expect(heading).toHaveAttribute("id", "visite-chien");
  });

  it("should render one table per entry in tables", () => {
    render(<MultiDataTable {...createProps()} />);
    expect(screen.getAllByRole("table")).toHaveLength(2);
    expect(screen.getByText("1 chien")).toBeInTheDocument();
    expect(screen.getByText("2 chien")).toBeInTheDocument();
  });

  it("should render without title or subTitle when not provided", () => {
    render(
      <MultiDataTable
        {...createProps({ title: undefined, subTitle: undefined })}
      />,
    );
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
    expect(screen.getAllByRole("table")).toHaveLength(2);
  });

  it("should render fallback row when a table has no data", () => {
    render(
      <MultiDataTable
        {...createProps({
          tables: [{ columns: [{ header: "1 chien", key: "type" }], data: [] }],
        })}
      />,
    );
    expect(screen.getByText("Aucune donnée disponible")).toBeInTheDocument();
  });
});
