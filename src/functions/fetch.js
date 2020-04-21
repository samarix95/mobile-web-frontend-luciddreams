import {
    setOpenSnackbar,
    setUserPending, setUserData, resetUserData,
    setTechnicsPending, setTechnicsData, setTechnicsError,
    setTagsPending, setTagsData, setTagsError,
    setUserPostsPending, setUserPostsData, setUserPostsError,
    setAddPostPending, setAddPostData, setAddPostError,
    setUpdatePostPending, setUpdatePostData, setUpdatePostError,
    setDeletePostPending, setDeletePostData, setDeletePostError,
    setPostCommentsPending, setPostCommentsData, setPostCommentsError,
    setAddPostCommentsPending, setAddPostCommentsData, setAddPostCommentsError,
    setUpdatePostCommentsPending, setUpdatePostCommentsData, setUpdatePostCommentsError,
    setSearchIconPending, setSearchIconData, setSearchIconError,
    setAddLocationPending, setAddLocationData, setAddLocationError
} from "../actions/actions";
import { setToken } from "../functions/auth";
import history from "../history";
import historyPath from "../historyPath";
import dict from "../dictionary";

const path = "http://192.168.1.32:8080";
//const path = "https://ldserver.herokuapp.com";

export const userSignIn = (data) => {
    return dispatch => {
        dispatch(setUserPending());
        return fetch(path + "/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                const decode = setToken(result.token);
                dispatch(setUserData(decode));
                dispatch(setOpenSnackbar({ variant: "success", message: dict[data.language].texts.Wellcome }));
                history.push(historyPath.MainPage);
            })
            .catch(error => {
                dispatch(resetUserData());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}

export const userSignUp = (data) => {
    return dispatch => {
        dispatch(setUserPending());
        return fetch(path + "/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                const decode = setToken(result.token);
                dispatch(setUserData(decode));
                dispatch(setOpenSnackbar({ variant: "success", message: dict[data.language].texts.Wellcome }));
                history.push(historyPath.MainPage);
            })
            .catch(error => {
                dispatch(resetUserData());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}

export const fetchTechnics = () => {
    return dispatch => {
        dispatch(setTechnicsPending());
        return fetch(path + "/api/technic/published", {
            method: "GET",
            headers: ({
                Accept: "application/json",
                "Content-Type": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify()
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                dispatch(setTechnicsData(result));
            })
            .catch(error => {
                dispatch(setTechnicsError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: err.error }));
                });
            });
    }
}

export const fetchTags = () => {
    return dispatch => {
        dispatch(setTagsPending());
        return fetch(path + "/api/tag", {
            method: "GET",
            headers: ({
                Accept: "application/json",
                "Content-Type": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify()
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                dispatch(setTagsData(result));
            })
            .catch(error => {
                dispatch(setTagsError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: err.error }));
                });
            });
    }
}

export const fetchUpdateTechnics = (data) => {
    return dispatch => {
        dispatch(setTechnicsPending());
        return fetch(`${path}/api/technic/${data.id}`, {
            method: "PUT",
            headers: ({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify(data.data)
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                dispatch(setOpenSnackbar({ variant: "success", message: result.result }));
                dispatch(fetchTechnics());
                history.push({
                    pathname: historyPath.ReadTechnic,
                    defaultData: {
                        id: data.id
                    }
                });
            })
            .catch(error => {
                dispatch(setTechnicsError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}

export const fetchUserPosts = (data) => {
    return dispatch => {
        dispatch(setUserPostsPending());
        return fetch(`${path}/api/post/user/${data.create_user}`, {
            method: "GET",
            headers: ({
                Accept: "application/json",
                "Content-Type": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify()
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                dispatch(setUserPostsData(result));
            })
            .catch(error => {
                dispatch(setUserPostsError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}

export const fetchAddPost = (data) => {
    return dispatch => {
        dispatch(setAddPostPending());
        return fetch(`${path}/api/post`, {
            method: "POST",
            headers: ({
                Accept: "application/json",
                "Content-Type": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                dispatch(setAddPostData(result));
                history.push(historyPath.Dreams);
            })
            .catch(error => {
                dispatch(setAddPostError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}

export const fetchUpdatePost = (data) => {
    return dispatch => {
        dispatch(setUpdatePostPending());
        return fetch(`${path}/api/post/${data.id}`, {
            method: "PUT",
            headers: ({
                Accept: "application/json",
                "Content-Type": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                dispatch(setUpdatePostData(result));
                dispatch(fetchUserPosts({ language: data.language, create_user: data.create_user }));
                history.push({
                    pathname: historyPath.ReadDream,
                    defaultData: {
                        id: data.id
                    }
                });
            })
            .catch(error => {
                dispatch(setUpdatePostError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}

export const fetchDeletePost = (data) => {
    return dispatch => {
        dispatch(setDeletePostPending());
        return fetch(`${path}/api/post/${data.id}`, {
            method: "DELETE",
            headers: ({
                Accept: "application/json",
                "Content-Type": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify()
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                dispatch(setDeletePostData(result));
                dispatch(fetchUserPosts({ language: data.language, create_user: data.create_user }));
                history.push(historyPath.Dreams);
            })
            .catch(error => {
                dispatch(setDeletePostError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}

export const fetchPostComments = (data) => {
    return dispatch => {
        dispatch(setPostCommentsPending());
        return fetch(`${path}/api/comment/${data.post_id}`, {
            method: "GET",
            headers: ({
                Accept: "application/json",
                "Content-Type": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify()
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                dispatch(setPostCommentsData(result));
            })
            .catch(error => {
                dispatch(setPostCommentsError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}

export const fetchAddPostComment = (data) => {
    return dispatch => {
        dispatch(setAddPostCommentsPending());
        return fetch(`${path}/api/comment`, {
            method: "POST",
            headers: ({
                Accept: "application/json",
                "Content-Type": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                dispatch(setAddPostCommentsData(result));
                dispatch(fetchPostComments({ language: data.language, post_id: data.post_id }));
            })
            .catch(error => {
                dispatch(setAddPostCommentsError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}

export const fetchUpdatePostComment = (data) => {
    return dispatch => {
        dispatch(setUpdatePostCommentsPending());
        return fetch(`${path}/api/comment/${data.id}`, {
            method: "PUT",
            headers: ({
                Accept: "application/json",
                "Content-Type": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                dispatch(setUpdatePostCommentsData(result));
                dispatch(fetchPostComments({ language: data.language, post_id: data.post_id }));
            })
            .catch(error => {
                dispatch(setUpdatePostCommentsError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}

export const fetchSearchIcon = (data) => {
    return dispatch => {
        dispatch(setSearchIconPending());
        return fetch(`${path}/geticons`, {
            method: "POST",
            headers: ({
                Accept: "application/json",
                "Content-Type": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                if (result.length > 0) dispatch(setSearchIconData(result));
                else {
                    dispatch(setOpenSnackbar({ variant: "info", message: dict[data.language].texts[`FindIcon${Math.floor(Math.random() * 5)}`] }));
                    dispatch(fetchSearchIcon(data));
                }
            })
            .catch(error => {
                dispatch(setSearchIconError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}

export const fetchAddLocation = (data) => {
    return dispatch => {
        dispatch(setAddLocationPending());
        return fetch(`${path}/api/tag`, {
            method: "POST",
            headers: ({
                Accept: "application/json",
                "Content-Type": "application/json",
                "token": localStorage.token
            }),
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) return Promise.reject(response);
                else return Promise.resolve(response.json());
            })
            .then(result => {
                dispatch(setAddLocationData(result));
                history.push(data.backPath);
            })
            .catch(error => {
                dispatch(setAddLocationError());
                error.json().then(err => {
                    dispatch(setOpenSnackbar({ variant: "error", message: dict[data.language].errors[err.error] }));
                });
            });
    }
}