import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ToggleButton from "@material-ui/lab/ToggleButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";

import Skeleton from "@material-ui/lab/Skeleton";

import FilterListIcon from "@material-ui/icons/FilterList";
import SortIcon from "@material-ui/icons/Sort";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from '@material-ui/icons/Add';

import history from "../history";
import historyPath from "../historyPath";
import Styles from "../styles";
import dict from "../dictionary";

import { fetchUserPosts } from "../functions/fetch";
import { getLanguage } from "../reducers/languageReducer";
import { getAuthData } from "../reducers/authReducer";
import { getUserPostsPending, getUserPostsData } from "../reducers/userPostsReducer";

import CardDream from "./multiple/CardDream";
import StyledBreadcrumb from "./StyledBreadcrumb";

const defaultSettings = {
    isInc: false,
    sortBy: "date",
    haveLucid: true,
    haveRegular: true
};

function Dreams(props) {
    const { language, authData, fetchUserPosts, userPostsPending, userPostsData } = props;
    const classes = Styles();
    const [isFabVisible, setIsFabVisible] = React.useState(true);

    const [tempViewSettings, setTempViewSettings] = React.useState(defaultSettings);

    const [viewSettings, setViewSettings] = React.useState(defaultSettings);

    React.useEffect(() => {
        fetchUserPosts({ language: language, create_user: authData.id });
    }, [fetchUserPosts, language, authData]);

    const handleBack = () => {
        history.push(historyPath.MainPage);
    };

    const handleAddPost = () => {
        history.push(historyPath.AddDream);
    };

    const handleShowFab = () => {
        setIsFabVisible(true);
    };

    const handleHideFab = () => {
        setIsFabVisible(false);
    };

    const handleChangeSortBy = (event) => {
        setTempViewSettings(prevState => ({
            ...prevState,
            sortBy: event.target.value
        }));
    };

    const handleChangeIsInc = (event, newAlignment) => {
        setTempViewSettings(prevState => ({
            ...prevState,
            isInc: newAlignment
        }));
    };

    const handleChangeLucid = (event) => {
        setTempViewSettings(prevState => ({
            ...prevState,
            haveLucid: event.target.checked
        }));
    };

    const handleChangeRegular = (event) => {
        setTempViewSettings(prevState => ({
            ...prevState,
            haveRegular: event.target.checked
        }));
    };

    const hadleResetFilter = () => {
        setTempViewSettings(defaultSettings);
        setViewSettings(defaultSettings);
        setIsFabVisible(true);
    };

    const hadleAcceptFilter = () => {
        setViewSettings(tempViewSettings);
        setIsFabVisible(true);
    };

    return (
        <div className={classes.root}>
            <Dialog
                open={!isFabVisible}
                onClose={handleShowFab}
                aria-labelledby="filter-dialog-title"
                aria-describedby="filter-dialog-description"
            >
                <DialogTitle id="filter-dialog-title">
                    {dict[language].texts.Settings}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="stretch"
                    >
                        <Grid item>
                            <Typography paragraph align="center">
                                {dict[language].texts.Sort}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container
                                direction="row"
                                justify="space-around"
                                alignItems="center"
                                spacing={1}
                            >
                                <Grid item>
                                    <FormControl variant="outlined" size="small">
                                        <Select
                                            id="sort-by-select"
                                            labelId="sort-by-select-label"
                                            value={tempViewSettings.sortBy}
                                            onChange={handleChangeSortBy}
                                        >
                                            <MenuItem value={"date"}>{dict[language].texts.Date}</MenuItem>
                                            <MenuItem value={"title"}>{dict[language].texts.Title}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <ToggleButtonGroup size="small" value={tempViewSettings.isInc} exclusive onChange={handleChangeIsInc}>
                                        <ToggleButton key={1} value={true}>
                                            <SortIcon style={{ transform: "rotate(-180deg) scale(-1, 1)" }} />
                                        </ToggleButton>
                                        <ToggleButton key={2} value={false}>
                                            <SortIcon />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography paragraph />
                    <Divider />
                    <Typography paragraph />
                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="stretch"
                    >
                        <Grid item>
                            <Typography paragraph align="center">
                                {dict[language].texts.Filter}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="stretch"
                            >
                                <Grid item>
                                    <Grid container
                                        direction="row"
                                        justify="space-around"
                                        alignItems="center"
                                    >
                                        <Grid item xs={8}>
                                            <Typography align="left">
                                                {dict[language].texts.LucidDream}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Checkbox
                                                checked={tempViewSettings.haveLucid}
                                                onChange={handleChangeLucid}
                                                color="primary"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container
                                        direction="row"
                                        justify="space-around"
                                        alignItems="center"
                                    >
                                        <Grid item xs={8}>
                                            <Typography align="left">
                                                {dict[language].texts.RegularDream}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Checkbox
                                                checked={tempViewSettings.haveRegular}
                                                onChange={handleChangeRegular}
                                                color="primary"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleShowFab} size="small" color="primary" variant="outlined">
                        {dict[language].buttons.Close}
                    </Button>
                    <Button onClick={hadleResetFilter} size="small" color="primary" variant="outlined">
                        {dict[language].buttons.Reset}
                    </Button>
                    <Button onClick={hadleAcceptFilter} size="small" color="primary" variant="outlined">
                        {dict[language].buttons.Accept}
                    </Button>
                </DialogActions>
            </Dialog>
            <Paper className={`${classes.padding1} ${classes.stickyTop} ${classes.transprent02}`} >
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <StyledBreadcrumb component="a" color="primary" label={dict[language].buttons.Main} icon={<HomeIcon />} onClick={handleBack} />
                    <StyledBreadcrumb component="a" color="primary" disabled={true} label={dict[language].buttons.MyDreams} />
                </Breadcrumbs>
            </Paper>
            <Container className={`${classes.margin2}`}>
                <Grid container alignItems="stretch" justify="center" spacing={1}>
                    {userPostsData.length
                        ? userPostsData.filter(item => item.post_type === 0 ? viewSettings.haveRegular ? item : null : item)
                            .filter(item => item.post_type === 1 ? viewSettings.haveLucid ? item : null : item)
                            .sort(function (a, b) {
                                let valA;
                                let valB;
                                switch (viewSettings.sortBy) {
                                    case "date":
                                        valA = a.dream_date;
                                        valB = b.dream_date;
                                        break;
                                    case "title":
                                        valA = a.title.toUpperCase();
                                        valB = b.title.toUpperCase();
                                        break;
                                    default:
                                        break;
                                }

                                if (valA < valB) {
                                    if (viewSettings.isInc) return -1;
                                    return 1;
                                }
                                if (valA > valB) {
                                    if (viewSettings.isInc) return 1;
                                    return -1;
                                }
                                return 0;
                            })
                            .map((item, key) => <CardDream key={key} card_id={item.id} />)
                        : userPostsPending
                            ? <React.Fragment>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Skeleton animation="wave" variant="rect" className={`${classes.skeletonCard} ${classes.margin1}`} />
                                </Grid>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Skeleton animation="wave" variant="rect" className={`${classes.skeletonCard} ${classes.margin1}`} />
                                </Grid>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Skeleton animation="wave" variant="rect" className={`${classes.skeletonCard} ${classes.margin1}`} />
                                </Grid>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Skeleton animation="wave" variant="rect" className={`${classes.skeletonCard} ${classes.margin1}`} />
                                </Grid>
                            </React.Fragment>
                            : <React.Fragment />
                    }
                </Grid>
            </Container>
            <Zoom in={isFabVisible} unmountOnExit >
                <Fab aria-label="fab-filter"
                    className={`${classes.addPostFab}`}
                    color="primary"
                    onClick={handleAddPost}
                >
                    <AddIcon />
                </Fab>
            </Zoom>
            <Zoom in={isFabVisible} unmountOnExit >
                <Fab aria-label="fab-filter"
                    className={`${classes.filterFab}`}
                    color="primary"
                    onClick={handleHideFab}
                >
                    <FilterListIcon />
                </Fab>
            </Zoom>
        </div >
    );
}

Dreams.propTypes = {
    language: PropTypes.string.isRequired,
    authData: PropTypes.object.isRequired,
    userPostsPending: PropTypes.bool.isRequired,
    userPostsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    fetchUserPosts: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        language: getLanguage(store),
        authData: getAuthData(store),
        userPostsPending: getUserPostsPending(store),
        userPostsData: getUserPostsData(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchUserPosts: fetchUserPosts,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dreams);