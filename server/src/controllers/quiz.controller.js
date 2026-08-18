import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js"

export const createQuiz = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create quiz" });
    }

    const { title, description, timeLimitMinutes, startAt, endAt } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const quiz = await Quiz.create({
      title,
      description: description || "",
      teacherId: req.user.id,
      timeLimitMinutes: timeLimitMinutes ?? 10,
      startAt: startAt || null,
      endAt: endAt || null,
    });

    return res.status(201).json({ message: "Quiz created successfully", quiz });

  } catch (error) {
    return res.status(500).json({ message: "Failed to create quiz" });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    let quizzes;

    if (req.user.role === "teacher") {
      quizzes = await Quiz.find({ teacherId: req.user.id })
    } else {
      quizzes = await Quiz.find({ status: "published" })
    }
    return res.status(200).json({ quizzes })
    
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch the quiz" })
  }

}

export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId)
    if (!quiz) {
      return res.status(404).json({ message: "quiz not found" })
    }
    if (req.user.role === "student" && quiz.status !== "published") {
      return res.status(403).json({ message: "Quiz not published yet" })
    }
    return res.status(200).json({ quiz })
  }
  catch (error) {
    return res.status(500).json({ message: "Failed to fetch the quiz" })
  }

}


export const publishQuiz = async (req, res) => {
  try{
    const {quizId} = req.params
             
    const quiz = await Quiz.findById(quizId)
     if(!quiz){
      return res.status(404).json({message:"quiz not found"})
     }
     if(req.user.role !== "teacher" ){
      return res.status(403).json({message:"only teachers are authorized to publish"})
     } 
     if(quiz.status === "published"){
      return res.status(403).json({message:"quiz is already been published"})
     }
     if(quiz.teacherId.toString() !== req.user.id){
      return res.status(403).json({message:"this quiz is not owned by you"})
     }

     quiz.status = "published";
     await quiz.save();
     return res.status(200).json({message:"quiz published successfully", quiz})
  
    }catch(error){
      return res.status(500).json({message:"failed to publish quiz"})
    }
    
}

export const submitQuiz = async (req , res) => {

    try{
       if(req.user.role !== "student"){
        return res.status(403).json({message:"only students can submit quiz"})
       } 

       const {quizId} = req.params
       const {answers} = req.body 

         if(!answers || !Array.isArray(answers)){
          return res.status(400).json({message:"answers are required"})
         }
         const quiz = await Quiz.findById(quizId)
         if(!quiz || quiz.status !== "published"){
          return res.status(404).json({message:"quiz not found or not published"})
         }

         const questions = await Question.find({quizId})
          if(questions.length === 0){
            return res.status(400).json({message:"this quiz has no questions available"})
          }
                
       let score = 0
           questions.forEach((q) => {
            const studentAns = answers.find((a) => a.questionId.toString() === q._id.toString())
            
              if(studentAns && studentAns.selectedAnswer === q.correctAnswer){
                score += 1;
              }
           } )

           const totalQuestions = questions.length;
           const percentage = Math.round((score / totalQuestions * 100))

              return res.status(200).json({message:"quiz submitted successfully", score , totalQuestions , percentage,})      
    }
    catch(error){
      return res.status(500).json({message:"failed to submit quiz"})
    }
    
}
