import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import LinearProgress from "@material-ui/core/LinearProgress";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Styles from "../styles";
import dict from "../dictionary";

import CardComment from "./multiple/CardComment"

import { getLanguage } from "../reducers/languageReducer";
import { fetchPostComments, fetchAddPostComment } from "../functions/fetch";
import { getPostCommentsPending, getPostCommentsData } from "../reducers/postCommentsReducer";

let ids = [];

function Comments(props) {
    const { id, language, postCommentsPending, postCommentsData, fetchPostComments, addPostComment } = props;
    const classes = Styles();
    const [commentText, setCommentText] = React.useState("");

    const handleSetCommentText = (event) => {
        setCommentText(event.target.value);
    };

    const handleClearComment = () => {
        setCommentText("");
    };

    const handleAddComment = () => {
        handleClearComment();
        addPostComment({
            parent_id: null,
            level: 0,
            post_id: id,
            created_date: new Date(),
            comment: commentText,
            language: language
        });
    };

    const findChild = (id) => {
        postCommentsData.filter(child => child.parent_id === id)
            .map(child => {
                ids.push(child.id);
                findChild(child.id);
                return true;
            });
    };

    if (!postCommentsPending && Object.keys(postCommentsData).length > 0) {
        let order = {};
        postCommentsData.filter(parent => parent.parent_id == null)
            .map(parent => {
                ids.push(parent.id);
                findChild(parent.id);
                return true;
            });
        ids.forEach((a, i) => (order[a] = i));
        postCommentsData.sort(function (a, b) {
            return order[a.id] - order[b.id];
        });
    }

    React.useEffect(() => {
        fetchPostComments({ language: language, post_id: id });
    }, [fetchPostComments, language, id]);

    return (
        <Grid container direction="column" spacing={1} >
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <Paper className={`${classes.margin1} ${classes.padding1}`} >
                            <InputBase fullWidth
                                multiline
                                spellCheck={true}
                                inputProps={{ "aria-label": "add-comment" }}
                                onChange={handleSetCommentText}
                                type="text"
                                placeholder={dict[language].texts.AddComment}
                                variant="outlined"
                                value={commentText}
                            />
                        </Paper>
                    </Grid>
                    <Grid item className={`${classes.margin1}`}>
                        <Grid container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                            spacing={1}
                        >
                            <Grid item>
                                <Button size="small" variant="outlined" color="primary" onClick={handleClearComment} disabled={commentText.length > 0 ? false : true}>
                                    {dict[language].buttons.Cancel}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button size="small" variant="outlined" color="primary" onClick={handleAddComment} disabled={commentText.length > 0 ? false : true}>
                                    {dict[language].buttons.Add}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" className={`${classes.padding1}`} spacing={1} >
                    {Object.keys(postCommentsData).length > 0
                        ? postCommentsData.map((item, key) => (
                            <CardComment key={key} id={item.id} post_id={id} />
                        ))
                        : postCommentsPending
                            ? <Grid item className={`${classes.padding1}`}>
                                <LinearProgress />
                            </Grid>
                            : <Grid item className={`${classes.padding1}`}>
                                {dict[language].texts.NotHaveComments}
                            </Grid>
                    }
                </Grid>
            </Grid>
        </Grid >
    );
}

Comments.propTypes = {
    language: PropTypes.string.isRequired,
    postCommentsPending: PropTypes.bool.isRequired,
    postCommentsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    fetchPostComments: PropTypes.func.isRequired,
    addPostComment: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        language: getLanguage(store),
        postCommentsPending: getPostCommentsPending(store),
        postCommentsData: getPostCommentsData(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchPostComments: fetchPostComments,
    addPostComment: fetchAddPostComment
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments);