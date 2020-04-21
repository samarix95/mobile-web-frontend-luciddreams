import { emphasize, withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

export default withStyles((theme) => ({
    root: {
        [theme.breakpoints.up("xs")]: {
            maxWidth: 150
        },
        [theme.breakpoints.up("sm")]: {
            maxWidth: "100%"
        },
        userSelect: "none",
        height: theme.spacing(3),
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            backgroundColor: theme.palette.grey[500]
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[500], 0.12)
        }
    }
}))(Chip);