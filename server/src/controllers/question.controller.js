import Question from "../models/Question.js"
import Quiz from "../models/Quiz.js"
// creating a question
export const createQuestion = async (req , res) => {
    try{
    
    if(req.user.role !== "teacher"){
        return res.status(403).json({message:"only teacher is authorised to create questions"})
    }

    const {quizId , question, options, correctAnswer} = req.body

    if (!quizId || !question || !options || !correctAnswer){
        return res.status(400).json({message:"Missing required fields"})
    }

    const quiz = await Quiz.findById(quizId)
     if(!quiz){
        return res.status(404).json({message:"The Quiz not found"})
     }

     const newQuestion = await Question.create({
        quizId: quiz._id,
        question: question,
        options:options,
        correctAnswer: correctAnswer,
          })
          return res.status(201).json({message:"Question created successfully", question: newQuestion})
        }
        catch(error){
        return res.status(500).json({message:"cant create Question"})}

}
 // fetching the question
export const getQuestionByQuiz = async (req, res) => {
    try{
        const {quizId} = req.params;
           
          const quiz = await Quiz.findById(quizId);
           if(!quiz){
            return res.status(404).json({message:"Quiz not found"})
           }

           const questions = await Question.find({quizId})
           return res.status(200).json({questions})
    } catch(error){
        return res.status(500).json({message:"can't get questions"})
    }
}