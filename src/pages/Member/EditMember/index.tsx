import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/services/API";
import { CurrUserCtx } from "@/contexts/current_user";
import { toast } from "react-toastify";
import showPassIcon from "@/assets/show-password.png";
import React from "react";
import { ErrorContext } from "@/contexts/error";
import { AvatarImage } from "@/components/AvatarImage";
import { IUser } from "@/types/contextTypes";

interface EditMemberState {
  target_name: string;
  target_email: string;
  target_bio: string;
  // linkedin: string;
  // website: string;
  // facebook: string;
  // instagram: string,
  newPassword: string;
  confirmPassword: string;
  // username: string,
  profilePicture: string | null;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

enum ActionType {
  ToggleShowPassword,
  ToggleShowConfirmPassword,
  UpdateName,
  UpdateEmail,
  UpdateBio,
  // UpdateUsername,
  // UpdateLinkedin,
  // UpdateWebsite,
  // UpdateFacebook,
  // UpdateInstagram,
  UpdatePassword,
  UpdateConfirmPassword,
  UpdateProfilePictureLink,
  SetProfilePicture,
}

export default function EditMember() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(CurrUserCtx);
  const { setError } = useContext(ErrorContext);
  const toastId = React.useRef(null);
  

  const initialState: EditMemberState = {
    target_name: user.name,
    target_email: user.email,
    target_bio: user.bio || "",
    // linkedin: "",
    // website: "",
    // facebook: "",
    // instagram: "",
    newPassword: "",
    confirmPassword: "",
    // username: "",
    profilePicture: null,
    showPassword: false,
    showConfirmPassword: false,
  };

  const reducer = (
    state: EditMemberState,
    action: { type: ActionType; payload },
  ) => {
    const updatedData = { ...state };
    switch (action.type) {
      case ActionType.ToggleShowConfirmPassword:
        updatedData.showConfirmPassword = action.payload;
        break;
      case ActionType.ToggleShowPassword:
        updatedData.showPassword = action.payload;
        break;
      case ActionType.UpdateName:
        updatedData.target_name = action.payload;
        break;
      case ActionType.UpdateEmail:
        updatedData.target_email = action.payload;
        break;
      case ActionType.UpdateBio:
        updatedData.target_bio = action.payload;
        break;
      case ActionType.UpdatePassword:
        updatedData.newPassword = action.payload;
        break;

      case ActionType.UpdateConfirmPassword:
        updatedData.confirmPassword = action.payload;
        break;
      case ActionType.UpdateProfilePictureLink:
        updatedData.profilePicture = action.payload;
        break;
      case ActionType.SetProfilePicture:
        {
          const avatar = action.payload as File;
          if (avatar) {
            toastId.current = toast.info("Uploading 0%", { autoClose: false });
            const form = new FormData();
            form.append("avatar", avatar);
            const endpoint = "/images/upload-avatar";
            const requestMethod = "POST";

            API({
              method: requestMethod,
              url: endpoint,
              data: form,
              onUploadProgress: (progressEvent) => {
                const progress = progressEvent.loaded / progressEvent.total;
                const percentCompleted = Math.round(progress * 100);
                console.log(progress);
                toast.update(toastId.current, {
                  render: `Uploading ${percentCompleted}%`,
                  type: "info",
                  progress: progress,
                });
              },
            })
              .then((res) => {
                toast.update(toastId.current, {
                  render: "Uploading complete!",
                  type: "info",
                  progress: 1,
                });
                toast.done(toastId.current);
                toast.success("Image uploaded successfully");
                const image_name = res.data.data.name;
                dispatch({
                  type: ActionType.UpdateProfilePictureLink,
                  payload: image_name,
                });
              })
              .catch((e) => {
                toast.done(toastId.current);
                setError(e);
              })
              .finally(() => (toastId.current = null));
          }
        }
        break;
      default:
        return updatedData;
    }
    return updatedData;
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const {
    target_name,
    target_email,
    target_bio,
    // linkedin,
    // website,
    // facebook,
    // instagram,
    newPassword,
    confirmPassword,
    // username,
    profilePicture,
    showPassword,
    showConfirmPassword,
  } = state;

  const setShowPassHandler = () => {
    dispatch({ type: ActionType.ToggleShowPassword, payload: !showPassword });
  };

  const setShowConfirmPassHandler = () => {
    dispatch({
      type: ActionType.ToggleShowConfirmPassword,
      payload: !showConfirmPassword,
    });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   // Update the state with the selected file
  //   setFormData((prevData) => ({ ...prevData, profilePicture: file }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform API call to update member info

    const endPoint = "/user/update-user";

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const requestData = {
      target_name: target_name,
      target_email: target_email,
      target_bio: target_bio,
      password: newPassword === "" ? undefined : newPassword,
      user_id: user.id,
      target_user_id: user.id,
    };

    API.put(endPoint, requestData)
      .then((response) => {
        toast.success("Successfully updated");
        setUser(response.data.data.user as IUser);
        navigate("/profile");
      })
      .catch((e) => setError(e));
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 shadow rounded">
      <h1 className="text-4xl font-light mb-4">Edit Info: {target_name}</h1>
      <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
        <hr className="border-t border-gray-300 mt-6 mb-6 w-full" />
        {/* Primary info */}
        <div className="space-y-2">
          <h1 className="text-2xl mb-4">Primary Info</h1>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm mb-2">Name</label>
              <input
                type="name"
                name="name"
                value={target_name}
                onChange={(e) =>
                  dispatch({
                    type: ActionType.UpdateName,
                    payload: e.target.value,
                  })
                }
                placeholder="Name"
                className="border p-2 rounded w-full"
              />
            </div>
            {/* <div className="w-1/2">
              <label className="block text-sm mb-2">Username</label>
              <input
                type="username"
                name="username"
                value={username}
                onChange={(e) => dispatch({ type: ActionType.UpdateUsername, payload: e.target.value })}
                placeholder="Username"
                className="border p-2 rounded w-full"
              />
            </div> */}
          </div>

          <div>
            <label className="block text-sm mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={target_email}
              onChange={(e) =>
                dispatch({
                  type: ActionType.UpdateEmail,
                  payload: e.target.value,
                })
              }
              placeholder="Email Address"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">About You</label>
            <textarea
              name="about"
              value={target_bio}
              onChange={(e) =>
                dispatch({
                  type: ActionType.UpdateBio,
                  payload: e.target.value,
                })
              }
              placeholder="Tell us about yourself!"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          {/* <h1 className="text-2xl mb-4">Social Info</h1>
          <div>
            <label className="block text-sm mb-2">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={linkedin}
              onChange={handleInputChange}
              placeholder="LinkedIn"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={instagram}
              onChange={handleInputChange}
              placeholder="Instagram"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={facebook}
              onChange={handleInputChange}
              placeholder="Facebook"
              className="border p-2 rounded w-full"
            />
          </div> */}
        </div>

        <div>
          <label className="text-sm mr-8">Profile picture</label>
          <input
            type="file"
            id="blog-image"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) =>
              dispatch({
                type: ActionType.SetProfilePicture,
                payload: e.target.files[0],
              })
            }
            className="border p-2 rounded"
          />
        </div>
        {profilePicture ? (
          <AvatarImage
            className="max-w-md max-h-md"
            user_id={profilePicture}
            thumbnail={true}
            alt={profilePicture}
          />
        ) : (
          <></>
        )}

        <hr className="border-t border-gray-300 mt-6 mb-6 w-full" />
        {/* Password */}
        <div className="relative">
          <h1 className="text-2xl mb-4">Update Password</h1>
          <div className="relative">
            <label className="text-sm mr-8">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={newPassword}
              onChange={(e) =>
                dispatch({
                  type: ActionType.UpdatePassword,
                  payload: e.target.value,
                })
              }
              placeholder="New Password"
              className="border p-2 rounded w-full mb-2"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 pt-4 flex items-center cursor-pointer"
              onClick={setShowPassHandler}
            >
              <img
                src={showPassIcon}
                alt="toggle password visibility"
                className="w-6 h-6"
              />
            </div>
          </div>
          <div className="relative">
            <label className="text-sm mr-8">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) =>
                dispatch({
                  type: ActionType.UpdateConfirmPassword,
                  payload: e.target.value,
                })
              }
              placeholder="Confirm Password"
              className="border p-2 rounded w-full"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center cursor-pointer"
              onClick={setShowConfirmPassHandler}
            >
              <img
                src={showPassIcon}
                alt="toggle password visibility"
                className="w-6 h-6"
              />
            </div>
          </div>
          <small className="block text-xs mt-2 text-slate-500">
            You can enter the same password or update your password.
          </small>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded hover:bg-green-500"
          onClick={handleSubmit}
        >
          Update Info
        </button>
      </form>
    </div>
  );
}
