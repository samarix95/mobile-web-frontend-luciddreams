import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./App.css";

import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Alert from "@material-ui/lab/Alert";

import history from "./history";
import historyPath from "./historyPath"
import PrivateRoute from "./PrivateRoute";
import dict from "./dictionary";

import { checkToken } from "./functions/auth";
import { setLanguage, setCloseSnackbar, setCancelDialogConfirm, setAcceptDialogConfirm } from "./actions/actions";
import { getSnackbarOpen, getSnackbarData } from "./reducers/snackbarReducer";
import { getDialogConfirmOpen, getDialogConfirmData } from "./reducers/dialogConfirmReducer";
import { getThemePalette } from "./reducers/appThemeReducer";
import { getLanguage } from "./reducers/languageReducer";

const signPromise = import("./components/Sign");
const Sign = React.lazy(() => signPromise);
const signinPromise = import("./components/SignIn");
const SignIn = React.lazy(() => signinPromise);
const signupPromise = import("./components/SignUp");
const SignUp = React.lazy(() => signupPromise);

const mainPagePromise = import("./components/MainPage");
const MainPage = React.lazy(() => mainPagePromise);

const dreamsPromise = import("./components/Dreams");
const Dreams = React.lazy(() => dreamsPromise);
const ReadDreamPromise = import("./components/readPages/ReadDream");
const ReadDream = React.lazy(() => ReadDreamPromise);
const addDreamPromise = import("./components/addPages/AddDream");
const AddDream = React.lazy(() => addDreamPromise);
const editDreamPromise = import("./components/editPages/EditDream");
const EditDream = React.lazy(() => editDreamPromise);

const addLocationPromise = import("./components/addPages/AddLocation");
const AddLocation = React.lazy(() => addLocationPromise);

const technicsPromise = import("./components/Technics");
const Technics = React.lazy(() => technicsPromise);
const readTechnicPromise = import("./components/readPages/ReadTechnic");
const ReadTechnic = React.lazy(() => readTechnicPromise);
const editTechnicPromise = import("./components/editPages/EditTechnics");
const EditTechnic = React.lazy(() => editTechnicPromise);

const userLang = (navigator.language || navigator.userLanguage).substr(0, 2).toLowerCase();
history.push(checkToken() ? historyPath.MainPage : historyPath.Sign);

function MuiAlert(props) {
	return (
		<Alert elevation={6} variant="filled" {...props} />
	)
}

function App(props) {
	const { appTheme, language, snackbarOpen, snackbarData, setLanguage, closeSnackbar, dialogConfirmOpen, dialogConfirmData, cancelDialogConfirm, acceptDialogConfirm } = props;
	const muitheme = createMuiTheme(appTheme);
	Object.assign(muitheme, {
		overrides: {
			MUIRichTextEditor: {
				toolbar: {
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}
			}
		}
	});

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		closeSnackbar();
	};

	const hadleCancelConfirmDialog = () => {
		cancelDialogConfirm()
	};

	const hadleAcceptConfirmDialog = () => {
		acceptDialogConfirm()
	};

	setLanguage(userLang);

	return (
		<Router history={history}>
			<MuiThemeProvider theme={muitheme}>
				<CssBaseline />
				<React.Suspense
					fallback={
						<div>
							{dict[language].texts.Loading}
						</div>
					}
				>
					<Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
						<MuiAlert onClose={handleCloseSnackbar} severity={snackbarData.variant}>
							{snackbarData.message}
						</MuiAlert>
					</Snackbar>
					<Dialog
						open={dialogConfirmOpen}
						onClose={hadleCancelConfirmDialog}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{dialogConfirmData.title}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								{dialogConfirmData.message}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={hadleCancelConfirmDialog} size="small" color="primary" variant="outlined">
								{dict[language].buttons.Cancel}
							</Button>
							<Button onClick={hadleAcceptConfirmDialog} size="small" color="primary" variant="outlined">
								{dict[language].buttons.Accept}
							</Button>
						</DialogActions>
					</Dialog>
					<Route exact path={historyPath.Sign} component={Sign} />
					<Route path={historyPath.SignIn} component={SignIn} />
					<Route path={historyPath.SignUp} component={SignUp} />
					<Switch>
						<PrivateRoute exact path={historyPath.MainPage} component={MainPage} />
						{/* <PrivateRoute exact path={historyPath.MainPage} component={Dreams} /> */}

						<PrivateRoute exact path={historyPath.Dreams} component={Dreams} />
						<PrivateRoute path={historyPath.ReadDream} component={ReadDream} />
						<PrivateRoute path={historyPath.AddDream} component={AddDream} />
						<PrivateRoute path={historyPath.EditDream} component={EditDream} />

						<PrivateRoute path={historyPath.AddLocation} component={AddLocation} />

						<PrivateRoute exact path={historyPath.Technics} component={Technics} />
						<PrivateRoute path={historyPath.ReadTechnic} component={ReadTechnic} />
						<PrivateRoute path={historyPath.EditTechnic} component={EditTechnic} />
					</Switch>
				</React.Suspense>
			</MuiThemeProvider>
		</Router>
	);
}

App.propTypes = {
	appTheme: PropTypes.object.isRequired,
	language: PropTypes.string.isRequired,
	snackbarOpen: PropTypes.bool.isRequired,
	snackbarData: PropTypes.object.isRequired,
	dialogConfirmOpen: PropTypes.bool.isRequired,
	dialogConfirmData: PropTypes.object.isRequired,
	setLanguage: PropTypes.func.isRequired,
	closeSnackbar: PropTypes.func.isRequired,
	cancelDialogConfirm: PropTypes.func.isRequired,
	acceptDialogConfirm: PropTypes.func.isRequired
}

const mapStateToProps = store => {
	return {
		appTheme: getThemePalette(store),
		language: getLanguage(store),
		snackbarOpen: getSnackbarOpen(store),
		snackbarData: getSnackbarData(store),
		dialogConfirmOpen: getDialogConfirmOpen(store),
		dialogConfirmData: getDialogConfirmData(store)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	setLanguage: setLanguage,
	closeSnackbar: setCloseSnackbar,
	cancelDialogConfirm: setCancelDialogConfirm,
	acceptDialogConfirm: setAcceptDialogConfirm
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);