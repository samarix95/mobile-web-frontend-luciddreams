import {
    SET_THEME,
    SET_LANGUAGE,
    SET_OPEN_SNACKBAR, SET_CLOSE_SNACKBAR,
    SET_CONFIRM_DIALOG_OPEN, SET_CONFIRM_DIALOG_CANCEL, SET_CONFIRM_DIALOG_ACCEPT, SET_CONFIRM_DIALOG_RESET_ACCEPT,
    SET_USER_DATA, SET_USER_LOADING, RESET_USER_DATA,
    SET_TECHNICS_PENDING, SET_TECHNICS_DATA, SET_TECHNICS_ERROR,
    SET_TAGS_PENDING, SET_TAGS_DATA, SET_TAGS_ERROR,
    SET_USER_POSTS_PENDING, SET_USER_POSTS_DATA, SET_USER_POSTS_ERROR,
    SET_ADD_POST_PENDING, SET_ADD_POST_DATA, SET_ADD_POST_ERROR,
    SET_UPDATE_POST_PENDING, SET_UPDATE_POST_DATA, SET_UPDATE_POST_ERROR,
    SET_DELETE_POST_PENDING, SET_DELETE_POST_DATA, SET_DELETE_POST_ERROR,
    SET_POST_COMMENTS_PENDING, SET_POST_COMMENTS_DATA, SET_POST_COMMENTS_ERROR, CLEAR_POST_COMMENTS,
    SET_ADD_POST_COMMENT_PENDING, SET_ADD_POST_COMMENT_DATA, SET_ADD_POST_COMMENT_ERROR,
    SET_UPDATE_POST_COMMENT_PENDING, SET_UPDATE_POST_COMMENT_DATA, SET_UPDATE_POST_COMMENT_ERROR,
    SET_SEARCH_ICON_PENDING, SET_SEARCH_ICON_DATA, SET_SEARCH_ICON_ERROR,
    SET_ADD_LOCATION_PENDING, SET_ADD_LOCATION_DATA, SET_ADD_LOCATION_ERROR,
    SET_STT_PENDING, SET_STT_DATA, RESET_STT_DATA, SET_STT_ERROR
} from "./types";

export function setAppTheme(data) {
    return {
        type: SET_THEME,
        theme: data
    }
}

export function setLanguage(data) {
    return {
        type: SET_LANGUAGE,
        lang: data
    }
}

export function setOpenSnackbar(data) {
    return {
        type: SET_OPEN_SNACKBAR,
        data: data
    }
}
export function setCloseSnackbar() {
    return {
        type: SET_CLOSE_SNACKBAR
    }
}

export function setOpenDialogConfirm(data) {
    return {
        type: SET_CONFIRM_DIALOG_OPEN,
        data: data
    }
}
export function setCancelDialogConfirm() {
    return {
        type: SET_CONFIRM_DIALOG_CANCEL
    }
}
export function setAcceptDialogConfirm() {
    return {
        type: SET_CONFIRM_DIALOG_ACCEPT
    }
}
export function setResetDialogConfirm() {
    return {
        type: SET_CONFIRM_DIALOG_RESET_ACCEPT
    }
}

export function setUserPending() {
    return {
        type: SET_USER_LOADING
    }
}
export function setUserData(data) {
    return {
        type: SET_USER_DATA,
        data: data
    }
}
export function resetUserData() {
    return {
        type: RESET_USER_DATA
    }
}

export function setTechnicsPending() {
    return {
        type: SET_TECHNICS_PENDING
    }
}
export function setTechnicsData(data) {
    return {
        type: SET_TECHNICS_DATA,
        data: data
    }
}
export function setTechnicsError() {
    return {
        type: SET_TECHNICS_ERROR
    }
}

export function setTagsPending() {
    return {
        type: SET_TAGS_PENDING
    }
}
export function setTagsData(data) {
    return {
        type: SET_TAGS_DATA,
        data: data
    }
}
export function setTagsError() {
    return {
        type: SET_TAGS_ERROR
    }
}

export function setUserPostsPending() {
    return {
        type: SET_USER_POSTS_PENDING
    }
}
export function setUserPostsData(data) {
    return {
        type: SET_USER_POSTS_DATA,
        data: data
    }
}
export function setUserPostsError() {
    return {
        type: SET_USER_POSTS_ERROR
    }
}

export function setAddPostPending() {
    return {
        type: SET_ADD_POST_PENDING
    }
}
export function setAddPostData(data) {
    return {
        type: SET_ADD_POST_DATA,
        data: data
    }
}
export function setAddPostError() {
    return {
        type: SET_ADD_POST_ERROR
    }
}

export function setUpdatePostPending() {
    return {
        type: SET_UPDATE_POST_PENDING
    }
}
export function setUpdatePostData(data) {
    return {
        type: SET_UPDATE_POST_DATA,
        data: data
    }
}
export function setUpdatePostError() {
    return {
        type: SET_UPDATE_POST_ERROR
    }
}

export function setDeletePostPending() {
    return {
        type: SET_DELETE_POST_PENDING
    }
}
export function setDeletePostData(data) {
    return {
        type: SET_DELETE_POST_DATA,
        data: data
    }
}
export function setDeletePostError() {
    return {
        type: SET_DELETE_POST_ERROR
    }
}

export function setPostCommentsPending() {
    return {
        type: SET_POST_COMMENTS_PENDING
    }
}
export function setPostCommentsData(data) {
    return {
        type: SET_POST_COMMENTS_DATA,
        data: data
    }
}
export function setPostCommentsError() {
    return {
        type: SET_POST_COMMENTS_ERROR
    }
}
export function clearPostComments() {
    return {
        type: CLEAR_POST_COMMENTS
    }
}

export function setAddPostCommentsPending() {
    return {
        type: SET_ADD_POST_COMMENT_PENDING
    }
}
export function setAddPostCommentsData(data) {
    return {
        type: SET_ADD_POST_COMMENT_DATA,
        data: data
    }
}
export function setAddPostCommentsError() {
    return {
        type: SET_ADD_POST_COMMENT_ERROR
    }
}

export function setUpdatePostCommentsPending() {
    return {
        type: SET_UPDATE_POST_COMMENT_PENDING
    }
}
export function setUpdatePostCommentsData(data) {
    return {
        type: SET_UPDATE_POST_COMMENT_DATA,
        data: data
    }
}
export function setUpdatePostCommentsError() {
    return {
        type: SET_UPDATE_POST_COMMENT_ERROR
    }
}

export function setSearchIconPending() {
    return {
        type: SET_SEARCH_ICON_PENDING
    }
}
export function setSearchIconData(data) {
    return {
        type: SET_SEARCH_ICON_DATA,
        data: data
    }
}
export function setSearchIconError() {
    return {
        type: SET_SEARCH_ICON_ERROR
    }
}

export function setAddLocationPending() {
    return {
        type: SET_ADD_LOCATION_PENDING
    }
}
export function setAddLocationData(data) {
    return {
        type: SET_ADD_LOCATION_DATA,
        data: data
    }
}
export function setAddLocationError() {
    return {
        type: SET_ADD_LOCATION_ERROR
    }
}

export function setSTTPending() {
    return {
        type: SET_STT_PENDING
    }
}
export function setSTTData(data) {
    return {
        type: SET_STT_DATA,
        data: data
    }
}
export function resetSTTData() {
    return {
        type: RESET_STT_DATA
    }
}
export function setSTTError() {
    return {
        type: SET_STT_ERROR
    }
}