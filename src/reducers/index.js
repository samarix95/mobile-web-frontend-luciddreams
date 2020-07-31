import { combineReducers } from "redux";

import { appThemeReducer } from "./appThemeReducer";
import { languageReducer } from "./languageReducer";
import { snackbarReducer } from "./snackbarReducer";
import { dialogConfirmReducer } from "./dialogConfirmReducer";
import { authDataReducer } from "./authReducer";
import { technicsReducer } from "./technicsReducer";
import { tagsReducer } from "./tagsReducer";
import { userPostsReducer } from "./userPostsReducer";
import { addPostReducer } from "./addPostReducer";
import { updatePostReducer } from "./updatePostReducer";
import { deletePostReducer } from "./deletePostReducer";
import { postCommentsReducer } from "./postCommentsReducer";
import { addPostCommentReducer } from "./addPostCommentReducer";
import { updatePostCommentReducer } from "./updatePostCommentReducer";
import { searchIconReducer } from "./searchIconReducer";
import { addLocationReducer } from "./addLocationReducer";
import { speechToTextReducer } from "./speechToTextReducer";

export const rootReducer = combineReducers({
    appTheme: appThemeReducer,
    language: languageReducer,
    snackbar: snackbarReducer,
    dialogConfirm: dialogConfirmReducer,
    authData: authDataReducer,
    technics: technicsReducer,
    tags: tagsReducer,
    userPosts: userPostsReducer,
    addPost: addPostReducer,
    updatePost: updatePostReducer,
    deletePost: deletePostReducer,
    postComments: postCommentsReducer,
    addPostComment: addPostCommentReducer,
    updatePostComment: updatePostCommentReducer,
    searchIcon: searchIconReducer,
    addLocation: addLocationReducer,
    speechToText: speechToTextReducer
});