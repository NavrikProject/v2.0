import React, { useState } from "react";
import {
  HideIcon,
  PwdField,
  PwdIcons,
  ShowIcon,
  Field,
  Input,
  PasswordDiv,
  ErrorMessage,
} from "./MentorRegisterStepELements";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

const MentorSignUpDetails = ({
  formData,
  setFormData,
  errorData,
  setErrorData,
}) => {
  const [showIcon, setShowIcon] = useState(false);
  const [confirmShowIcon, setConfirmShowIcon] = useState(false);

  let pwdMinCharLen = formData.password.length >= 8;
  let pwdHasLowChar = /(.*?[a-z].*)/.test(formData.password);
  let pwdHasCapChar = /(?=.*?[A-Z].*)/.test(formData.password);
  let pwdHasSplChar = /(?=.*?[#?!@$%^&*-].*)/.test(formData.password);
  let pwdHasNumChar = /(?=.*?[0-9].*)/.test(formData.password);
  let pwdMaxCharLen = formData.password.length <= 16;
  const showSecond = false;
  const str = showSecond ? "HH:mm:ss" : "HH:mm";

  function disabledHours() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 23];
  }
  function generateOptions(length, excludedOptions) {
    const arr = [];
    for (let value = 0; value < length; value++) {
      if (excludedOptions.indexOf(value) < 0) {
        arr.push(value);
      }
    }
    return arr;
  }

  function disabledMinutes(h) {
    switch (h) {
      case 9:
        return generateOptions(60, [30]);
      case 21:
        return generateOptions(60, [0]);
      default:
        return generateOptions(60, [0, 15, 30, 45]);
    }
  }
  function disabledSeconds(h, m) {
    return [h + (m % 60)];
  }
  function onChangeValue(value) {
    console.log(value && value.format(str));
  }
  return (
    <>
      <TimePicker
        showSecond={showSecond}
        className="xxx"
        onChange={onChangeValue}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
        disabledHours={disabledHours}
      />
      <Field>
        <Input
          onFocus={() => setErrorData({ ...errorData, email: "" })}
          value={formData.email}
          type="email"
          placeholder="Enter your email....."
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
        <ErrorMessage>{errorData.email}</ErrorMessage>
      </Field>
      <PwdField>
        <Input
          onFocus={() => setErrorData({ ...errorData, password: "" })}
          type={showIcon ? "text" : "password"}
          placeholder="Enter your password"
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
        />
        <PwdIcons onClick={(e) => setShowIcon(!showIcon)}>
          {showIcon ? <ShowIcon /> : <HideIcon />}
        </PwdIcons>
        <ErrorMessage>{!formData.password && errorData.password}</ErrorMessage>
      </PwdField>
      {formData.password && (
        <PasswordDiv>
          {pwdMinCharLen && pwdMaxCharLen ? (
            <p style={{ color: "green" }}>
              Password is between 8 and 16 characters
            </p>
          ) : (
            <p style={{ color: "red" }}>
              Password must more than 8 and less than 16
            </p>
          )}
          {pwdHasLowChar ? (
            <p style={{ color: "green" }}>Password contains small letters</p>
          ) : (
            <p style={{ color: "red" }}>
              Password must be contain small letters
            </p>
          )}
          {pwdHasCapChar ? (
            <p style={{ color: "green" }}>Password contains capital letters</p>
          ) : (
            <p style={{ color: "red" }}>
              Password must be contain capital letters
            </p>
          )}

          {pwdHasSplChar ? (
            <p style={{ color: "green" }}>
              Password contains Special characters
            </p>
          ) : (
            <p style={{ color: "red" }}>
              Password must be contain Special characters
            </p>
          )}
          {pwdHasNumChar ? (
            <p style={{ color: "green" }}>Password contains Numbers</p>
          ) : (
            <p style={{ color: "red" }}>Password must be at lease one number</p>
          )}
        </PasswordDiv>
      )}
      <PwdField>
        <Input
          onFocus={() => setErrorData({ ...errorData, confirmPassword: "" })}
          value={formData.confirmPassword}
          onChange={(event) =>
            setFormData({ ...formData, confirmPassword: event.target.value })
          }
          type={confirmShowIcon ? "text" : "password"}
          placeholder="Confirm Your Password"
        />
        <PwdIcons onClick={() => setConfirmShowIcon(!confirmShowIcon)}>
          {confirmShowIcon ? <ShowIcon /> : <HideIcon />}
        </PwdIcons>
        <ErrorMessage>{errorData.confirmPassword}</ErrorMessage>
      </PwdField>
      {formData.password && formData.confirmPassword && (
        <PasswordDiv>
          {formData.password !== formData.confirmPassword ? (
            <p style={{ color: "red" }}>Password does not match</p>
          ) : (
            <p style={{ color: "green" }}>Password matched</p>
          )}
        </PasswordDiv>
      )}
    </>
  );
};

export default MentorSignUpDetails;
