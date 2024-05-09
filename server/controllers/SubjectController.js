import RegisterTempModel from "../models/GroupModel.js";
import MarksModel from "../models/MarksModel.js";
import ProjectModel from "../models/ProjectModel.js";

export const createSubject = async (req, res) => {
    try {
        const { classId } = req.params;
        const subjectData = req.body;

        if (!classId) {
            throw Error('To Create a subject, Class is a must');
        }
        subjectData.classId = classId;

        const createdSubject = await ProjectModel.create(subjectData)
        res.status(200).json({ message: 'Subject Created Successfully', subject: createdSubject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllSubjectsInClass = async (req, res) => {
    try {
        const { classId } = req.params;

        if (!classId) {
            throw Error('Please Provide ClassId as Params');
        }

        const allSubjects = await RegisterTempModel.find({specialization:classId}).populate('students');
        console.log(allSubjects);
        res.status(200).json(allSubjects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw Error('Please Provide Subject Id as Params');
        }

        const deletedSub = await ProjectModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Subject Deleted Successfully', subject:deletedSub });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subjectData = req.body;

        if (!id) {
            throw Error('To Update a subject, Subject Id is a must');
        }

        const updatedSub = await ProjectModel.findByIdAndUpdate(id,subjectData);
        res.status(200).json({ message: 'Subject Updated Successfully', subject: updatedSub });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSubjectTeacher = async(req,res)=>{
    //pass the Subject id
    const {id} = req.params;
    try {
        if (id) {
            try {
                const teacher = await ProjectModel.findById(id).populate('teachBy');
                if (!teacher) {
                    throw Error('No Subjects Or Other Error');
        
                }
                res.status(200).json(teacher);
        
            } catch (error) {
                res.status(500).json({
                    message: error.mesasge
                })
            }

        }else{
            throw Error('Subject Id Required')
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

export const getSubjectMarks = async(req,res)=>{
    try {
        const {subId,term} = req.params;
        const marks = await MarksModel.find({term, subId}).populate('marks.studentId');
        res.status(200).json(marks)
    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}