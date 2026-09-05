import classNames from "classnames";

import type { DataTableContent } from "./dataTable.component";
import styles from "./multiDataTable.module.css";
import type { MultiDataTableProps } from "./multiDataTable.types";

interface MultiDataTableItemProps {
  content: DataTableContent;
  centerContent: boolean;
  title?: string;
}

const MultiDataTableItem = ({
  content,
  centerContent,
  title,
}: MultiDataTableItemProps) => {
  const { columns, data } = content;

  return (
    <div className={styles.tableContainer}>
      <table
        className={styles.table}
        aria-label={
          title ? `${title} — ${columns[0]?.header}` : columns[0]?.header
        }
      >
        <thead className={styles.tableHeader}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                scope="col"
                className={classNames(styles.tableHeaderCell, {
                  [styles.tableHeaderCellFirst]: index === 0,
                  [styles.tableHeaderCellLast]: index === columns.length - 1,
                  [styles.tableHeaderCellCentered]: centerContent,
                })}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.tableCellEmpty}>
                Aucune donnée disponible
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const rowKey = Object.values(row).join("-") || `row-${rowIndex}`;
              return (
                <tr key={rowKey} className={styles.tableRow}>
                  {columns.map((column) => (
                    <td
                      key={`${rowKey}-${column.key}`}
                      className={classNames(styles.tableCell, {
                        [styles.tableCellCentered]: centerContent,
                      })}
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export const MultiDataTable = ({
  title,
  subTitle,
  hash,
  features,
  tables,
}: MultiDataTableProps) => {
  const { centeredTitles = false, centerContent = false } = features || {};

  return (
    <section
      className={styles.multiDataTableRoot}
      data-testid="multiDataTableRoot"
    >
      {title && (
        <h2
          id={hash}
          className={classNames(styles.title, {
            [styles.titleCentered]: centeredTitles,
          })}
        >
          {title}
        </h2>
      )}
      {subTitle && (
        <p
          className={classNames(styles.subTitle, {
            [styles.subTitleCentered]: centeredTitles,
          })}
        >
          {subTitle}
        </p>
      )}
      {tables.map((table, index) => (
        <MultiDataTableItem
          key={`${table.columns.map((column) => column.key).join("-")}-${index}`}
          content={table}
          centerContent={centerContent}
          title={title}
        />
      ))}
    </section>
  );
};

export default MultiDataTable;
