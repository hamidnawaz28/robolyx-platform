import React from 'react';
import { Paper, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { theme, useStyle } from './styles';
import maTheme from '../../theme/index';
export default function MaterialLayout(props) {
	const { children } = props;
	const classes = useStyle();

	return (
		<ThemeProvider theme={maTheme[theme.currentTheme]}>
			<CssBaseline />

			<div className={classes.root}>
				<Paper className={classes.paper}>{children}</Paper>
			</div>
		</ThemeProvider>
	);
}
