import "../../styles/Settings.scss";
import { useRef, useState } from "react";
import { UserAuth } from "../../firebase/user_auth";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { FailedAlert, GeneralPositiveAlert } from "../../components/Alert.js";
import { useNavigate } from "react-router-dom";

const Reauthenticate = ({
  modalValue,
  setModal,
  auth,
  openAlert,
  alertText,
}) => {
  const modal = useRef();
  const { user, delUser } = UserAuth();
  const passwordRef = useRef();
  const nav = useNavigate()
  if (modalValue) {
    modal.current?.removeAttribute("open");
    modal.current?.showModal();
  } else {
    modal.current?.close();
  }

  const updateInfo = () => {
    let credential = EmailAuthProvider.credential(
      user.email,
      passwordRef.current.value
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        if (auth.action === "Update email") {
          updateEmail(user, auth.ref);
        } else if(auth.action === 'Update password') {
          updatePassword(user, auth.ref);
        } else {
          delUser()
          nav('/', {replace: true})
        }
        alertText(`${auth.title} successfully!`);
        openAlert(true);
        setModal(false);
      })
      .catch((e) => console.log(e));
  };
  return (
    <dialog ref={modal} className="modal-tab">
      <h1>{auth.title}</h1>
      <p>Please enter your password to continue to the next step.</p>
      <input ref={passwordRef} placeholder="Confirm current password" />
      <button onClick={() => setModal(false)}>Cancel</button>{" "}
      <button onClick={() => updateInfo()}>{auth.action}</button>
    </dialog>
  );
};

const Settings = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const { user, uploadPicture } = UserAuth();
  const [activeButton, setactiveButton] = useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
  ]);

  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();
  const [alertText, setalertText] = useState("");
  const [openAlert, setopenAlert] = useState(false);
  const [openFalsealert, setopenFalsealert] = useState(false);

  const [openModal, setopenModal] = useState(false);
  const [reauth, setReauth] = useState({
    title: null,
    action: null,
    ref: null,
  });
  const toggleButton = (id) => {
    const newArray = activeButton.map((button) => {
      if (button.id === id) {
        return { ...button, active: true };
      }
      return button;
    });
    setactiveButton(newArray);
  };

  let usernamecheck = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  let emailcheck = /^\S+@\S+\.\S+$/;
  let passwordcheck = /[0-9a-zA-Z]{6,}/;
  const userSettings = (e, id) => {
    e.preventDefault();
    switch (id) {
      case 1:
        if (usernamecheck.test(usernameRef.current.value)) {
          updateProfile(user, { displayName: usernameRef.current.value });
          setalertText("User name updated successfully!");
        }
        setopenAlert(true);
        break;

      case 2:
        
        if(emailcheck.test(emailRef.current.value)) {
          setopenModal(true);
          let actionValue = {
          title: "Update email address",
          action: "Update email",
          ref: emailRef.current.value,
        };
        setReauth(actionValue);
        }
        
        break;

      case 3:
        if (
          passwordcheck.test(confirmpasswordRef.current.value) &&
          passwordRef.current.value === confirmpasswordRef.current.value
        ) {
          setopenModal(true);
          let actionValue = {
            title: "Update password",
            action: "Update password",
            ref: confirmpasswordRef.current.value,
          };
          setReauth(actionValue);
        } else {
          setalertText("Password is invalid!");
          setopenFalsealert(true);
        }

        break;

      case 4:
        uploadPicture(profileImage, "pfp", "user_pfp.jpg");
        setalertText("Profile picture updated successfully!");
        setopenAlert(true);
        break;

      case 5:
        uploadPicture(coverImage, "cover", "user_cover.jpg");
        setalertText("Cover picture updated successfully!");
        setopenAlert(true);
        break;

      case 6:
        setopenModal(true);
        let actionValue = {
          title: "Delete account",
          action: "Delete account",
          ref: '',
        };
        setReauth(actionValue);
      break;

      default:
        setalertText("Unable to change setting at this time!");
        setopenFalsealert(true);
        break;
    }
  };

  if (openAlert) {
    setTimeout(() => {
      setopenAlert(false);
    }, 2000);
  }

  if (openFalsealert) {
    setTimeout(() => {
      setopenFalsealert(false);
    }, 2000);
  }
  return (
    <section className="settings">
      <section className="acct-setting-sect">
        <h1>Account Settings</h1>
        <div>
          <label>Username</label>
          <input
            ref={usernameRef}
            onFocus={() => toggleButton(1)}
            defaultValue={user.displayName}
          />
          <button
            type="button"
            onClick={(e) => userSettings(e, 1)}
            className={`save-btn ${
              activeButton[0].active === true ? "active" : "hidden"
            }`}
          >
            Save User Name
          </button>
        </div>

        <div>
          <label>Email</label>
          <input
            ref={emailRef}
            onFocus={() => toggleButton(2)}
            defaultValue={user.email}
          />
          <button
            onClick={(e) => userSettings(e, 2)}
            className={`save-btn ${
              activeButton[1].active === true ? "active" : "hidden"
            }`}
          >
            Save Email
          </button>
        </div>

        <div>
          <label>Change Password</label>

          <input placeholder="New Password" ref={passwordRef} />
          <input
            placeholder="Confirm New Password"
            ref={confirmpasswordRef}
            onFocus={() => toggleButton(3)}
          />
          <small>Password needs to be at least 6 character</small>
          <button
            type="button"
            onClick={(e) => userSettings(e, 3)}
            className={`save-btn ${
              activeButton[2].active === true ? "active" : "hidden"
            }`}
          >
            Save Password
          </button>
        </div>
      </section>

      {/**/}
      <section className="profile-setting-sect">
        <h1>Profile Settings</h1>
        <div>
          <label>Change Profile Picture</label>
          <input
            type="file"
            onFocus={() => toggleButton(4)}
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          <button
            type="button"
            onClick={(e) => userSettings(e, 4)}
            className={`save-btn ${
              activeButton[3].active === true ? "active" : "hidden"
            }`}
          >
            Save Profile Picture
          </button>
        </div>

        <div>
          <label>Change Cover Picture</label>
          <input
            type="file"
            onFocus={() => toggleButton(5)}
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
          <button
            type="button"
            onClick={(e) => userSettings(e, 5)}
            className={`save-btn ${
              activeButton[4].active === true ? "active" : "hidden"
            }`}
          >
            Save Cover Picture
          </button>
        </div>
      </section>

      <section className="delete-setting-sect">
        <h1>Delete Account</h1>
        <p style={{ color: "#d83e4f", marginTop: "1em" }}>
          Warning! This will permanently delete all your account data.
        </p>
        <button
          type="button"
          onClick={(e) => userSettings(e, 6)}
          className="delete-account-btn"
        >
          Delete User Account
        </button>
      </section>
      {openAlert && <GeneralPositiveAlert text={alertText} />}
      {openFalsealert && <FailedAlert text={alertText} />}
      <Reauthenticate
        modalValue={openModal}
        setModal={setopenModal}
        auth={reauth}
        openAlert={setopenAlert}
        alertText={setalertText}
      />
    </section>
  );
};

export default Settings;
