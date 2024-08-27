import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { database } from '../Config/Firebase';
import styles from './Todo.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Todo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [userData, setUserData] = useState([]);

  const AddTask = async () => {
    try {
      let userObj = { title, description, deadline };
      await addDoc(collection(database, "users"), userObj);
      setTitle('');
      setDescription('');
      setDeadline('');
      getData();
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  const getData = async () => {
    try {
      const arr = [];
      const querySnapshot = await getDocs(collection(database, "users"));
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setUserData(arr);
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  
  const EditData = async (id, field) => {
    let updateVal = prompt(`Enter new value for ${field}`);
  
    if (updateVal) {
      let updateObj = {};
      updateObj[field] = updateVal;
  
      try {
        await updateDoc(doc(database, "users", id), updateObj);
        getData();
      } catch (error) {
        console.log("Error updating document: ", error);
      }
    }
  };
  




  const DeleteData = async (id) => {
    await deleteDoc(doc(database, "users", id));
    getData();
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <h1>My Todo List</h1>
      </header>

      <div className={styles.todoInputSection}>
        <label htmlFor="title">Title *</label>
        <br />
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />

        <label htmlFor="description">Description *</label>
        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

        <label htmlFor="deadline">Deadline *</label>
        <input type="text" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="Deadline" />
        <br />

        <button onClick={AddTask}>Add Task</button>
      </div>

      <div className={styles.todoListSection}>
        {userData.map((e, i) => (
       <div key={i} className={styles.todoItem}>
       <div>
         <h2>{e.title}</h2>
         <button className={styles.iconButton} onClick={() => EditData(e.id, 'title')}>
           <EditIcon />
         </button>
       </div>
       <div>
         <p>{e.description}</p>
         <button className={styles.iconButton} onClick={() => EditData(e.id, 'description')}>
           <EditIcon />
         </button>
       </div>
       <div>
         <p>Deadline: {e.deadline}</p>
         <button className={styles.iconButton} onClick={() => EditData(e.id, 'deadline')}>
           <EditIcon />
         </button>
       </div>
       <div>
         <button className={styles.iconButton} onClick={() => DeleteData(e.id)}>
           <DeleteIcon />
         </button>
       </div>
     </div>
     
          
        ))}
      </div>
    </div>
  );
};

export default Todo;


