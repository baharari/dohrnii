import PropTypes from 'prop-types';
import { spacing } from '../../constants';

export const ModalPropTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  hideHeader: PropTypes.bool,
  borderRadius: PropTypes.number,
  overlayColor: PropTypes.string,
  mode: PropTypes.oneOf(['modal', 'drawer']),
  position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  overlayClose: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  bodyStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
};

export const ModalDefaultProps = {
  opened: false,
  onClose: () => {},
  title: undefined,
  hideHeader: false,
  borderRadius: spacing.borderRadius.m,
  overlayColor: undefined, // theme üzerinden çözülür
  mode: 'modal',
  position: 'bottom',
  overlayClose: true,
  style: undefined,
  headerStyle: undefined,
  bodyStyle: undefined,
};