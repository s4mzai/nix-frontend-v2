import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/services/API";
import { CurrUserCtx } from "@/contexts/current_user";
import { toast } from "react-toastify";

export default function EditMember() {
  const navigate = useNavigate();
  const uri = API.getUri();
  const { user } = useContext(CurrUserCtx);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    about: user.bio || "",
    linkedin: "",
    website: "",
    facebook: "",
    instagram: "",
    password: "",
    username: "",
    profilePicture: `${uri}/images/get-avatar/${user.id}`,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Update the state with the selected file
    setFormData((prevData) => ({ ...prevData, profilePicture: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform API call to update member info
    try {
      const response = await API.post(user.id, formData);
      // Handle success scenario
      console.log("Info updated successfully!", response);
      toast.success("Info updated successfully!");
      navigate("/profile"); // Redirect to profile page after update
    } catch (error) {
      // Handle error scenario
      toast.error("Failed to update info. Please try again later.")
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 shadow rounded">
  <h1 className="text-4xl font-light mb-4">Edit Info: {formData.name}</h1>
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
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm mb-2">Username</label>
          <input
            type="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="border p-2 rounded w-full"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email Address"
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block text-sm mb-2">About You</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          placeholder="Tell us about yourself!"
          className="border p-2 rounded w-full"
        />
      </div>
    </div>

    <hr className="border-t border-gray-300 mt-6 mb-6 w-full" />
    {/* Social info */}
    <div className="space-y-2">
      <h1 className="text-2xl mb-4">Social Info</h1>
      <div>
        <label className="block text-sm mb-2">LinkedIn</label>
        <input
          type="text"
          name="linkedin"
          value={formData.linkedin}
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
          value={formData.instagram}
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
          value={formData.facebook}
          onChange={handleInputChange}
          placeholder="Facebook"
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block text-sm mb-2">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border p-2 rounded w-full"
        />
        <small className="block text-xs mt-2 text-slate-500">
        This will be your public email.
        </small>
      </div>
    </div>

    <hr className="border-t border-gray-300 mt-6 mb-6 w-full" />
    {/* Profile pic */}
    <div className="text-center">
      <label className="text-sm mr-20">Profile picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2 rounded"
      />
    </div>

    <hr className="border-t border-gray-300 mt-6 mb-6 w-full" />
    {/* Password */}
    <div className="relative">
      <label className="block text-sm mb-2">Password</label>
      <div className="relative">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="border p-2 rounded w-full"
        />
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
};
