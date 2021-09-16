const palette = {
	blue: '#376CB3',
	green: '#0ECD9D',
	red: '#CD0E61',
	black: '#121212',
	white: '#F0F2F3',
}

export const lightTheme = {
	colors: {
		background: palette.white,
		foreground: palette.black,
		primary: palette.blue,
		success: palette.green,
		danger: palette.red,
		failure: palette.red,
	},
	spacing: {
		s: 8,
		m: 16,
		l: 24,
		xl: 40,
	},
	textVariants: {
		header: {
			fontFamily: 'PacificoRegular',
			fontSize: 36,
		},
		body: {
			// fontFamily: 'Merriweather',
			fontSize: 16,
		},
	}
};

export const darkTheme = {
	...lightTheme,
	colors: {
		...lightTheme.colors,
		background: palette.black,
		foreground: palette.white,
	}
}