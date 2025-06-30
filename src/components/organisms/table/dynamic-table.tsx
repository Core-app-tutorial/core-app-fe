"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SortButton } from "@/components/atoms/table/sort-button";
import { SortConfig, TableColumn } from "@/constants/types/table";

interface DataTableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  currentSort: SortConfig | null;
  onSort: (sort: SortConfig | null) => void;
  columnVisibility?: Record<string, boolean>;
}

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const loadingRowVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const skeletonVariants = {
  loading: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  currentSort,
  onSort,
  columnVisibility = {},
}: DataTableProps<T>) {
  const visibleColumns = columns.filter(
    (column) => columnVisibility[String(column.key)] !== false
  );

  if (loading) {
    return (
      <motion.div
        className="rounded-md border border-border bg-card overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={tableVariants}
      >
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-border">
                {visibleColumns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    style={{ width: column.width, minWidth: column.width }}
                    className="text-muted-foreground whitespace-nowrap"
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: data.length }).map((_, index) => (
                <motion.tr
                  key={index}
                  className="border-border"
                  variants={loadingRowVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {visibleColumns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      style={{ width: column.width, minWidth: column.width }}
                    >
                      <motion.div
                        className="h-6 bg-muted rounded"
                        variants={skeletonVariants}
                        animate="loading"
                      />
                    </TableCell>
                  ))}
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="rounded-md border border-border bg-card overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={tableVariants}
    >
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-border">
              <AnimatePresence initial={false}>
                {visibleColumns.map((column) => (
                  <motion.th
                    key={String(column.key)}
                    className="text-muted-foreground text-left font-medium px-4 py-3 whitespace-nowrap"
                    style={{ width: column.width, minWidth: column.width }}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{
                      opacity: 1,
                      width: column.width || "auto",
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    exit={{
                      opacity: 0,
                      width: 0,
                      transition: { duration: 0.2, ease: "easeIn" },
                    }}
                    layout
                  >
                    {column.sortable ? (
                      <SortButton
                        column={String(column.key)}
                        label={column.label}
                        currentSort={currentSort}
                        onSort={onSort}
                      />
                    ) : (
                      column.label
                    )}
                  </motion.th>
                ))}
              </AnimatePresence>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {data.length === 0 ? (
                <motion.tr
                  key="empty"
                  className="border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell
                    colSpan={visibleColumns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <div className="text-muted-foreground my-10">
                        <div className="text-4xl mb-2">📭</div>
                        <div className="font-medium">No data found</div>
                        <div className="text-sm">
                          Try adjusting your search or filters
                        </div>
                      </div>
                    </motion.div>
                  </TableCell>
                </motion.tr>
              ) : (
                data.map((row, index) => (
                  <motion.tr
                    key={index}
                    className="border-border hover:bg-muted/50 transition-colors duration-200"
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <AnimatePresence initial={false}>
                      {visibleColumns.map((column) => (
                        <motion.td
                          key={String(column.key)}
                          className="px-4 py-3 text-card-foreground"
                          style={{
                            width: column.width,
                            minWidth: column.width,
                          }}
                          initial={{ opacity: 0, width: 0 }}
                          animate={{
                            opacity: 1,
                            width: column.width || "auto",
                            transition: { duration: 0.3, ease: "easeOut" },
                          }}
                          exit={{
                            opacity: 0,
                            width: 0,
                            transition: { duration: 0.2, ease: "easeIn" },
                          }}
                          layout
                        >
                          <div className="truncate">
                            {column.render
                              ? column.render(row[column.key], row)
                              : String(row[column.key] || "")}
                          </div>
                        </motion.td>
                      ))}
                    </AnimatePresence>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
