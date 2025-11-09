import React, { useId } from "react";

import {
  Section,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableSubTitle,
  TableTitle,
} from "./dataTable.styled";

export interface TableColumn {
  header: string;
  key: string;
}

export interface TableData {
  [key: string]: string | number | React.ReactNode;
}

export interface DataTableContent {
  columns: TableColumn[];
  data: TableData[];
}

export interface DataTableFeature {
  centeredTitles?: boolean;
  centerContent?: boolean;
}

export interface DataTableProps {
  content: DataTableContent;
  title?: string;
  subTitle?: string;
  features?: DataTableFeature;
}

const DataTable: React.FC<DataTableProps> = (datas) => {
  const { title, subTitle, features, content } = datas;
  const { columns, data } = content;
  const { centeredTitles = false, centerContent = false } = features || {};

  // Generate unique IDs for accessibility
  const tableId = useId();
  const captionId = `${tableId}-caption`;

  return (
    <Section>
      {title && (
        <TableTitle tabIndex={0} id={captionId} centered={centeredTitles}>
          {title}
        </TableTitle>
      )}
      {subTitle && (
        <TableSubTitle tabIndex={0} centered={centeredTitles}>
          {subTitle}
        </TableSubTitle>
      )}
      <TableContainer>
        <Table
          id={tableId}
          role="table"
          aria-labelledby={title ? captionId : undefined}
          aria-label={!title ? "Data table" : undefined}
        >
          {title && <caption className="sr-only">{title}</caption>}
          <TableHeader role="rowgroup">
            <TableRow role="row">
              {columns.map((column, index) => (
                <TableHeaderCell
                  key={column.key}
                  role="columnheader"
                  scope="col"
                  tabIndex={0}
                  isFirst={index === 0}
                  isLast={index === columns.length - 1}
                  centered={centerContent}
                >
                  {column.header}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody role="rowgroup">
            {data.length === 0 ? (
              <TableRow role="row">
                <TableCell
                  role="cell"
                  colSpan={columns.length}
                  style={{ textAlign: "center", fontStyle: "italic" }}
                  tabIndex={0}
                >
                  Aucune donnée disponible
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex} role="row">
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={`${rowIndex}-${column.key}`}
                      role="cell"
                      tabIndex={0}
                      isFirst={colIndex === 0}
                      isLast={colIndex === columns.length - 1}
                      centered={centerContent}
                    >
                      {row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default DataTable;
