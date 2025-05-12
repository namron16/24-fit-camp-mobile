import React, { useMemo } from "react";

const MembershipType = ({ type, plan }) => {
  const getTypeStyle = useMemo(() => {
    if (type === "regular") {
      return { color: "darkorange", fontWeight: "500" };
    }
    if (type === "student") {
      return { color: "var(--blue-clr)", fontWeight: "500" };
    }
    if (type === "personal") {
      return { color: "purple", fontWeight: "500" };
    }
    return {};
  }, [type]);

  return (
    <div className="membership-info">
      <div className="membership-info-items">
        <span className="membership-title">Membership Type</span>
        <span style={getTypeStyle}>{type}</span>
      </div>
      <div className="membership-info-items">
        <span className="membership-title">Membership Plan</span>
        <span className="opacity">{plan}</span>
      </div>
    </div>
  );
};

export default MembershipType;
