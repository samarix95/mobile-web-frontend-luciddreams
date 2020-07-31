import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import history from "../../history";
import historyPath from "../../historyPath";
import Styles from "../../styles";
import dict from "../../dictionary";

import { getLanguage } from "../../reducers/languageReducer";
import { getTechnicsData } from "../../reducers/technicsReducer";
import { getThemePalette } from "../../reducers/appThemeReducer";

function CardTechnic(props) {
    const { language, technicsData, card_id } = props;
    const classes = Styles();

    const handleReadTechnic = () => {
        history.push({
            pathname: historyPath.ReadTechnic,
            defaultData: {
                id: card_id
            }
        });
    };

    return (
        <Grid item xs={12} sm={4} md={3} style={{ display: "flex" }}>
            <Card className={`${classes.margin1} ${classes.flexSpaceBetween} ${classes.transprent03}`} style={{ width: "100%" }} >
                <CardContent className={`${classes.flexSpaceBetween}`} style={{ height: "100%" }} >
                    <Typography variant="h6" paragraph>
                        {technicsData.find(item => (item.id === card_id))[`name_${language}`]}
                    </Typography>
                    <Typography variant="subtitle1" noWrap={true}>
                        {technicsData.find(item => (item.id === card_id))[`description_${language}`]}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="outlined" color="primary" onClick={handleReadTechnic}>
                        {dict[language].buttons.Read}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

CardTechnic.propTypes = {
    language: PropTypes.string.isRequired,
    technicsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

const mapStateToProps = store => {
    return {
        appTheme: getThemePalette(store),
        language: getLanguage(store),
        technicsData: getTechnicsData(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardTechnic);