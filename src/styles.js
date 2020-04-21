import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
    SunImg: {
        [theme.breakpoints.up("xs")]: {
            height: 150,
            width: 150,
        },
        [theme.breakpoints.up("sm")]: {
            height: 190,
            width: 190,
        },
        [theme.breakpoints.up("md")]: {
            height: 230,
            width: 230,
        },
        borderRadius: "50%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "90% 90%",
    },
    root: {
        position: "relative",
        flexGrow: 1
    },
    stickyTop: {
        position: "sticky",
        top: 0,
        zIndex: 10000
    },
    paper: {
        position: "relative",
        [theme.breakpoints.up("xs")]: {
            marginLeft: "15%",
            marginRight: "15%"
        },
        [theme.breakpoints.up("sm")]: {
            marginLeft: "25%",
            marginRight: "25%"
        },
        [theme.breakpoints.up("md")]: {
            marginLeft: "35%",
            marginRight: "35%"
        }
    },
    input: {
        width: "100%",
        flex: 1
    },
    MenuButtons: {
        minWidth: 300
    },
    MuiRteRead: {
        backgroundColor: theme.palette.text.main,
        padding: 10
    },
    skeletonCard: {
        minHeight: 150,
        borderRadius: 8
    },
    smallAvatar: {
        width: theme.spacing(1),
        height: theme.spacing(1),
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    filterFab: {
        position: "fixed",
        bottom: theme.spacing(1),
        right: theme.spacing(1)
    },
    addPostFab: {
        position: "fixed",
        bottom: theme.spacing(10),
        right: theme.spacing(1)
    },
    flexSpaceBetween: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    margin1: {
        margin: theme.spacing(1)
    },
    margin2: {
        margin: theme.spacing(2)
    },
    padding1: {
        padding: theme.spacing(1)
    },
    padding2: {
        padding: theme.spacing(2)
    },
    fullWidth: {
        width: "100%"
    }
}));