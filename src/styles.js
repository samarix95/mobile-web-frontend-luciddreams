import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
    VeryBigImg: {
        [theme.breakpoints.up("xs")]: {
            height: 230,
            width: 230
        },
        [theme.breakpoints.up("390")]: {
            height: 250,
            width: 250
        },
        [theme.breakpoints.up("sm")]: {
            height: 290,
            width: 290
        },
        [theme.breakpoints.up("md")]: {
            height: 330,
            width: 330
        }
    },
    BigImg: {
        [theme.breakpoints.up("xs")]: {
            height: 130,
            width: 130
        },
        [theme.breakpoints.up("390")]: {
            height: 150,
            width: 150
        },
        [theme.breakpoints.up("sm")]: {
            height: 190,
            width: 190
        },
        [theme.breakpoints.up("md")]: {
            height: 230,
            width: 230
        }
    },
    MedImg: {
        [theme.breakpoints.up("xs")]: {
            height: 90,
            width: 90
        },
        [theme.breakpoints.up("390")]: {
            height: 110,
            width: 110
        },
        [theme.breakpoints.up("sm")]: {
            height: 150,
            width: 150
        },
        [theme.breakpoints.up("md")]: {
            height: 190,
            width: 190
        }
    },
    DarkBackgroundColor: {
        backgroundColor: "#000",
        border: "2.5px white solid",
        transition: "background-color 0.5s ease 0s",
        '&:hover': {
            background: "#202020",
            border: "2.5px white solid"
        }
    },
    LightBackgroundColor: {
        backgroundColor: "#rgba(0, 0, 0, 0.0)",
        border: "2.5px black solid",
        transition: "background-color 0.5s ease 0s",
        '&:hover': {
            backgroundColor: "#rgba(255, 255, 255, 0.5)",
            border: "2.5px black solid",
        }
    },
    BackgroundImg: {
        borderRadius: "50%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "90% 90%"
    },
    MainPageContainer: {
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 20%)"
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
    transprent02: {
        background: "rgba(255, 255, 255, 0.2)"
    },
    transprent03: {
        background: "rgba(255, 255, 255, 0.3)"
    },
    paper: {
        position: "relative",
        top: 100,
        backgroundColor: "rgba(255, 255, 255, 0.0)",
        boxShadow: "none",
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
    marginTop8: {
        marginTop: theme.spacing(8)
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
    },
    hide: {
        opacity: 0
    },
    visible: {
        opacity: 1
    },
    Background: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%"
    },
    AnimatedTwinkling: {
        animationName: `$moveTwink, $fadeIn`,
        animationDuration: "20s, 3s",
        animationTimingFunction: "linear, linear",
        animationIterationCount: "infinite, 1"
    },
    FadeIn: {
        animation: `1s ease 0s normal forwards 1 $fadeIn`
    },
    FadeOut: {
        animation: `1s ease 0s normal forwards 1 $fadeOut`
    },
    InvertIn: {
        animation: `0.5s ease 0s normal forwards 1 $invertIn`
    },
    InvertOut: {
        animation: `0.5s ease 0s normal forwards 1 $invertOut`
    },
    "@keyframes moveTwink": {
        "0": {
            backgroundPosition: "0"
        },
        "100%": {
            backgroundPosition: "100% 0"
        }
    },
    "@keyframes fadeIn": {
        "0%": {
            opacity: "0"
        },
        "55%": {
            opacity: "1"
        },
        "100%": {
            opacity: "1"
        }
    },
    "@keyframes fadeOut": {
        "0%": {
            opacity: "1"
        },
        "45%": {
            opacity: "0"
        },
        "100%": {
            opacity: "0"
        }
    },
    "@keyframes invertIn": {
        "0%": {
            filter: "invert(0)"
        },
        "100%": {
            filter: "invert(1)"
        }
    },
    "@keyframes invertOut": {
        "0%": {
            filter: "invert(1)"
        },
        "100%": {
            filter: "invert(0)"
        }
    }
}));