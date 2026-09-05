import type { DataTableContent, DataTableFeature } from "./dataTable.component";

export type MultiDataTableFeature = DataTableFeature;

export interface MultiDataTableProps {
  title?: string;
  subTitle?: string;
  hash?: string;
  features?: MultiDataTableFeature;
  tables: DataTableContent[];
}
