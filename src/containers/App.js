import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CustomThemeProvider from "../components/CustomThemeProvider";
import Roots from "./Roots";

const styles = {
    container: {
        display: 'flex'
    }
};
class App extends PureComponent {
    render() {
        const { children } = this.props;

        return (
            <div>{children}</div>
            // <CustomThemeProvider>
            //     <Roots>{children}</Roots>
            // </CustomThemeProvider>
        );
    }
}

// App = withStyles(styles)(App);

export default App;