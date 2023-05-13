import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = { light: "gray.800", dark: "gray.200" };
  const icon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;

  return (
    <IconButton
      aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
      variant="ghost"
      color={iconColor[colorMode]}
      fontSize="lg"
      onClick={toggleColorMode}
      icon={icon}
    />
  );
};

export default ToggleColorMode;