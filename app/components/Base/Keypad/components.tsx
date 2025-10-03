import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewProps, TouchableOpacityProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Device from '../../../util/device';
import Text from '../Text';
import { useTheme } from '../../../util/theme';
import { Theme } from '@metamask/design-tokens';

const createStyles = (colors: Theme['colors']) =>
  StyleSheet.create({
    keypad: {
      paddingHorizontal: 25,
    },
    keypadRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    keypadButton: {
      paddingHorizontal: 20,
      paddingVertical: Device.isMediumDevice()
        ? Device.isIphone5()
          ? 4
          : 8
        : 12,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    keypadButtonText: {
      color: colors.text.default,
      textAlign: 'center',
      fontSize: 30,
    },
    deleteIcon: {
      fontSize: 25,
      marginTop: 5,
    },
  });

interface KeypadContainerProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

interface KeypadButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

interface KeypadDeleteButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
}

const KeypadContainer: React.FC<KeypadContainerProps> = ({ style, ...props }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return <View style={[styles.keypad, style]} {...props} />;
};

const KeypadRow: React.FC<ViewProps> = (props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return <View style={styles.keypadRow} {...props} />;
};

const KeypadButton: React.FC<KeypadButtonProps> = ({ style, textStyle, children, ...props }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity style={[styles.keypadButton, style]} {...props}>
      <Text style={[styles.keypadButtonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const KeypadDeleteButton: React.FC<KeypadDeleteButtonProps> = ({ style, icon, ...props }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity style={[styles.keypadButton, style]} {...props}>
      {icon || (
        <IonicIcon
          style={[styles.keypadButtonText, styles.deleteIcon]}
          name="arrow-back"
        />
      )}
    </TouchableOpacity>
  );
};

const Keypad = KeypadContainer as React.FC<KeypadContainerProps> & {
  Row: typeof KeypadRow;
  Button: typeof KeypadButton;
  DeleteButton: typeof KeypadDeleteButton;
};

Keypad.Row = KeypadRow;
Keypad.Button = KeypadButton;
Keypad.DeleteButton = KeypadDeleteButton;

export default Keypad;
