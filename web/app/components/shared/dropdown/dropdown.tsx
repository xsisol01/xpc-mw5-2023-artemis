import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { useState, FC, memo } from 'react'

interface IProps {
    title: string
    children: React.ReactNode
}

const Dropdown: FC<IProps> = memo(({title, children}) => {
    const [ isOpen, setIsOpen ] = useState(false);

    const handleClick = () => {
        setIsOpen(isOpen => !isOpen)
    };

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                maxHeight: 360,
                pt: 0
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton onClick={handleClick}>
            <ListItemText primary={title} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List sx={{
                    py: 1,
                    width: '100%',
                    maxHeight: 300,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
                component="div"
                disablePadding
                >
                    {children}
                </List>
            </Collapse>
        </List>
    )
})

export default Dropdown