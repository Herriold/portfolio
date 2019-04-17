import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

const styles = {

};

class MenuIconAndText extends PureComponent {
    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        isVisible: PropTypes.bool,
        button: PropTypes.bool,
        icon: PropTypes.func.isRequired
    };

    _onClick = () => {
        const { onClick } = this.props;
        onClick && onClick();
    };

    render() {
        const {label, icon: MenuIcon, isVisible = true, button = true, upper = false} = this.props;
        if (!isVisible) return null;


        const menuContent = (
            <Fragment>
                <ListItemIcon>
                    <MenuIcon/>
                </ListItemIcon>
                <ListItemText primary={upper ? label.toUpperCase() : label}/>
            </Fragment>
        );

        return (
            <ListItem button={button} onClick={this._onClick}>
                {menuContent}
            </ListItem>
        );
    }
}

MenuIconAndText = withStyles(styles)(MenuIconAndText);

export default MenuIconAndText