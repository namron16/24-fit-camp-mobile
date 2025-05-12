import React from "react";

const useGetRemainingTime = (startDate, endDateStr) => {
  const today = new Date(startDate);
  const endDate = new Date(endDateStr);
  const diffTime = endDate - today;

  if (diffTime <= 0) return "Expired";

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);

  return diffMonths >= 1 ? (
    <span>
      <span
        style={{ color: "green" }}
        className="membership-date"
      >{`${diffMonths}`}</span>
      {` month${diffMonths > 1 ? "s" : ""} remaining`}
    </span>
  ) : (
    <span>
      <span
        style={{ color: "red" }}
        className="membership-date"
      >{`${diffDays}`}</span>
      {` day${diffDays > 1 ? "s" : ""} remaining`}
    </span>
  );
};

export { useGetRemainingTime };
