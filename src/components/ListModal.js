import { useRef, useState } from "react";
import { doc, setDoc} from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";
import { ListAlert, FailedAlert } from "./Alert.js";
import "../App.scss";
const ListModal = ({ click, modalValue }) => {
  const listName = useRef();
  const modal = useRef()
  const [finish, setFinish] = useState(false);
  const [alert, setAlert] = useState(false);
  const [falsealert, setfalseAlert] = useState(false);


  if(modalValue) {
    modal.current?.removeAttribute('open')
    modal.current?.showModal()
} else {
    modal.current?.close()
}


  const createList = (e) => {
    e.preventDefault();
    if (listName.current.value !== "") {
      const userListRef = doc(
        db,
        `users/${auth.currentUser?.uid}/lists/${listName.current.value.replace(
          /\s/g,
          ""
        )}`
      );
      setDoc(userListRef, {
        name: listName.current.value,
      })
        .then(() => {
          setFinish(true);
          setAlert(true);
        })
        .catch((e) => console.log(e));
    } else {
      setfalseAlert(true);
    }
  };

  if (finish) {
    setTimeout(() => {
      setAlert(false);
    }, 1500);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else if (falsealert) {
    setTimeout(() => {
      setfalseAlert(false);
    }, 1500);
  }

  return (
    <>
    <dialog ref={modal} className='modal-tab'>
      <section className="new-list-tab">
        <h1>New List</h1>
        <section className="create-list-modal-main">
          <label>Enter your list name below!</label>
        <input type="text" placeholder="List name" ref={listName} required />
        <button onClick={(e) => createList(e)} className="save-btn">
          Save
        </button>   
        </section>
       
        <button className="close-btn" onClick={() => click(false)}>
          Close
        </button>
      </section>
      
    </dialog>
    {alert && <ListAlert text={listName.current.value} />}
    {falsealert && <FailedAlert text={"Unable to create list!"} />}
    </>
    
  );
};

export default ListModal;
