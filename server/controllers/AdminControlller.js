import ProjectModel from "../models/ProjectModel.js";
import UserModel from "../models/UserModel.js";

export const getOverview = async (req,res)=>{
    try {
        const AllUsers = await UserModel.find();
        const AllStudents = AllUsers.filter((val)=>{
            return val.role == 'student'
        })

        const AllTeachers = AllUsers.filter((val)=>{
            return val.role == 'supervisor'
        })

        const AllSubjects = await ProjectModel.find();

        const overview = {
            studentCount : AllStudents.length,
            subjectCount: AllSubjects.length,
            teacherCount: AllTeachers.length,
        }

        res.status(200).json(overview);
    } catch (error) {
        res.status(500).json(error.message);
    }
}