import User from "../model/user.model.js"
import { ApiError } from "../utils/Api-error.js"
import { ApiResponse } from "../utils/Api-response.js"
import logger from "../utils/logger.js"
import { AsyncHandeler } from "../utils/async-handeler.js"
import { sendMail, emailVerificationMailgenContent } from "../utils/mail.js"





export const generateacessTokenrefreshtoken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(400, "cant find the userin")
            logger.error("cant find error")


        }
        const accessToken = user.generateAcessToken()
        const refreshToken = user.gererateRefreshToken()
        user.refreshToken = refreshToken
        // save to datbase
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        logger.error("cant set tokens")
        throw new ApiError(400, "Something went wrong cant find userTokens")

    }
}
export const registerUser = AsyncHandeler(async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        if (!role) {
            role = "member"
        }
        if (!name || !email || !password) {
            logger.warn("please fill all the field")
            throw new ApiError(404, "please provide all field")
        }
        const existUser = await User.findOne({ email })
        if (existUser) {
            logger.warn("user alreeady exist")
            throw new ApiError(400, "user already exist")

        }
        // create user
        const user = await User.create({
            name,
            email,
            password,
            role
        }


        )
        const { unhasedToken, hashCedToken, tokenExpiry } = user.generateTemporaryToken();
        user.emailVerificationToken = hashCedToken;
        user.emailVerificationexpiry = tokenExpiry;

        const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${unhasedToken}&email=${user.email}`

        await sendMail({
            email: user.email,
            subject: "verify your email",
            mailGenContent: emailVerificationMailgenContent(user.name, verificationUrl)
        })
        await user.save({ validateBeforeSave: false })

        // acess token and refrsh Token
        const { accessToken, refreshToken } = await generateacessTokenrefreshtoken(
            user._id
        )
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        }
        res.cookie("AcessToken", accessToken, cookieOptions)
        res.cookie("RefreshToken", refreshToken, cookieOptions)
        res.status(200).json(
  new ApiResponse(
    200,
    {
      user,
      accessToken,
      refreshToken
    },
    "User registered successfully"
  )
);

    } catch (error) {
        logger.error("not registerd", error)
        throw new ApiError(404, "cant register the user")


    }
})
export const loginUser = AsyncHandeler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        logger.warn("please enter the reqired filelds")
        throw new ApiError(400, "please enter all field")
    }
    const user = await User.findOne({ email })
    if (!user) {
        logger.error("cant find the user")
        throw new ApiError(404, "invalid password or email id")

    }
    const isPaassWordCorrect = await user.ispasswordCorrect(password)
    if (!isPaassWordCorrect) {
        logger.warn("invalid password")
        throw new ApiError(500, "invalid password or email id")
    }
    const { accessToken, refreshToken } = await generateacessTokenrefreshtoken(
        user._id
    )
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    }
    res.cookie("AcessToken", accessToken, cookieOptions)
    res.cookie("RefreshToken", refreshToken, cookieOptions)
    res.status(200).json(
        200,
        {
            _id: user._id,
            email: user.email,
            role: user.role
        },
        accessToken,
        refreshToken,
        {
            message: "login succesfully"
        }
    )


})
export const logoutuser = AsyncHandeler(async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    }
    res.cookie("AcessToken", "", cookieOptions)
    res.cookie("RefreshToken", "", cookieOptions)
    res.status(200).json(new ApiResponse(200, { message: "user logout succesfully" }))

})