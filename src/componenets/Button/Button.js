import React from "react";
import PropTypes from 'prop-types';
import {withLoading} from '../HOC'

const Button = ({
  onClick,
  className = '',
  isLoading,
  children,
}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

  const ButtonWithLoading = withLoading(Button)

  Button.propTypes = {
    onClick : PropTypes.func.isRequired,
    className : PropTypes.string,
    children : PropTypes.node.isRequired
  }

  //You can also define default props in your component. 
  Button.defaultProps = {
    className: '',
  };
  
// class Button extends Component {
//   render() {
//     const { onClick, className = "", children } = this.props;

//     return (
//       <button onClick={onClick} className={className} type="button">
//         {children}
//       </button>
//     );
//   }
// }

export {Button, ButtonWithLoading} ;