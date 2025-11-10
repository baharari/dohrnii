import React from 'react';
import { View } from 'react-native';
import Text from '../Text/Text';
import { useTheme } from '../../providers';
import { RadioGroupPropTypes, RadioGroupDefaultProps } from './types';
import createStyles from './styles';

const Group = (props) => {
  const { theme: themeMode } = useTheme();
  const mergedProps = { ...RadioGroupDefaultProps, ...props };

  const {
    label,
    description,
    icon,
    theme,
    size,
    variant,
    disabled,
    borderRadius,
    value,
    onChange,
    children,
    style,
    labelStyle,
    descriptionStyle,
    ...rest
  } = mergedProps;

  const styles = createStyles(themeMode);

  // Grup seviyesinde header
  const renderHeader = () => {
    if (!label && !description) return null;
    return (
      <View style={styles.groupHeader}>
        {label ? <Text fontFamily="heading" style={labelStyle}>{label}</Text> : null}
        {description ? <Text style={[styles.groupDescription, descriptionStyle]}>{description}</Text> : null}
      </View>
    );
  };

  // Çocuk Radio bileşenlerine grup propslarını uygula (override etmeyenlere)
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      const childProps = child.props || {};
      const mergedChildProps = {
        // Checked kontrolü: grup değeri ile eşleşen Radio seçili olur
        checked: childProps.checked !== undefined ? childProps.checked : childProps.value === value,
        // Stil propsları: çocukta yoksa gruptan al
        theme: childProps.theme !== undefined ? childProps.theme : theme,
        size: childProps.size !== undefined ? childProps.size : size,
        variant: childProps.variant !== undefined ? childProps.variant : variant,
        disabled: childProps.disabled !== undefined ? childProps.disabled : disabled,
        borderRadius: childProps.borderRadius !== undefined ? childProps.borderRadius : borderRadius,
        icon: childProps.icon !== undefined ? childProps.icon : icon,
        // onChange: önce child.onChange, sonra grup onChange(child.value)
        onChange: (checkedTrue) => {
          if (childProps.onChange) {
            childProps.onChange(checkedTrue, childProps.value);
          }
          if (checkedTrue) {
            onChange && onChange(childProps.value);
          }
        },
      };

      return React.cloneElement(child, mergedChildProps);
    });
  };

  return (
    <View style={[styles.groupContainer, style]} {...rest}>
      {renderHeader()}
      <View style={styles.groupList}>{renderChildren()}</View>
    </View>
  );
};

Group.propTypes = RadioGroupPropTypes;
Group.defaultProps = RadioGroupDefaultProps;

export default Group;