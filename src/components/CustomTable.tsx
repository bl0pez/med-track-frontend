import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { FC } from "react";
import { Role } from "../interfaces";

interface MainTableProps {
    children: React.ReactNode;
}

export const MainTable: FC<MainTableProps> = ({ children }) => {
    return (
        <Paper
            sx={{
                boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
                width: '100%',
                overflow: 'hidden'
            }}>
            <TableContainer
                sx={{
                    height: '400px',
                    width: '100%',
                }}
            >
                <Table
                    stickyHeader
                    aria-label="sticky table"
                >
                    {children}
                </Table>
            </TableContainer>
        </Paper>
    );
};

interface MainTableHeadProps {
    columns: string[];
    roles?: Role[];
}

export const MainTableHead: FC<MainTableHeadProps> = ({ columns, roles }) => {
    return (
        <TableHead>
            <TableRow>
                {columns.map((Column, index) => (
                    <TableCell
                        key={index}
                        sx={{
                            whiteSpace: "nowrap",
                            backgroundColor: "#1E1E1E",
                            minWidth: "150px",
                        }}
                    >
                        {Column}
                    </TableCell>
                ))}
                {roles && (
                    <></>
                )}
            </TableRow>
        </TableHead>
    )
}

interface MainTableBodyProps {
    children: React.ReactNode;
    colSpan: number;
    isLoading: boolean;
    itemsCount: number;
    text: string;
}

export const MainTableBody: FC<MainTableBodyProps> = ({ children, colSpan, isLoading, itemsCount, text }) => {
    if (isLoading) {
        return (
            <TableBody>
                <tr>
                    <TableCell colSpan={colSpan} style={{ textAlign: "center" }}>
                        <CircularProgress />
                    </TableCell>
                </tr>
            </TableBody>
        );
    }

    return (
        <TableBody>
            {itemsCount === 0 ? (
                <TableRow>
                    <TableCell colSpan={7} style={{ textAlign: "center" }}>
                        {text}
                    </TableCell>
                </TableRow>
            ) : (
                children
            )}
        </TableBody>
    );
}

interface MainTablePaginationProps {
    itemCount: number;
    handleChangeLimit: (limit: number) => void;
    limit: number;
    page: number;
    handleChangePage: (page: number) => void;
}

export const MainTablePagination: FC<MainTablePaginationProps> = ({
    itemCount,
    handleChangeLimit,
    limit,
    page,
    handleChangePage,
}) => {
    return (
        <TablePagination
        id='pagination'
        rowsPerPageOptions={[
            5,
            10,
            25,
        ]}
        component="div"
        count={itemCount}
        onRowsPerPageChange={(e) => handleChangeLimit(parseInt(e.target.value, 10))}
        rowsPerPage={limit}
        page={page}
        onPageChange={(_, newPage) => handleChangePage(newPage)}
      />
    )
}