import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useFetchMember } from "../utils/FetchData";
import usePageTransition from "../utils/usePageTransition";
import Loading from "../loading/Loading";
import "./gym.css";

const Gym = () => {
  const { member } = useFetchMember();
  const memberDetails = member?.data?.[0];
  const value = useMemo(
    () => ({
      firstName: memberDetails?.firstName || "",
      lastName: memberDetails?.lastName || "",
      email: memberDetails?.email || "",
      contact: memberDetails?.contact || "",
      type: memberDetails?.type || "",
      plan: memberDetails?.plan || "",
      membershipStart: memberDetails?.membershipStart || "",
      membershipEnd: memberDetails?.membershipEnd || "",
      gymPoints: memberDetails?.points || "",
    }),
    [memberDetails]
  );

  const date = new Date(value.membershipStart);
  const formatDate = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const { isPending, showContent } = usePageTransition(0);
  if (!showContent || isPending) return <Loading />;
  return (
    <section className="member-gym">
      <div className="rewards-header">
        <h1>Fitness Rewards</h1>
        <span>Member since {formatDate || ""}</span>
        <div className="member-points">
          <span>Current Points</span>
          <div className="current-points">
            <i className="fa-solid fa-trophy"></i> {value.gymPoints || 0}
          </div>
        </div>
      </div>
      <div className="member-rewards__nav">
        <NavLink
          to={"."}
          end
          className={({ isActive }) =>
            isActive ? "active-gym-link" : "inactive-gym-link"
          }
        >
          <i className="fa-solid fa-gift"></i>
          Rewards
        </NavLink>
        <NavLink
          to={"points-history"}
          className={({ isActive }) =>
            isActive ? "active-gym-link" : "inactive-gym-link"
          }
        >
          <i className="fa-solid fa-clock-rotate-left"></i>
          Points History
        </NavLink>
      </div>
      <div className="member-rewards__content">
        <Outlet />
      </div>
    </section>
  );
};

export default Gym;
