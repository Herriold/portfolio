import React, { PureComponent } from 'react';
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import cyan from "@material-ui/core/colors/cyan";

//-------------------------------//
//-------------- JSS ------------//
//-------------------------------//
// code taken from https://material-ui-next.com/guides/right-to-left/
const jss = create(preset());

// very important for react-await-dialog
const generateClassName = createGenerateClassName();

//-------------------------------------------------------------------//
//--------------------------- contentLayout -------------------------//
//-------------------------------------------------------------------//
const theme = createMuiTheme({
	palette: {
		primary: cyan,
		type: 'light'
	},
    typography: {
        useNextVariants: true,
    },
});

export default class CustomThemeProvider extends PureComponent {
	render() {
		return (
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<JssProvider jss={jss} generateClassName={generateClassName}>
					<MuiThemeProvider theme={theme}>{ this.props.children }</MuiThemeProvider>
				</JssProvider>
			</MuiPickersUtilsProvider>
		);
	}
}
