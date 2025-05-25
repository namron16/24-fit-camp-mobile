import React, { useState, useRef, useEffect } from "react";
import userIcon from "../assets/user-avatar-filled-alt.svg";
import { useForm } from "@tanstack/react-form";
import { useFetchMember, useEditMember } from "../utils/FetchData";
import usePageTransition from "../utils/usePageTransition";
import Loading from "../loading/Loading";
import "./profile.css";

const Profile = () => {
  const { member } = useFetchMember();
  const memberId = member?.data?.[0]?.id;
  const { editMember } = useEditMember(memberId);
  const [profileImage, setProfileImage] = useState(userIcon);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  const { isPending, showContent } = usePageTransition(100);

  const form = useForm({
    defaultValues: member?.data?.[0] || {
      email: "",
      firstName: "",
      lastName: "",
      id: "",
      contact: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setIsSubmitting(true);
        let updatedMember = { ...value };

        if (imageFile) {
          const base64Image = await convertFileToBase64(imageFile);
          updatedMember.profileImage = base64Image;
        }

        await editMember(updatedMember);
        setSubmitMessage({
          type: "success",
          text: "Profile updated successfully!",
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        setSubmitMessage({
          type: "error",
          text: "Failed to update profile. Please try again.",
        });
      } finally {
        setIsSubmitting(false);

        setTimeout(() => {
          setSubmitMessage({ type: "", text: "" });
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (member?.data?.[0]?.profileImage) {
      setProfileImage(member.data[0].profileImage);
    }
  }, [member]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  if (!showContent || isPending) return <Loading />;

  return (
    <section className="member-profile">
      <div className="member-profile-overlay">
        <img
          src={profileImage}
          className="members-detail-icon"
          loading="lazy"
          alt="Member avatar"
        />
        <div className="image-edit-container">
          <button
            type="button"
            className="edit-image-btn"
            onClick={handleImageClick}
          >
            Edit Image
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
      </div>

      {submitMessage.text && (
        <div className={`submit-message ${submitMessage.type}`}>
          {submitMessage.text}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="members__form"
      >
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return !regex.test(value) && value.trim() !== ""
                ? "please enter valid email"
                : undefined;
            },
          }}
          children={(field) => (
            <div className="members__form-items">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="text"
                name="email"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <em>{field.state.meta.errors.join(", ")}</em>
              )}
            </div>
          )}
        />

        <form.Field
          name="firstName"
          validators={{
            onChange: ({ value }) => {
              return value.trim() === "" ? "first name is required" : undefined;
            },
          }}
          children={(field) => (
            <div className="members__form-items">
              <label htmlFor="firstName">First name:</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <em>{field.state.meta.errors.join(", ")}</em>
              )}
            </div>
          )}
        />

        <form.Field
          name="lastName"
          validators={{
            onChange: ({ value }) => {
              return value.trim() === "" ? "last name is required" : undefined;
            },
          }}
          children={(field) => (
            <div className="members__form-items">
              <label htmlFor="lastName">Last name:</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <em>{field.state.meta.errors.join(", ")}</em>
              )}
            </div>
          )}
        />
        <form.Field
          name="contact"
          validators={{
            onChange: ({ value }) => {
              const phNumberRegex =
                /^(\+63|0)[9]\d{9}$|^(\+63|0)(2|3|8)\d{7,8}$/;
              if (!value.trim()) {
                return "Contact number is required";
              } else if (!phNumberRegex.test(value)) {
                return "Please enter a valid Philippine contact number (e.g., 09123456789, +639123456789)";
              }
              return undefined;
            },
          }}
          children={(field) => (
            <div className="members__form-items">
              <label htmlFor="contact">Contact:</label>
              <input
                id="contact"
                name="contact"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <em>{String(field.state.meta.errors.join(", "))}</em>
              )}
            </div>
          )}
        />
        <form.Field
          name="id"
          children={(field) => (
            <div className="members__form-items">
              <label htmlFor="memberId">Member ID:</label>
              <input
                id="memberId"
                type="text"
                name="id"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
                readOnly
              />
              {field.state.meta.errors.length > 0 && (
                <em>{field.state.meta.errors.join(", ")}</em>
              )}
            </div>
          )}
        />

        <button
          className="members__form-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </section>
  );
};

export default Profile;
