import {IconButton} from "@mui/material";
import {GitHub} from "@mui/icons-material";

export default function Corner() {
    return (
        <IconButton
            size="large"
            edge="end"
            color="inherit"
            sx={{ml: 2}}
            onClick={() => location.href = 'https://github.com/fengyuan-he/zdao'}
        >
            <GitHub/>
        </IconButton>
    )
}