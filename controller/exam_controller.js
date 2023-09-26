const ExamModel = require("../models/exams_model");

const notifyByMail = (data) => {
  const { user_name, email, time_spent, total_score } = data;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "team@adefteducation.com", // Replace with your email address
      pass: "zscjqwwiaymvypco", // Replace with the App Password you generated
    },
  });

  // Set up email data
  const mailOptions = {
    from: "team@adefteducation.com",
    to: "indradeep.mazumdar@gmail.com",
    subject: `GMAT Practice Exam Completion Notification`,
    text: `Hello Adeft Education,
  
We would like to inform you that a user has successfully completed a GMAT practice exam on our platform. Below are the details of the completed exam:
    
- User's Name: ${user_name}
-User's Email: ${email}
- Test Date: ${formattedDate}
- Total Time Taken: ${time_spent}
- User's Score: ${total_score}
    
This notification is to keep you updated on user engagement and performance on our platform. 
    
Thank you for your continued support.
    
Best regards,
    
Adeft Education Team
 
  `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log(" send successfully");
    }
  });
};

const ExamController = {
  getUserExamData: async (req, res) => {
    try {
      const data = await ExamModel.getUserExamData(req.body);

      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
  storeExamData: async (req, res) => {
    console.log(req.body);
    try {
      const data = await ExamModel.storeExamData(req.body);
      if (!data) return;
      notifyByMail(req.body);

      return res.status(200).json("stored successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
};

module.exports = ExamController;
