import React, { useMemo } from "react";
import QRCode from "react-qr-code";
import { useFetchMember } from "../utils/FetchData";
import MembershipDates from "../components/MembershipDates";
import MembershipType from "../components/MembershipType";
import Loading from "../loading/Loading";
import usePageTransition from "../utils/usePageTransition";
import "./overview.css";

const Overview = () => {
  const { member } = useFetchMember();
  const memberDetail = member?.data?.[0];

  const value = useMemo(
    () => ({
      firstName: memberDetail?.firstName,
      lastName: memberDetail?.lastName,
      contact: memberDetail?.contact,
      email: memberDetail?.email,
      type: memberDetail?.type,
      plan: memberDetail?.plan,
      membershipStart: memberDetail?.membershipStart,
      membershipEnd: memberDetail?.membershipEnd,
    }),
    [memberDetail]
  );

  const qrCodeValue = useMemo(() => {
    return JSON.stringify(value.contact);
  }, [value.contact]);

  const { isPending, showContent } = usePageTransition(1000);
  if (!showContent || isPending) return <Loading />;

  return (
    <section className="overview">
      <h1>Overview</h1>
      <div className="member-details__container">
        <div className="member-info">
          <div className="member-membership">
            <MembershipType type={value.type} plan={value.plan} />
            <MembershipDates
              startDate={value.membershipStart}
              endDate={value.membershipEnd}
            />
          </div>
        </div>
      </div>

      <div className="qr-code">
        <span>Member QR Code</span>
        {qrCodeValue ? (
          <div className="member-qr">
            <QRCode
              size={200}
              bgColor="#fff"
              fgColor="#111"
              value={qrCodeValue}
            />
          </div>
        ) : (
          <div>
            <h1>No QR Code</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Overview;
