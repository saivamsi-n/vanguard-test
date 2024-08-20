import React, { useState } from 'react';

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sai Vamsi',
    email: 'saivamsi@gmail.com',
    bio: 'Software Engineer'
  });
  const [newProfile, setNewProfile] = useState({ ...profile });

  const handleEditToggle = () => {
    if (isEditing && !window.confirm('Are you sure you want to discard changes?')) return;
    setIsEditing(!isEditing);
    if (isEditing) {
      setNewProfile({ ...profile });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateEmail(newProfile.email)) {
      alert('Invalid email format, Please check it!');
      return;
    }
    if (window.confirm('Are you sure you want to save changes?')) {
      setProfile({ ...newProfile });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewProfile({ ...profile });
    setIsEditing(false);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="profile-card">
      <h2>Profile Card</h2>
      {isEditing ? (
        <form onSubmit={handleSave} className="profile-form">
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newProfile.name}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={newProfile.email}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Bio:
              <textarea
                name="bio"
                value={newProfile.bio}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;