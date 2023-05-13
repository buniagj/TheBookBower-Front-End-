import React, { useState, useEffect } from 'react';
import {
  useColorMode,
  ColorModeScript,
  Button,
  IconButton,
  Select,
  FormControl,
  FormLabel,
  ChakraProvider,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import '../../components/Theme';

const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        color: props.colorMode === 'light' ? 'black' : 'white',
        bg: props.colorMode === 'light' ? 'white' : 'gray.800',
      },
      "input[type=checkbox]:checked": {
         backgroundColor: 'purple',
      }
    }),
  },
  fonts: {
    body: 'Open Sans',
    heading: 'Open Sans',
  },
});

export default function Settings() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [emailPreferences, setEmailPreferences] = useState({
    newsletters: true,
    notifications: true,
    marketing: false,
  });
  const [fontSize, setFontSize] = useState('md');
  const [fontType, setFontType] = useState('Open Sans');

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    activityVisibility: 'friends',
    personalInfoVisibility: 'friends',
  });
  const [securitySettings, setSecuritySettings] = useState({
    password: '',
    twoFactorAuth: false,
  });
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    screenReader: false,
    highContrastMode: false,
    closedCaptioning: false,
  });

  useEffect(() => {
    localStorage.setItem('theme', colorMode);
  }, [colorMode]);

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleFontTypeChange = (e) => {
    setFontType(e.target.value);
  };

  const handleEmailPreferencesChange = (e) => {
    const { name } = e.target;
    const checked = e.target.checked;
    setEmailPreferences((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handlePrivacySettingsChange = (e) => {
    const { name, value } = e.target;
    setPrivacySettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSecuritySettingsChange = (e) => {
    const { name, value } = e.target;
    setSecuritySettings((prevState) => ({
      ...prevState,
      [name]: name === 'twoFactorAuth' ? e.target.checked : value,
    }));
  };

  const handleAccessibilitySettingsChange = (e) => {
    const { name, checked } = e.target;
    setAccessibilitySettings((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div className="light-theme">
      <ChakraProvider theme={customTheme}>
        <ColorModeScript initialColorMode={colorMode} />
        <div className="settings-container">
          <div className="settings-card">
            <h1 className="settings-title">Settings</h1>
            <div className="columns-container">
              <div className="column">
                <div>
                  <label htmlFor="theme">Theme:</label>
                  <IconButton
                    className="toggle-btn"
                    icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                    aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    onClick={toggleColorMode}
                  />
                </div>
                <br />
                <FormControl id="fontSize" className="setting">
                  <FormLabel>Font Size</FormLabel>
                  <Select value={fontSize} onChange={handleFontSizeChange}>
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                  </Select>
                </FormControl>
                <br />
                <FormControl id="fontType" className="setting">
                  <FormLabel>Font Type</FormLabel>
                  <Select value={fontType} onChange={handleFontTypeChange}>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Lato">Lato</option>
                  </Select>
                </FormControl>
                <br />
                <div className="email-preferences setting">
                  <h3>Email Preferences</h3>
                  <div>
                    <input type="checkbox" name="newsletters" checked={emailPreferences.newsletters} onChange={handleEmailPreferencesChange} />
                    <label htmlFor="newsletters">Receive newsletters</label>
                  </div>
                  <div>
                    <input type="checkbox" name="notifications" checked={emailPreferences.notifications} onChange={handleEmailPreferencesChange} />
                    <span class="checkmark"></span>
                    <label htmlFor="notifications">Receive notifications</label>
                  </div>
                  <div>
                    <input type="checkbox" name="marketing" checked={emailPreferences.marketing} onChange={handleEmailPreferencesChange} />
                    <span class="checkmark"></span>
                    <label htmlFor="marketing">Receive marketing emails</label>
                  </div>
                </div>
                <br />
                <div className="security-settings setting">
                  <h3>Security Settings</h3>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <input type="password" name="password" value={securitySettings.password} onChange={handleSecuritySettingsChange} />
                  </FormControl>
                  <FormControl id="twoFactorAuth">
                    <FormLabel>Two-factor authentication</FormLabel>
                    <input type="checkbox" name="twoFactorAuth" checked={securitySettings.twoFactorAuth} onChange={handleSecuritySettingsChange} />
                    <span class="checkmark"></span>
                  </FormControl>
                </div>
              </div>
              <div className="column">
                <div className="privacy-settings setting">
                  <h3>Privacy Settings</h3>
                  <FormControl id="profileVisibility">
                    <FormLabel>Profile Visibility</FormLabel>
                    <Select name="profileVisibility" value={privacySettings.profileVisibility} onChange={handlePrivacySettingsChange}>
                      <option value="public">Public</option>
                      <option value="friends">Friends</option>
                      <option value="private">Private</option>
                    </Select>
                  </FormControl>
                
                 
                  <FormControl id="activityVisibility">
                    <FormLabel>Activity Visibility</FormLabel>
                    <Select name="activityVisibility" value={privacySettings.activityVisibility} onChange={handlePrivacySettingsChange}>
                      <option value="public">Public</option>
                      <option value="friends">Friends</option>
                      <option value="onlyMe">Only Me</option>
                    </Select>
                  </FormControl>
                  <FormControl id="personalInfoVisibility">
                    <FormLabel>Personal Info Visibility</FormLabel>
                    <Select name="personalInfoVisibility" value={privacySettings.personalInfoVisibility} onChange={handlePrivacySettingsChange}>
                      <option value="public">Public</option>
                      <option value="friends">Friends</option>
                      <option value="onlyMe">Only Me</option>
                    </Select>
                  </FormControl>
                  <br />
                </div>
                <div className="accessibility-settings setting">
                  <h3>Accessibility Settings</h3>
                  <div>
                    <input type="checkbox" name="screenReader" checked={accessibilitySettings.screenReader} onChange={handleAccessibilitySettingsChange} />
                    <span class="checkmark"></span>
                    <label htmlFor="screenReader">Screen reader</label>
                  </div>
                  <div>
                    <input type="checkbox" name="highContrastMode" checked={accessibilitySettings.highContrastMode} onChange={handleAccessibilitySettingsChange} />
                    <span class="checkmark"></span>
                    <label htmlFor="highContrastMode">High contrast mode</label>
                  </div>
                  <div>
                    <input type="checkbox" class="custom-checkbox" name="closedCaptioning" checked={accessibilitySettings.closedCaptioning} onChange={handleAccessibilitySettingsChange} />
                    <span class="checkmark"></span>
                    <label htmlFor="closedCaptioning">Closed captioning</label>
                  </div>
                   <br /> <br />
                </div>
                <Button className="settings-save-btn" colorScheme="teal" size="md">
                  Save Changes
                </Button>
              </div>
            </div>

          </div>
        </div>
      </ChakraProvider>
    </div>
  );
}

