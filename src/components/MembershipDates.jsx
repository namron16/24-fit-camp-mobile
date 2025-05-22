import React, { useMemo } from "react";
import { useGetRemainingTime } from "../utils/useGetRemainingTime";

const MembershipDates = ({ startDate, endDate }) => {
  const formattedStartDate = useMemo(() => {
    if (!startDate) return "";
    return new Date(startDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [startDate]);

  const formattedEndDate = useMemo(() => {
    if (!endDate) return "";
    return new Date(endDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [endDate]);

  const remainingTime = useMemo(() => {
    return useGetRemainingTime(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div className="membership-info">
      <div className="membership-info-items">
        <span className="membership-title">Membership Start</span>
        <span className="membership-detail">{formattedStartDate}</span>
      </div>
      <div className="membership-info-items">
        <span className="membership-title">Membership End</span>
        <span className="membership-detail">{formattedEndDate}</span>
      </div>
      <div className="membership-info-items">
        <span className="remaining-time">{remainingTime}</span>
      </div>
    </div>
  );
};

export default MembershipDates;
