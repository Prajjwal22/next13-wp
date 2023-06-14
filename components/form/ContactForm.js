import { useState } from "react";
import styles from "./ContactForm.module.scss";
export default function ContactForm() {

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    subject:"",
    message: "",
  });

  const [form, setForm] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (inputs.name && inputs.email && inputs.subject && inputs.message) {
      setForm({ state: "loading" });
      try {
        const res = await fetch(`/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });

        const { error } = await res.json();

        if (error) {
          setForm({
            state: "error",
            message: error,
          });
          return;
        }

        setForm({
          state: "success",
          message: "Your message was sent successfully.",
        });
        setInputs({
          name: "",
          email: "",
          subject:"",
          message: "",
        });
      } catch (error) {
        setForm({
          state: "error",
          message: "Something went wrong",
        });
      }
    }
  };
  return (
    <section className="container">
      <form className={styles.form} onSubmit={(e) => onSubmitForm(e)}>
        <input
          id="name"
          type="text"
          value={inputs.name}
          onChange={handleChange}
          className={styles.inputField}
          placeholder="Name"
          required
        />
        <input
          id="email"
          type="email"
          value={inputs.email}
          onChange={handleChange}
          className={styles.inputField}
          placeholder="Email"
          required
        />
         <input
          id="subject"
          type="text"
          value={inputs.subject}
          onChange={handleChange}
          className={styles.inputField}
          placeholder="Subject"
          required
        />
        <textarea
          id="message"
          type="text"
          value={inputs.message}
          onChange={handleChange}
          className={styles.inputField}
          placeholder="Message"
          rows="5"
          required
        />
        <input type="submit" className="ctaBtn primaryBtn" />
        {form.state === "loading" ? (
          <div>Sending....</div>
        ) : form.state === "error" ? (
          <div>{form.message}</div>
        ) : (
          form.state === "success" && <div>Sent successfully</div>
        )}
      </form>
      </section>
  );
}
