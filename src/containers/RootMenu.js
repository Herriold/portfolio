import React, { PureComponent, Fragment} from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import FormationIcon from '@material-ui/icons/Videocam';
import MesActions from '@material-ui/icons/SwapHoriz'
import User from '@material-ui/icons/Face';
import MesConnections from "@material-ui/icons/PermContactCalendar"
import MenuIconAndText from "../components/MenuIconAndText";
import showChat from "../actions/chats/chat"


const styles = {
    listSubheader: {
        textAlign: "center"
    }
};

class RootMenu extends PureComponent {

    render() {
        const { classes, isVisible, open, showChat} = this.props;

        if (!isVisible) {
            return null;
        }
        return (
            <Fragment>
                <Divider/>
                {/* <List>
                    <div>
                        <MenuIconAndText label="User here" upper icon={User}/>
                    </div>
                </List>
                <Divider/> */}
                <List>
                    <div>
                        <MenuIconAndText label="DETAILS" icon={MesActions}/>
                        <MenuIconAndText label="FORMATION" icon={FormationIcon} onClick={showChat}/>
                        <MenuIconAndText label="DEVIS" icon={MesActions}/>
                        <MenuIconAndText label="CONTACT" icon={MesConnections} />
                    </div>
                </List>
                <Divider/>
            </Fragment>
        );
    }
}

// RootMenu = withStyles(styles)(RootMenu);
// export default RootMenu;


RootMenu = withStyles(styles)(RootMenu);
export default connect(state => {
    return {
        
    }
}, {
    showChat
})(RootMenu);
