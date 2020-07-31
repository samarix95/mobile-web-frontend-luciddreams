import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { EditorState, convertFromRaw } from "draft-js";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ExploreIcon from "@material-ui/icons/Explore";

import history from "../../history";
import historyPath from "../../historyPath";
import Styles from "../../styles";
import dict from "../../dictionary";

import { setOpenDialogConfirm, setResetDialogConfirm } from "../../actions/actions";
import { fetchUpdatePost } from "../../functions/fetch";
import { getLanguage } from "../../reducers/languageReducer";
import { getAuthData } from "../../reducers/authReducer";
import { getUserPostsData } from "../../reducers/userPostsReducer";
import { getThemePalette } from "../../reducers/appThemeReducer";
import { getDialogConfirmData, getDialogConfirmAction } from "../../reducers/dialogConfirmReducer";

function CardDream(props) {
    const { appTheme, language, authData, userPostsData, card_id,
        openDialogConfirm, resetDialogConfirm, dialogConfirmData, dialogConfirmAction,
        updatePost } = props;
    const classes = Styles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dateOfDream = new Date(userPostsData.find(item => (item.id === card_id))[`dream_date`]).getDate() + "." + (new Date(userPostsData.find(item => (item.id === card_id))[`dream_date`]).getMonth() + 1) + "." + new Date(userPostsData.find(item => (item.id === card_id))[`dream_date`]).getFullYear() + " " + new Date(userPostsData.find(item => (item.id === card_id))[`dream_date`]).getHours() + ":" + ("0" + new Date(userPostsData.find(item => (item.id === card_id))[`dream_date`]).getMinutes()).slice(-2);
    const popOpen = Boolean(anchorEl);
    const popId = popOpen ? 'simple-popover' : undefined;

    const handleReadDream = () => {
        history.push({
            pathname: historyPath.ReadDream,
            defaultData: {
                id: card_id
            }
        });
    };

    const hadlePopTags = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopTags = () => {
        setAnchorEl(null);
    };

    const handleChangePublic = () => {
        openDialogConfirm(
            userPostsData.find(item => (item.id === card_id))[`is_public`] === 0
                ? {
                    title: dict[language].texts.ChangePublic,
                    message: dict[language].texts.UsersCanRead,
                    action: "change_public",
                    value: 1,
                    id: card_id
                }
                : {
                    title: dict[language].texts.ChangePublic,
                    message: dict[language].texts.UsersCantRead,
                    action: "change_public",
                    value: 0,
                    id: card_id
                }
        );
    };

    React.useEffect(() => {
        if (typeof dialogConfirmAction === "boolean" && dialogConfirmData.action === "change_public" && card_id === dialogConfirmData.id) {
            if (dialogConfirmAction) {
                let defaultTags = [];
                userPostsData.find(item => (item.id === card_id))[`posts_tags`].map(item => defaultTags.push(item.tag));
                let defaultTechnics = [];
                userPostsData.find(item => (item.id === card_id))[`posts_technics`].map(item => defaultTechnics.push(item.technic));
                updatePost({
                    title: userPostsData.find(item => (item.id === card_id)).title,
                    content: userPostsData.find(item => (item.id === card_id)).content,
                    rating: userPostsData.find(item => (item.id === card_id)).rating,
                    post_type: userPostsData.find(item => (item.id === card_id)).post_type,
                    dream_date: userPostsData.find(item => (item.id === card_id)).dream_date,
                    is_public: dialogConfirmData.value,
                    tags: defaultTags,
                    technics: defaultTechnics,
                    language: language,
                    id: dialogConfirmData.id,
                    create_user: authData.id,
                    redirect: false
                });
            }
            resetDialogConfirm();
        }
    }, [card_id, dialogConfirmAction, resetDialogConfirm, dialogConfirmData, updatePost, language, authData, userPostsData]);

    return (
        <Grid item xs={12} sm={4} md={3} style={{ display: "flex" }}>
            <Card raised className={`${classes.margin1} ${classes.flexSpaceBetween} ${classes.transprent03}`} style={{ width: "100%" }} >
                <CardContent className={`${classes.flexSpaceBetween}`} style={{ height: "100%" }} >
                    <Typography variant="h6" paragraph>
                        {userPostsData.find(item => (item.id === card_id))[`title`]}
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        style={{ marginTop: "auto" }}
                    >
                        <Grid item>
                            <Typography variant="body2" paragraph>
                                {dateOfDream}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" paragraph>
                                {userPostsData.find(item => (item.id === card_id))[`post_type`] === 1
                                    ? dict[language].texts.LucidDream
                                    : dict[language].texts.RegularDream
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" noWrap>
                        {EditorState.createWithContent(convertFromRaw(JSON.parse(userPostsData.find(item => (item.id === card_id))[`content`].toString()))).getCurrentContent().getPlainText("")}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={6}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Button size="small" variant="outlined" color="primary" onClick={handleReadDream}>
                                        {dict[language].buttons.Read}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container
                                direction="row"
                                justify="space-around"
                                alignItems="center"
                            >
                                <Grid item>
                                    <IconButton size="small" onClick={handleReadDream}>
                                        <Badge badgeContent={userPostsData.find(item => (item.id === card_id))[`comm_count`]} color="primary">
                                            <ChatBubbleOutlineIcon />
                                        </Badge>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton size="small" onClick={(e) => userPostsData.find(item => (item.id === card_id))[`posts_tags`].length > 0 ? hadlePopTags(e) : console.log(e)}>
                                        <Badge badgeContent={userPostsData.find(item => (item.id === card_id))[`posts_tags`].length} color="primary">
                                            <ExploreIcon />
                                        </Badge>
                                    </IconButton>
                                    {userPostsData.find(item => (item.id === card_id))[`posts_tags`].length > 0
                                        ? <Popover
                                            id={popId}
                                            open={popOpen}
                                            anchorEl={anchorEl}
                                            onClose={handleClosePopTags}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <Grid container
                                                direction="row"
                                                justify="space-around"
                                                alignItems="center"
                                            >
                                                {userPostsData.find(item => (item.id === card_id))[`posts_tags`].map((item, key) =>
                                                    <Grid item key={key} className={`${classes.margin1}`}>
                                                        <Tooltip disableFocusListener disableTouchListener title={item.tag[`name_${language}`]} >
                                                            <Paper className={`${classes.margin1}`}>
                                                                <Avatar src={item.tag.img_url} style={appTheme.palette.type === 'dark' ? { filter: 'invert(1)' } : {}} />
                                                            </Paper>
                                                        </Tooltip>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Popover>
                                        : <React.Fragment />
                                    }
                                </Grid>
                                <Grid item className={`${classes.flexSpaceBetween}`}>
                                    {userPostsData.find(item => (item.id === card_id))[`is_public`]
                                        ? <IconButton size="small" onClick={handleChangePublic}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        : <IconButton size="small" onClick={handleChangePublic}>
                                            <VisibilityOffIcon />
                                        </IconButton>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid >
    );
}

CardDream.propTypes = {
    appTheme: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    authData: PropTypes.object.isRequired,
    userPostsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    dialogConfirmData: PropTypes.object.isRequired,
    openDialogConfirm: PropTypes.func.isRequired,
    resetDialogConfirm: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
};

const mapStateToProps = store => {
    return {
        appTheme: getThemePalette(store),
        language: getLanguage(store),
        authData: getAuthData(store),
        userPostsData: getUserPostsData(store),
        dialogConfirmData: getDialogConfirmData(store),
        dialogConfirmAction: getDialogConfirmAction(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    openDialogConfirm: setOpenDialogConfirm,
    resetDialogConfirm: setResetDialogConfirm,
    updatePost: fetchUpdatePost,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardDream);