import {useEffect} from "react";
import {Alert, AlertTitle, Box, IconButton} from "@mui/material";
import {Refresh} from "@mui/icons-material";

export default function Report({error, onRetry}: {
    error: Error
    onRetry: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])
    return (
        <Alert
            severity="error"
            action={
                <IconButton color="inherit" size="small" onClick={onRetry}>
                    <Refresh/>
                </IconButton>
            }
        >
            <AlertTitle>{error.toString()}</AlertTitle>
            <Box component="pre" overflow="auto">{error.stack}</Box>
        </Alert>
    )
}