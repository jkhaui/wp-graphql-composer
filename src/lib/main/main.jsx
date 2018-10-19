import React from 'react';
import PropTypes from 'prop-types';

const main = ({ Archive, children, className, Page, Post, Routes, ...rest }) => (
  <main role="main" className={`site-main${className ? ' '+className : ''}`} {...rest}>
    <Routes {...{ Archive, Page, Post }} />
    {children}
  </main>
);

main.propTypes = {
  Archive: PropTypes.func.isRequired,
  Page: PropTypes.func.isRequired,
  Post: PropTypes.func.isRequired,
  Routes: PropTypes.func.isRequired,
  className: PropTypes.string,
};

main.defaultProps = {
  className: undefined,
};

export default main