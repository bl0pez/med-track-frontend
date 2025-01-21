import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { FC } from "react";
import { Role } from "../interfaces";

interface MainTableProps {
    children: React.ReactNode;
}

export const MainTable: FC<MainTableProps> = ({ children }) => {
    return (
            <TableContainer
                component={Paper}
                sx={{
                    height: '400px',
                }}
            >
                <Table
                    stickyHeader
                    aria-label="sticky table"
                    sx={{ minWidth: 500 }}
                >
                    {children}
                </Table>
            </TableContainer>
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
                            fontSize: { xs: "1rem", md: "1.5rem" },
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
    itemsCount?: number;
    text: string;
}

export const MainTableBody: FC<MainTableBodyProps> = ({ children, colSpan, isLoading, itemsCount = 0, text }) => {
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
    itemCount?: number;
    handleChangeLimit: (limit: number) => void;
    limit?: number;
    page?: number;
    handleChangePage: (page: number) => void;
}

export const MainTablePagination: FC<MainTablePaginationProps> = ({
    itemCount = 0,
    handleChangeLimit,
    limit = 0,
    page = 0,
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
        labelRowsPerPage='Total por página'
        component="div"
        count={itemCount}
        onRowsPerPageChange={(e) => handleChangeLimit(parseInt(e.target.value, 10))}
        rowsPerPage={limit}
        page={page - 1}
        variant="footer"
        sx={{ backgroundColor: '#1E1E1E', borderTop: '1px solid #fff' }}
        onPageChange={(_, newPage) => handleChangePage(newPage)}
      />
    )
}