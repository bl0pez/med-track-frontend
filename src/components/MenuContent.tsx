import { useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import { routes } from '../config/routes.config';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';

const menu = [
    { text: 'Dashboard', icon: <DashboardIcon />, roles: [], path: routes.dashboard },
    { text: 'Pacientes', icon: <GroupsIcon />, roles: [], path: routes.patients },
    { text: 'Cilindros', icon: <PropaneTankIcon />, roles: [], path: routes.cylinders },
];

export default function MenuContent() {

    const user = useAuthStore((state) => state.user);
    const location = useLocation();

    const filteredMenu = menu.filter((item) => {
        if (item.roles.length === 0) {
            return true;
        }
        return item.roles.some((role) => user!.roles.includes(role));
    });

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {filteredMenu.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={location.pathname === item.path} to={item.path} component={Link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}