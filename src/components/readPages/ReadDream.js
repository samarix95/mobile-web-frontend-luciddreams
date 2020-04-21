import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import MUIRichTextEditor from "mui-rte";

import LinearProgress from "@material-ui/core/LinearProgress";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Rating from "@material-ui/lab/Rating";

import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import HomeIcon from "@material-ui/icons/Home";

import history from "../../history";
import historyPath from "../../historyPath";
import Styles from "../../styles";
import dict from "../../dictionary";

import { setOpenDialogConfirm, setResetDialogConfirm, clearPostComments } from "../../actions/actions";
import { fetchDeletePost } from "../../functions/fetch";
import { getLanguage } from "../../reducers/languageReducer";
import { getAuthData } from "../../reducers/authReducer";
import { getThemePalette } from "../../reducers/appThemeReducer";
import { getUserPostsData } from "../../reducers/userPostsReducer";
import { getDialogConfirmData, getDialogConfirmAction } from "../../reducers/dialogConfirmReducer";
import { getDeletePostPending } from "../../reducers/deletePostReducer";
import StyledBreadcrumb from "../StyledBreadcrumb";
import Comments from "../Comments";

function ReadDream(props) {
    const { appTheme, language, authData, userPostsData, clearPostComments,
        openDialogConfirm, resetDialogConfirm, dialogConfirmData, dialogConfirmAction,
        deletePost, deletePostPending } = props;
    const { id } = props.location.defaultData;
    const classes = Styles();

    const handleBackMainPage = () => {
        clearPostComments();
        history.push(historyPath.MainPage);
    };

    const handleBackDreams = () => {
        clearPostComments();
        history.push(historyPath.Dreams);
    };

    const handleEditDream = () => {
        history.push({
            pathname: historyPath.EditDream,
            defaultData: {
                id: id
            }
        });
    };

    const handleDeleteDream = () => {
        openDialogConfirm({
            title: dict[language].texts.DeleteTitle,
            message: dict[language].texts.DeletePostMessage,
            path: historyPath.Dreams,
            action: "delete_post"
        });
    };

    React.useEffect(() => {
        if (typeof dialogConfirmAction === "boolean" && dialogConfirmData.action === "delete_post") {
            resetDialogConfirm();
            if (dialogConfirmAction) {
                deletePost({
                    language: language,
                    id: id,
                    create_user: authData.id
                });
            }
        }
    }, [id, authData, deletePost, language, dialogConfirmAction, dialogConfirmData, resetDialogConfirm]);

    return (
        <div className={classes.root}>
            <Paper className={`${classes.padding1} ${classes.stickyTop}`} >
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <StyledBreadcrumb component="a" color="primary" label={dict[language].buttons.Main} icon={<HomeIcon />} onClick={handleBackMainPage} />
                    <StyledBreadcrumb component="a" color="primary" label={dict[language].buttons.MyDreams} onClick={handleBackDreams} />
                    <StyledBreadcrumb component="a" color="primary" disabled={true} label={`${dict[language].texts.Dream}: ${userPostsData.find(item => (item.id === id))[`title`]}`} />
                </Breadcrumbs>
            </Paper>
            <Container className={`${classes.margin2}`}>
                <Grid container
                    direction="column"
                    alignItems="stretch"
                    spacing={1}
                >
                    <Grid item>
                        <Typography variant="h6" align="center" paragraph>
                            {userPostsData.find(item => (item.id === id))[`title`]}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" align="center" paragraph>
                            {new Date(userPostsData.find(item => (item.id === id))[`dream_date`]).getDate() + "." + (new Date(userPostsData.find(item => (item.id === id))[`dream_date`]).getMonth() + 1) + "." + new Date(userPostsData.find(item => (item.id === id))[`dream_date`]).getFullYear() + " " + new Date(userPostsData.find(item => (item.id === id))[`dream_date`]).getHours() + ":" + ("0" + new Date(userPostsData.find(item => (item.id === id))[`dream_date`]).getMinutes()).slice(-2)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Hidden only={["xs", "sm"]}>
                                <Grid item md={2} />
                            </Hidden>
                            <Grid item xs={12} md={8}>
                                <MUIRichTextEditor id="mui-rte-text"
                                    className={`${classes.MuiRteRead}`}
                                    controls={[
                                        "bold",
                                        "italic",
                                        "underline",
                                        "strikethrough",
                                        "colorfill"
                                    ]}
                                    customControls={[
                                        {
                                            name: "colorfill",
                                            icon: <FormatColorFillIcon />,
                                            type: "inline",
                                            inlineStyle: {
                                                backgroundColor: "yellow",
                                                color: "black"
                                            }
                                        }
                                    ]}
                                    value={userPostsData.find(item => (item.id === id))[`content`]}
                                    readOnly={true}
                                    toolbar={false}
                                />
                            </Grid>
                            <Hidden only={["xs", "sm"]}>
                                <Grid item md={2} />
                            </Hidden>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {userPostsData.find(item => (item.id === id))[`posts_tags`].length > 0
                            ? <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                {userPostsData.find(item => (item.id === id))[`posts_tags`].map((item, key) =>
                                    <Grid item key={key} className={`${classes.margin1}`}>
                                        <Tooltip disableFocusListener disableTouchListener title={item.tag[`name_${language}`]} >
                                            <Paper>
                                                <Avatar src={item.tag.img_url} style={appTheme.palette.type === 'dark' ? { filter: 'invert(1)' } : {}} />
                                            </Paper>
                                        </Tooltip>
                                    </Grid>
                                )}
                            </Grid>
                            : <React.Fragment />
                        }
                    </Grid>
                    <Grid item>
                        {userPostsData.find(item => (item.id === id))[`post_type`] === 1
                            ? <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={1}
                            >
                                <Hidden only={["xs", "sm"]}>
                                    <Grid item md={2} />
                                </Hidden>
                                <Grid item xs={6} md={4}>
                                    {userPostsData.find(item => (item.id === id))[`posts_tags`].length > 0
                                        ? <Grid container
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            {userPostsData.find(item => (item.id === id))[`posts_technics`].map((item, key) =>
                                                <Grid item key={key}>
                                                    <Paper className={`${classes.padding1} ${classes.margin1}`}>
                                                        <Typography variant="body1" align="center">
                                                            {item.technic[`name_${language}`]}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            )}
                                        </Grid>
                                        : <React.Fragment />
                                    }
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Grid container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Paper className={`${classes.padding1} ${classes.margin1}`}>
                                                <Typography>
                                                    {dict[language].texts.Realistic}
                                                </Typography>
                                                <Rating readOnly value={userPostsData.find(item => (item.id === id))[`rating`]} />
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Hidden only={["xs", "sm"]}>
                                    <Grid item md={2} />
                                </Hidden>
                            </Grid>
                            : <React.Fragment />
                        }
                    </Grid>
                </Grid>
            </Container>
            <Container className={`${classes.margin2}`}>
                <Grid container spacing={1}>
                    <Hidden only={["xs", "sm"]}>
                        <Grid item md={2} />
                    </Hidden>
                    <Grid item xs={12} md={8}>
                        <Divider />
                    </Grid>
                    <Hidden only={["xs", "sm"]}>
                        <Grid item md={2} />
                    </Hidden>
                </Grid>
            </Container>
            <Container className={`${classes.margin2}`}>
                <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Hidden only={["xs", "sm"]}>
                        <Grid item md={3} />
                    </Hidden>
                    {!deletePostPending
                        ? <React.Fragment>
                            <Grid item xs={3} md={2}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Button size="small" variant="outlined" color="primary" onClick={handleBackDreams}>
                                            {dict[language].buttons.Back}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={9} md={4}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Button size="small" variant="outlined" color="primary" onClick={handleEditDream}>
                                            {dict[language].buttons.Edit}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="outlined" color="primary" onClick={handleDeleteDream}>
                                            {dict[language].buttons.Delete}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                        : <Grid item xs={12} md={6}>
                            <LinearProgress />
                        </Grid>
                    }
                    <Hidden only={["xs", "sm"]}>
                        <Grid item md={3} />
                    </Hidden>
                </Grid>
            </Container>
            <Container className={`${classes.margin2}`}>
                <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Hidden only={["xs", "sm"]}>
                        <Grid item md={2} />
                    </Hidden>
                    <Grid item xs={12} md={8}>
                        <Comments id={id} />
                    </Grid>
                    <Hidden only={["xs", "sm"]}>
                        <Grid item md={2} />
                    </Hidden>
                </Grid>
            </Container>
        </div>
    );
}

ReadDream.propTypes = {
    appTheme: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    authData: PropTypes.object.isRequired,
    userPostsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    dialogConfirmData: PropTypes.object.isRequired,
    deletePostPending: PropTypes.bool.isRequired,
    deletePost: PropTypes.func.isRequired,
    clearPostComments: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        appTheme: getThemePalette(store),
        language: getLanguage(store),
        authData: getAuthData(store),
        userPostsData: getUserPostsData(store),
        dialogConfirmData: getDialogConfirmData(store),
        dialogConfirmAction: getDialogConfirmAction(store),
        deletePostPending: getDeletePostPending(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    openDialogConfirm: setOpenDialogConfirm,
    resetDialogConfirm: setResetDialogConfirm,
    deletePost: fetchDeletePost,
    clearPostComments: clearPostComments
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReadDream);