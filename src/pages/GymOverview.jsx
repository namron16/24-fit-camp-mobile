import React, {useMemo} from "react";
import { useFetchMember } from "../utils/FetchData";
import { useFetchRewards } from "../utils/FetchData";
import './gymOverview.css'
const GymOverview = () => {
  const {member} = useFetchMember();
  const memberDetails = member?.data?.[0];
  const value = useMemo(
    () => ({
      gymPoints: memberDetails?.points,
    }),
    [memberDetails]
  );
  const { rewards } = useFetchRewards();
  const displayRewards = rewards?.data?.map((reward) => {
    const redeemable = value.gymPoints >= reward.points;
    return (
      <div className={`reward-items ${!redeemable ? "disabled-reward" : ""}`} key={reward.id}>
        <div className="reward-items__container">
          <div className="reward-items__details">
            <div className="reward-name">{reward.name}</div>
            <div className="reward-description">{reward.description}</div>
          </div>
          <div className="reward-points">{reward.points} pts</div>
        </div>
        <div className="reward-actions">
          <button disabled={!redeemable}>Redeem</button>
        </div>
      </div>
    );
  });
  return (
    <section className="member-rewards">
      <h1>
        <i className="fa-solid fa-trophy"></i>Available Rewards
      </h1>
      <div className="member-rewards__container">
        {rewards?.data?.length === 0 ? (
          <div className="no-rewards">No rewards available</div>
        ) : (
          displayRewards
        )}
      </div>
    </section>
  );
};

export default GymOverview;
