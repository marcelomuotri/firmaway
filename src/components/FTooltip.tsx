import { Box, Typography } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help';

const FTooltip = ({ title }: { title: string }) => {
    return (
        <Box display="flex" gap={8}>
            <HelpIcon sx={{ width: '15px', height: '15px', color: "#FF6846" }} />
            <Typography sx={{ fontSize: '12px', fontWeight: 'normal', color: "#59626D" }} >
                {title}
            </Typography>
        </Box>

    )
}

export default FTooltip

