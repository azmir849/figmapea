import { errorNotify, successNotify } from "@/src/common/Toast";
import { contactUrl } from "@/utils/api/api";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const ContactForm = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
});
const handleInputChange = (e) => {
  const {name, value} = e.target;
  setData({...data, [name]: value});
};

// handle contact
const handleContact =(e)=>{
  e.preventDefault();
  console.log('hit',data)
  var formdata = new FormData();
  formdata.append("name", data.name);
  formdata.append("email", data.email);
  formdata.append("subject", data.subject);
  formdata.append("message", data.message);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
  };
  
  fetch(contactUrl, requestOptions)
    .then(response => response.json())
    .then(result =>{
      successNotify(result?.message)
      setData({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    })
    .catch(error => errorNotify(error?.message[0]));
}

  return (
    <>
      <section
        className="contact-area pb-60 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".2s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="contact-wrapper mr-65 mb-60">
                <div className="sub-contact-title">
                  <h5 className="contact-title mb-30">Send Us Message</h5>
                </div>
                <div className="contact-form">
                  <form
                    id="contact-form"
                    action="assets/mail.php"
                    method="POST"
                    onSubmit={(e)=> handleContact(e)}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="contact-form-input mb-25">
                          <span>Name</span>
                          <input
                            type="name"
                            placeholder="Your Name"
                            name="name"
                            required
                            value={data.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="contact-form-input mb-25">
                          <span>Email Id</span>
                          <input
                            type="email"
                            placeholder="Your Email"
                            name="email"
                            required
                            value={data.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="contact-form-input mb-25">
                          <span>Subject</span>
                          <input
                            type="text"
                            placeholder="Subject"
                            name="subject"
                            required
                            value={data.subject}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="contact-form-input mb-40">
                          <span>Message</span>
                          <textarea
                            placeholder="Enter Your Message"
                            name="message"
                            required
                            value={data.message}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <button className="tp-btn" type="submit">
                          Submit Now
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="ajax-response"></p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12 d-none d-sm-block">
              <div className="contact-bg mb-60">
                <img
                  src="/assets/img/bg/contact.png"
                  alt="contact-bg"
                  width={'110%'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ContactForm;
