import type { Meta, StoryObj } from "@storybook/react";

import { MultiDataTable } from "./multiDataTable.component";
import type { MultiDataTableProps } from "./multiDataTable.types";

const defaultArgs: MultiDataTableProps = {
  title: "Visite chien / Promenade",
  subTitle: "*Tarifs dégressifs de 15% à partir du 2ème animal",
  hash: "visite-chien",
  features: { centeredTitles: true },
  tables: [
    {
      columns: [
        { header: "1 chien", key: "type" },
        { header: "Tarif / heure", key: "price1" },
        { header: "Tarif / demi heure", key: "price2" },
      ],
      data: [
        { type: "Visite ponctuelle", price1: "25 €", price2: "18 €" },
        {
          type: "Visite semaine lundi à samedi",
          price1: "150 €",
          price2: "108 €",
        },
      ],
    },
    {
      columns: [
        { header: "2 chiens", key: "type" },
        { header: "Tarif / heure", key: "price1" },
        { header: "Tarif / demi heure", key: "price2" },
      ],
      data: [
        { type: "Visite ponctuelle", price1: "43 €", price2: "31 €" },
        {
          type: "Visite semaine lundi à samedi",
          price1: "258 €",
          price2: "186 €",
        },
      ],
    },
    {
      columns: [
        { header: "3 chiens", key: "type" },
        { header: "Tarif / heure", key: "price1" },
        { header: "Tarif / demi heure", key: "price2" },
      ],
      data: [
        { type: "Visite ponctuelle", price1: "65 €", price2: "47 €" },
        {
          type: "Visite semaine lundi à samedi",
          price1: "390 €",
          price2: "282 €",
        },
      ],
    },
  ],
};

const meta: Meta<typeof MultiDataTable> = {
  title: "Design System/Components/DataTable/MultiDataTable",
  component: MultiDataTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiDataTable>;

export const Overview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Groupe de 3 tableaux avec titre partagé
        </h3>
        <MultiDataTable {...defaultArgs} />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Sans sous-titre</h3>
        <MultiDataTable {...defaultArgs} subTitle={undefined} />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Un seul tableau</h3>
        <MultiDataTable {...defaultArgs} tables={[defaultArgs.tables[0]]} />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Sans titre ni sous-titre
        </h3>
        <MultiDataTable
          {...defaultArgs}
          title={undefined}
          subTitle={undefined}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Tableau sans donnée
        </h3>
        <MultiDataTable
          {...defaultArgs}
          tables={[
            {
              columns: [{ header: "1 chien", key: "type" }],
              data: [],
            },
          ]}
        />
      </div>
    </div>
  ),
};
