import React from "react";
import usePageTransition from "../utils/usePageTransition";
import Loading from "../loading/Loading";
import ToggleButton from "../components/ToggleButton";
import './settings.css'

const Settings = () => {
  const { isPending, showContent } = usePageTransition(100);
  if (!showContent || isPending) return <Loading />;
  return (
    <section className="member-settings">
      <div className="member-settings__container">
        <div className="member-settings-reset">
          <h3>Reset Password</h3>
          <button className="member-reset-btn">Reset Password</button>
        </div>
        <div className="member-settings-theme">
          <h3>Theme</h3>
          <ToggleButton />
        </div>
        <div className="member-settings-delete">
          <h3>Danger Zone</h3>
          <button className="member-delete-btn">Delete Account</button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
