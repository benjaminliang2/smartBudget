import React from 'react'

import { Box, CardContent, Divider, IconButton, Typography } from '@mui/material';
import Card from "@mui/material/Card"
import PaidIcon from '@mui/icons-material/Paid';
import DeleteIcon from '@mui/icons-material/Delete';
const ExpenseCard = ({ cost = 100.34, merchant = "Target", name = "Groceries" }) => {
    return (
        <Card sx={{ display: 'flex', alignItems: 'center', gap: '16px', p: 2 }}>
            <PaidIcon />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography component="div" variant="p">
                    ${cost}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>

                    <Typography variant="subtitle1" color="text.secondary" sx={{ marginRight: 1 }}>
                        {merchant}
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography variant="subtitle1" color="text.secondary" sx={{ marginLeft: 1 }} >
                        {name}
                    </Typography>
                </Box>
            </Box>
            <IconButton aria-label="delete" sx={{ flex: '1 0 auto' }}>
                <DeleteIcon sx={{}} />
            </IconButton>
        </Card>
    )
}

export default ExpenseCard