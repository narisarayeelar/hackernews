import React from "react";
import PropTypes from 'prop-types';

const Button = ({
  onClick,
  className = '',
  children,
}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

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

export default Button;