import { useDispatch } from "react-redux";
import { deleteContact } from '../../redux/contactsOps'
import styles from './Contact.module.css'

export default function Contact({ id, name, number }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteContact(id));
    };

    return (
    <div className={styles.contactContainer}>
        <div key={id} className={styles.contactInfo}>
            <p>{name}</p>
            <p>{number}</p>
        </div>
        <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
    </div>
    );
}
