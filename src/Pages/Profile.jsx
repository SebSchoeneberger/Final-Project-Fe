import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Profile() {
  const url = `${API_URL}/auth/me`;

  const [loading, setLoading] = useState(true);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmJmNzAwOWI2MGE0NjY4ZDdlMjNiM2EiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNDA3NjU5NCwiZXhwIjoxNzI0MTYyOTk0fQ.uXZHrFkU7YKlXSLFGqLMYSKJ208oAOC2lGady83mllE";

  const [userData, setUserData] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.user);
        setUserData(res.data.user);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function handleChange(e) {
    setPasswordError("");
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function onSubmit(data) {
    const updateUrl = `${API_URL}/users/${userData.id}`;
    // console.log(data);
    setPasswordError("");

    if (data.currentPassword.length > 0 || data.newPassword.length > 0 || data.confirmNewPassword.length > 0) {
      if (data.currentPassword.length == 0 || data.newPassword.length == 0 || data.confirmNewPassword.length == 0) {
        setPasswordError("Please enter your current password and a new password");
        return;
      }
      if (data.newPassword !== data.confirmNewPassword) {
        setPasswordError("Passwords dont match");
        return;
      }
    }

    setLoading(true);
    setUserData({ ...userData, currentPassword: "", newPassword: "", confirmNewPassword: "" });
    axios
      .put(
        updateUrl,
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          newPassword: data.newPassword,
          currentPassword: data.currentPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.message) {
          toast.error(res.data.message);
        } else {
          toast.success("Profile updated successfully");
        }
      })
      .catch((err) => toast.error(err.response.data.error))
      .finally(() => {
        setLoading(false);
        reset();
      });
  }

  function handleDelete(e) {
    document.getElementById("confirmPopup").showModal();
  }

  function deleteConfirmed() {
    const DeleteUrl = `${API_URL}/users/${userData.id}`;
    axios
      .delete(DeleteUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => toast.error(err.response.data.error))
      .finally(() => {
        toast.success("Account deleted successfully");
        navigate("/");
      });
  }

  const windowMarkup = "min-h-screen border-[2px] border-solid border-base-content border-opacity-40 w-full m-auto text-left  px-12 my-4";

  if (loading)
    return (
      <div className={windowMarkup}>
        <LoadingSpinner />
      </div>
    );

  if (userData === null) return <div className="min-h-screen text-4xl flex items-center justify-center w-full">User doesn't exist</div>;

  return (
    <div className={windowMarkup}>
      <div className="max-w-[64rem] m-auto">
        <p className="text-2xl font-bold pt-12">My Settings</p>
        <form className="" onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="flex mt-8 gap-12">
            <div className="w-[40%]">
              <p className="font-bold mt-2">Profile</p>
              <p className="text-xs">Your personal information and account security settings</p>
            </div>
            <div className="w-[60%] flex flex-col gap-2">
              {/* <p className="font-bold">Avatar</p> */}
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">First Name</span>
                </div>
                <input
                  value={userData.firstName}
                  {...register("firstName")}
                  type="text"
                  placeholder="Type here"
                  className={`input input-bordered`}
                  onChange={handleChange}
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">Last Name</span>
                </div>
                <input
                  value={userData.lastName}
                  {...register("lastName", { required: false })}
                  type="text"
                  placeholder="Type here"
                  className={`input input-bordered`}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="flex mt-8 gap-12 items-center">
            <div className="w-[40%]">
              <p className="font-bold">Email address</p>
              <p className="text-xs">Your email is used to login into the platform</p>
            </div>
            <div className="w-[60%]">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">Email</span>
                </div>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  autoComplete="off"
                  placeholder="Type here"
                  className={`input input-bordered`}
                  value={userData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-error font-semibold">Email is required.</p>}
              </label>
            </div>
          </div>
          <div className="flex mt-8 gap-12">
            <div className="w-[40%]">
              <p className="font-bold mt-2">Set Password</p>
              <p className="text-xs">Choose a new password</p>
            </div>
            <div className="w-[60%] flex flex-col gap-2">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">Current password</span>
                </div>
                <input
                  {...register("currentPassword", { required: false })}
                  onChange={handleChange}
                  id="currentPassword"
                  type="password"
                  autoComplete="off"
                  placeholder="Type here"
                  className={`input input-bordered`}
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">New password</span>
                </div>
                <input
                  {...register("newPassword", { required: false })}
                  onChange={handleChange}
                  type="password"
                  placeholder="Type here"
                  className={`input input-bordered`}
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">Re-type new password</span>
                </div>
                <input
                  {...register("confirmNewPassword", { required: false })}
                  onChange={handleChange}
                  type="password"
                  placeholder="Type here"
                  className={`input input-bordered `}
                />
              </label>
              <p className="text-error font-semibold">{passwordError}</p>
            </div>
          </div>
          <div className="flex justify-end my-12">
            <button type="submit" className="btn btn-info px-5">
              Save Settings
            </button>
          </div>
          <div className="border-[2px] border-base-content "></div>
          <p className="font-bold mt-8">Delete account</p>
          <p className="text-xs">You can't re-activate your account again. It wil delete your account permanantly.</p>
        </form>
        <div className="flex justify-end my-12">
          <button onClick={handleDelete} className="btn bg-red-500 text-white">
            Delete Account
          </button>
        </div>
      </div>
      <ConfirmPopup deleteConfirmed={deleteConfirmed} />
    </div>
  );
}

const ConfirmPopup = ({ deleteConfirmed }) => {
  return (
    <dialog id="confirmPopup" className="modal">
      <div className="modal-box bg-base-100">
        <h3 className="font-bold text-lg">Confirmation</h3>
        <p className="py-4 font-semibold">Are you sure you want to permanantly delete your account?</p>
        <div className="modal-action">
          <form method="dialog" className="flex justify-between w-full">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={deleteConfirmed} className="btn btn-outline btn-error">
              Confirm
            </button>
            <button className="btn btn-outline">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
