import SpecializationModel from "../models/SpecializationModel.js";
import ProjectModel from "../models/ProjectModel.js";
import UserModel from "../models/UserModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { getParentId } from "./ParentController.js";

// Student ACCOUNT CREATION
export const CreateStudentAccount = async (req, res) => {
  const data = req.body;
  try {
    const isExist = await UserModel.findOne({ email: data.email });
    if (isExist) {
      throw Error('Email Already Exist !!');
    }

    if (!data?.specialization || data?.specialization == null) {
      throw Error('Student Must Enroll For a Specialization When they Register');
    }

    const studentData = {
      regNo: data.regNo,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      email: data.email,
      role: 'student',
      contactNo: data.contactNo,
      specialization: data.specialization

    }
    console.log(studentData);
    const result = await UserModel.create(studentData);

    await sendEmail(data.email, "Account Created Successfully", { name: `Username : ${data.email}`, description: `Password: ${data.password} \n Account Type: ${data.role}`, }, "./template/emailtemplate.handlebars");


    res.status(200).json({
      message: 'Account Created Successfully!', result
    })
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }

}


//GET Student Profile  //LoggedInStudent
export const getStudentDetails = async (req, res) => {
  const id = req.loggedInId
  try {
    const isExist = await UserModel.findById(id).populate('classId');
    if (!isExist) {
      res.status(401).json({ message: 'User Not Exist' });
    }
    res.status(200).json(isExist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// Get Students by Spec ID
export const getStudentsBySpecId = async (req, res) => {
  const { classId } = req.params; // Assuming Spec is passed as a route parameter

  try {
    // Find students with the specified Spec and role set to 'student'
    const students = await UserModel.find({
      specialization,
      role: 'student',
    }).populate('specialization');

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Get All Students
export const getAllStudents = async (req, res) => {
  try {
    // Find all users with the role set to 'student'
    const students = await UserModel.find({ role: 'student' }).populate('specialization');

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update Student by ID
export const updateStudentById = async (req, res) => {
  const { id } = req.params; // Assuming the student ID is passed as a route parameter
  const updateData = req.body;

  try {
    const updatedStudent = await UserModel.findByIdAndUpdate(id, updateData, { new: true }).populate('classId');

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete Student by ID
export const deleteStudentById = async (req, res) => {
  const { id } = req.params; // Assuming the student ID is passed as a route parameter

  try {
    const deletedStudent = await UserModel.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllProjectsInSpecUsingStId = async (req, res) => {
  try {
    const { loggedInId } = req;

    const loggedInUser = await UserModel.findById(loggedInId);

    const supervisor = await SpecializationModel.findById(loggedInUser.specialization).populate('ownedBy');

    const allSubjects = await ProjectModel.find({ specialization: loggedInUser.specialization }).populate('supervisor');

    const allDetails = {
      subjects: allSubjects,
      supervisor: supervisor.ownedBy.firstName + ' ' + supervisor.ownedBy.lastName
    }
    res.status(200).json(allDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getClassMatesUsingStId = async (req, res) => {
  try {
    const { loggedInId } = req;

    const loggedInUser = await UserModel.findById(loggedInId);
    const allStudents = await UserModel.find({ classId: loggedInUser.classId })
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getStudentOverview = async (req, res) => {
  try {
    const { loggedInId } = req;
    const Student = await UserModel.findById(loggedInId).populate('classId');
    const classDetails = Student.classId.grade + ' ' + Student.classId.subClass

    res.status(200).json({ className: classDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}