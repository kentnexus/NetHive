import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react"; 

const sendEmail = async (user) => {
  useEffect(() => emailjs.init("62-uW1qeYUH0N3-7N"), []);
  // emailjs.init("62-uW1qeYUH0N3-7N");
  const [loading, setLoading] = useState(false);

  console.log(user);

  const serviceId = "service_nethive";
  const templateId = "template_nethive";
  try {
    setLoading(true);
    await emailjs.send(serviceId, templateId, {
      to_name: user.first_name,
      from_name: "NetHive Team",
      sender: "nethive4495@gmail.com",
      recipient: user.email,
      message: "This is your temporary password " + user.password
    });
    alert("email successfully sent check inbox");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}

export default sendEmail;