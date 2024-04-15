import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from '../../redux/contactsOps'
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Too Short!")
        .max(30, "Too Long!")
        .required("Required"),
    number: Yup.string()
        .min(3, "Too Short!")
        .max(30, "Too Long!")
        .required("Required")
});

const initialValues = {
    name: "",
    number: ""
};

export default function ContactForm() {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        dispatch(addContact({ name: values.name, number: values.number })); 
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={FeedbackSchema}
            onSubmit={handleSubmit}
        >
            <Form className={styles.contactFormContainer}>
                <div className={styles.contactFormInput}>
                    <label htmlFor="name">Name</label>
                    <Field type="text" name="name" />
                    <ErrorMessage name="name" component="span" className={styles.error} />
                </div>
                <div className={styles.contactFormInput}>
                    <label htmlFor="number">Number</label>
                    <Field type="tel" name="number" />
                    <ErrorMessage name="number" component="span" className={styles.error} />
                </div>
                <button type="submit" className={styles.btnAddcontact}>
                    Add contact
                </button>
            </Form>
        </Formik>
    );
}


