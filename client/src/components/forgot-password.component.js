import React, { useState } from "react";
import axios from "axios";

import {
  setNotification,
  NOTIFICATION_TYPES,
} from "../libraries/setNotification";
import { getCSRFToken } from "../libraries/validation";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const EMAIL_VAL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ResetPassword = ({ userData }) => {
  const [email, setEmail] = useState(userData.email ? userData.email : "");
  const [properties, setProperties] = useState({
    honeypot: "",
    success: false,
  });

  const handleChange = (a, b) => setProperties({ ...properties, [a]: b });

  const Submit = (e) => {
    e.preventDefault();
    const btn = document.getElementById("reset-password");
    async function submitData() {
      btn.innerHTML = "Sending...";
      btn.setAttribute("disabled", "true");
      btn.classList.add("disabled");
      await axios
        .post(
          `${SERVER_URL}/account/forgot-password`,
          { email },
          { headers: { "XSRF-TOKEN": getCSRFToken() }, withCredentials: true }
        )
        .then((res) => {
          handleChange("success", true);
          setNotification(NOTIFICATION_TYPES.SUCCESS, res.data.message);
        })
        .catch((err) => {
          setNotification(NOTIFICATION_TYPES.DANGER, err.response.data.message);
          document.getElementById("userEmail").focus();
        });
      btn.innerHTML = "Send";
      btn.removeAttribute("disabled");
      btn.classList.remove("disabled");
    }
    if (properties.honeypot) return;
    else if (!email)
      setNotification(
        NOTIFICATION_TYPES.DANGER,
        "Please Make Sure to Fill Out All the Required Fields !"
      );
    else if (EMAIL_VAL.test(String(email).toLocaleLowerCase()) === false) {
      setNotification(
        NOTIFICATION_TYPES.DANGER,
        "Please Provide a Valid Email Address !"
      );
      document.getElementById("userEmail").focus();
    } else submitData();
  };

  return (
    <div id="form">
      <div className="form__contact">
        <div className="get_in_touch">
          <h1>Reset Password</h1>
        </div>
        <div className="form">
          {properties.success ? (
            <blockquote className="mt-10">
              <p className="mt-10">
                Password reset link has been sent to <b>{email}</b> for
                resetting your password. Click the link for the following steps.
              </p>
              <p className="mt-20">
                If you don't receive the e-mail in 5 minutes, please check your
                spam folder.
              </p>
            </blockquote>
          ) : (
            <form
              className="contact__form"
              name="contact__form"
              onSubmit={Submit}
            >
              <div className="m-10 no-bot">
                <div className="contact__infoField">
                  <label htmlFor="bot-email">
                    Enter your user account's verified email address and we will
                    send you a password reset link.
                  </label>
                  <input
                    title="Email"
                    id="bot-email"
                    type="text"
                    className="contact__inputField"
                    onChange={(event) =>
                      handleChange("honeypot", event.target.value)
                    }
                    value={properties.honeypot}
                    autoComplete="off"
                  />
                  <span className="contact__onFocus"></span>
                </div>
              </div>
              <div className="m-10">
                <div className="contact__infoField">
                  <label htmlFor="userEmail">
                    Enter your user account's verified email address and we will
                    send you a password reset link.
                  </label>
                  <input
                    title="Email"
                    id="userEmail"
                    type="email"
                    className="contact__inputField"
                    minLength="6"
                    maxLength="60"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email Address"
                    value={email}
                    required
                    autoFocus
                    spellCheck="false"
                    autoCapitalize="none"
                    autoComplete="username"
                  />
                  <span className="contact__onFocus"></span>
                </div>
              </div>
              <button
                type="submit"
                className="oauth-box google isCentered block mt-20 p-12 button"
                id="reset-password"
              >
                Send
              </button>
            </form>
          )}
        </div>
        <p className="isCentered mt-10 mb-10">
          <a className="link" href="/login">
            Login
          </a>{" "}
          or{" "}
          <a className="link" href="/get-started">
            Get Started
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
