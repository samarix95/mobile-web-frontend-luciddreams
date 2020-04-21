import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import DeleteIcon from "@material-ui/icons/Delete";
import ReplyIcon from "@material-ui/icons/Reply";
import EditIcon from "@material-ui/icons/Edit";

import Styles from "../../styles";
import dict from "../../dictionary";

import { fetchAddPostComment, fetchUpdatePostComment } from "../../functions/fetch";
import { setOpenDialogConfirm, setResetDialogConfirm } from "../../actions/actions";
import { getAuthData } from "../../reducers/authReducer";
import { getLanguage } from "../../reducers/languageReducer";
import { getPostCommentsData } from "../../reducers/postCommentsReducer"
import { getDialogConfirmData, getDialogConfirmAction } from "../../reducers/dialogConfirmReducer";

const mode = {
    answer: "answer",
    edit: "edit",
    delete: "delete"
};

function CardComment(props) {
    const { authData, language, postCommentsData, post_id, id,
        openDialogConfirm, dialogConfirmData, dialogConfirmAction, resetDialogConfirm,
        addPostComment, updatePostComment } = props;
    const classes = Styles();

    const [action, setAction] = React.useState(mode.answer);
    const [answerText, setAnswerText] = React.useState("");
    const [answerExpanded, seAnswerExpanded] = React.useState(false);

    const handleAnswerComment = () => {
        setAction(mode.answer);
        seAnswerExpanded(true);
    };

    const handleSetAnswerText = (event) => {
        setAnswerText(event.target.value);
    };

    const handleEditComment = () => {
        setAction(mode.edit);
        setAnswerText(postCommentsData.find(item => (item.id === id)).comment);
        seAnswerExpanded(true);
    }

    const handleClearAnswer = () => {
        setAnswerText("");
        seAnswerExpanded(false);
    };

    const handleAddAnswer = () => {
        setAnswerText("");
        seAnswerExpanded(false);
        addPostComment({
            parent_id: id,
            level: postCommentsData.find(item => (item.id === id)).level + 1,
            post_id: post_id,
            created_date: new Date(),
            comment: answerText,
            language: language
        });
    };

    const handleSaveAnswer = () => {
        setAnswerText("");
        seAnswerExpanded(false);
        updatePostComment({
            id: id,
            post_id: post_id,
            comment: answerText,
            language: language
        });
    };

    const handleDeleteComment = () => {
        setAction(mode.delete);
        openDialogConfirm({
            title: dict[language].texts.DeleteTitle,
            message: dict[language].texts.DeleteCommentMessage,
            id: id,
            post_id: post_id,
            language: language,
            action: "delete_comment"
        });
    };

    React.useEffect(() => {
        if (typeof dialogConfirmAction === "boolean" && dialogConfirmData.action === "delete_comment") {
            resetDialogConfirm();
            if (dialogConfirmAction) {
                updatePostComment({
                    id: dialogConfirmData.id,
                    post_id: dialogConfirmData.post_id,
                    deleted: 1,
                    language: dialogConfirmData.language
                });
            }
        }
    }, [dialogConfirmAction, resetDialogConfirm, dialogConfirmData, updatePostComment]);

    return (
        <Grid item style={{ marginLeft: postCommentsData.find(item => (item.id === id)).level * 16 }} className={`${classes.padding1}`}>
            {postCommentsData.find(item => (item.id === id)).comment_deleted
                ? <Grid>
                    <Typography variant="body2" paragraph>
                        {dict[language].texts.DeletedComment}
                    </Typography>
                </Grid>
                : <Grid container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Grid item>
                        <Grid container
                            direction="row"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item>
                                <Avatar src={postCommentsData.find(item => (item.id === id)).avatar_url} className={`${classes.smallAvatar}`} />
                            </Grid>
                            <Grid item>
                                <Grid container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Typography variant="subtitle1">
                                            {postCommentsData.find(item => (item.id === id)).nickname}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            {"(" + new Date(postCommentsData.find(item => (item.id === id)).created_date).getDate() + "." + (new Date(postCommentsData.find(item => (item.id === id)).created_date).getMonth() + 1) + "." + new Date(postCommentsData.find(item => (item.id === id)).created_date).getFullYear() + " " + new Date(postCommentsData.find(item => (item.id === id)).created_date).getHours() + ":" + ("0" + new Date(postCommentsData.find(item => (item.id === id)).created_date).getMinutes()).slice(-2) + ")"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">
                            {postCommentsData.find(item => (item.id === id)).comment}
                        </Typography>
                    </Grid>
                    <Grid item className={`${classes.input}`}>
                        <Grid container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-start"
                            spacing={1}
                        >
                            {!answerExpanded
                                ? <React.Fragment>
                                    <Grid item>
                                        <IconButton size="small" onClick={handleAnswerComment}>
                                            <ReplyIcon />
                                        </IconButton>
                                    </Grid>
                                    {authData.id === postCommentsData.find(item => (item.id === id)).user_id
                                        ? <React.Fragment>
                                            <Grid item>
                                                <IconButton size="small" onClick={handleEditComment}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item>
                                                <IconButton size="small" onClick={handleDeleteComment}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </React.Fragment>
                                        : <React.Fragment />
                                    }
                                </React.Fragment>
                                : <React.Fragment />
                            }
                        </Grid>
                    </Grid>
                    <Collapse className={`${classes.fullWidth}`}
                        in={answerExpanded}
                        timeout="auto"
                        unmountOnExit
                    >
                        <Grid container direction="column">
                            <Grid item>
                                <Paper className={`${classes.margin1} ${classes.padding1}`} >
                                    <InputBase
                                        fullWidth
                                        multiline
                                        spellCheck={true}
                                        inputProps={{ "aria-label": "add-comment" }}
                                        onChange={handleSetAnswerText}
                                        type="text"
                                        placeholder={dict[language].texts.AddComment}
                                        variant="outlined"
                                        value={answerText}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item className={`${classes.margin1}`} >
                                <Grid container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Button size="small" variant="outlined" color="primary" onClick={handleClearAnswer}>
                                            {dict[language].buttons.Cancel}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="outlined" color="primary" onClick={() => { action === mode.answer ? handleAddAnswer() : handleSaveAnswer() }} disabled={answerText.length > 0 ? false : true}>
                                            {action === mode.answer
                                                ? dict[language].buttons.Add
                                                : dict[language].buttons.Save
                                            }
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>
            }
            <Divider className={`${classes.margin1}`} />
        </Grid>
    );
}

CardComment.propTypes = {
    authData: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    postCommentsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    dialogConfirmData: PropTypes.object.isRequired,
    openDialogConfirm: PropTypes.func.isRequired,
    resetDialogConfirm: PropTypes.func.isRequired,
    addPostComment: PropTypes.func.isRequired,
    updatePostComment: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        authData: getAuthData(store),
        language: getLanguage(store),
        postCommentsData: getPostCommentsData(store),
        dialogConfirmData: getDialogConfirmData(store),
        dialogConfirmAction: getDialogConfirmAction(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    openDialogConfirm: setOpenDialogConfirm,
    resetDialogConfirm: setResetDialogConfirm,
    addPostComment: fetchAddPostComment,
    updatePostComment: fetchUpdatePostComment
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardComment);