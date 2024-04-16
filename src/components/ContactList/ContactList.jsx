import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import styles from "./ContactList.module.css";

const ContactList = () => {
    const contacts = useSelector(selectFilteredContacts);

    return (
        <div className={styles.contactListContainer}>
            {contacts.map(({ id, name, number }) => (
                <Contact key={id} id={id} name={name} number={number} />
            ))}
        </div>
    );
};

export default ContactList;


