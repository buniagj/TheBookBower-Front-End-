import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        color: props.colorMode === 'light' ? '#2B2B2B' : 'white',
        bg: props.colorMode === 'light' ? '#F9F9F9' : '#171717',
      },
    }),
  },
  fonts: {
    body: 'Open Sans',
    heading: 'Poppins',
  },
});

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  colors: {
    light: {
      text: "#2B2B2B",
      background: "#F9F9F9",
      primary: "#7D3C98",
      navbarBackground: "#FFFFFF",
      navbarText: "#7D3C98",
      footerBackground: "#F9F9F9",
      footerText: "#2B2B2B",
    },
    dark: {
      ...customTheme.colors.dark, // using customTheme for dark mode
      text: "#F9F9F9",
      background: "#171717",
      primary: "#7D3C98",
      navbarBackground: "#171717",
      navbarText: "#F9F9F9",
      footerBackground: "#2B2B2B",
      footerText: "#F9F9F9",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Open Sans",
  },
  styles: {
    global: {
      "html, body": {
        fontFamily: "body",
        fontSize: "md",
        color: "text",
        bg: "background",
        lineHeight: "tall",
      },
      a: {
        color: "primary",
        _hover: {
          textDecoration: "none",
          color: "purple.600",
        },
      },
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "purple.600",
          color: "white",
          _hover: {
            bg: "purple.700",
          },
        },
      },
    },
    Navbar: {
      baseStyle: {
        bg: "navbarBackground",
        color: "navbarText",
        boxShadow: "md",
      },
    },
    Footer: {
      baseStyle: {
        bg: "footerBackground",
        color: "footerText",
        boxShadow: "md",
      },
    },
  },
}

const theme = extendTheme(config)

export default theme
