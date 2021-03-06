import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _defineProperty from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import React, { createFactory } from 'react';
import { omit, isEmpty } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import v3 from 'uuid/v3';
import { VIEWER_QUERY } from './query';
export default (function () {
  return function (BaseComponent) {
    var BaseFactory = createFactory(BaseComponent);

    var LoginFormHandler =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(LoginFormHandler, _React$Component);

      function LoginFormHandler(props) {
        var _this;

        _classCallCheck(this, LoginFormHandler);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginFormHandler).call(this, props));
        _this.reset = _this.reset.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.valid = _this.valid.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.printErrors = _this.printErrors.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.processResults = _this.processResults.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.state = {};
        return _this;
      }

      _createClass(LoginFormHandler, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          this.reset();
        }
      }, {
        key: "valid",
        value: function valid() {
          var _this$state$form = this.state.form,
              username = _this$state$form.username,
              password = _this$state$form.password;
          var errors = {};
          if (username.length < 1) errors.user = true;
          if (password.length < 1) errors.pass = true;

          if (!isEmpty(errors)) {
            this.setState({
              form: this.printErrors(errors)
            });
            return false;
          }

          ;
          this.setState({
            form: {
              username: username,
              password: password
            }
          });
          return true;
        }
      }, {
        key: "printErrors",
        value: function printErrors(_ref) {
          var user = _ref.user,
              pass = _ref.pass;
          var formError = undefined;
          var userFieldError = user ? 'You must enter a username' : undefined;
          var passFieldError = pass ? 'You must enter a password' : undefined;
          return Object.assign(this.state.form, {
            formError: formError,
            userFieldError: userFieldError,
            passFieldError: passFieldError
          });
        }
      }, {
        key: "processResults",
        value: function processResults(payload) {
          var login = payload.data.login;

          if (login && login.authToken) {
            this.props.login(login.authToken);
          }
        }
      }, {
        key: "onChange",
        value: function onChange(_ref2) {
          var _ref2$target = _ref2.target,
              name = _ref2$target.name,
              value = _ref2$target.value;
          var form = Object.assign(this.state.form, _defineProperty({}, name, value));
          this.setState(form);
        }
      }, {
        key: "onSubmit",
        value: function onSubmit(event) {
          var _this2 = this;

          event.preventDefault();
          var mutate = this.props.mutate;
          var _this$state$form2 = this.state.form,
              password = _this$state$form2.password,
              username = _this$state$form2.username; // Validate

          if (!this.valid()) return; // Mutate

          mutate({
            variables: {
              clientId: v3("".concat(password).concat(username), v3.URL),
              username: username,
              password: password
            },
            refetchQueries: [{
              query: VIEWER_QUERY
            }]
          }).then(function (payload) {
            _this2.processResults(payload);
          }).catch(function (err) {
            var form = Object.assign({
              formError: 'Invalid Login'
            }, _this2.state.form);

            _this2.setState({
              form: form
            });
          });
        }
      }, {
        key: "reset",
        value: function reset(event) {
          this.setState({
            form: {
              username: '',
              password: ''
            }
          });
        }
      }, {
        key: "render",
        value: function render() {
          var onChange = this.onChange,
              onSubmit = this.onSubmit;
          var form = this.state.form;

          var newProps = _objectSpread({}, omit(this.props, ['login', 'logout', 'mutate', 'loggedIn', 'data']), form, {
            onChange: onChange,
            onSubmit: onSubmit
          });

          return React.createElement(BaseFactory, newProps);
        }
      }]);

      return LoginFormHandler;
    }(React.Component);

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'loginFormHandler'))(LoginFormHandler);
    }

    return LoginFormHandler;
  };
});