import { body } from "express-validator"

const userRegistrationValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage("email is required")
            .isEmail().withMessage("email is invalid"),
        body("name")
            .trim()
            .notEmpty().withMessage("name is required"),
        body("password")
            .notEmpty().withMessage("password is must")
            .isLength({ min: 4 }).withMessage("must be four letters")
            .isLength({ max: 8 }).withMessage("must be eight letters")




    ]
}

const userLoginValidator = () => {
    return [
        body("email")

            .trim()
            .notEmpty().withMessage("email is required")
            .isEmail().withMessage("email is invalid"),
        body("password")
            .notEmpty().withMessage("password is must")
            .isLength({ min: 4 }).withMessage("must be theree letters")
            .isLength({ max: 8 }).withMessage("must be eight letters")
    ]
}
export { userRegistrationValidator,userLoginValidator }