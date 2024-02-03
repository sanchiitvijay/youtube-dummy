import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadCloudinary } from "../utils/Cloudnary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler( async (req, res) => {
    // taking input from user
    const {fullName, email, username, password} = req.body
    
    // validating data
    // very common
    // if(fullName === "") {
    //     throw new ApiError(400, "fullname is required")
    // }

    if(
        [fullName, email, username, password].some((field) =>
            field?.trim() ===  "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // checking if user already exist
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new ApiError( 409, "User with email or username already exist" )
    }


    // taking photos and images and checkign the null field
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }
    if(!coverImageLocalPath) {
        throw new ApiError(400, "Cover image is required");
    }


    // upladiing in cloudinary
    const avatar = await uploadCloudinary(avatarLocalPath);
    const coverImage = await uploadCloudinary(coverImageLocalPath);
    if(!avatar) {
        throw new ApiError(400, "Avatar is required");
    }


    // creating user in databaase
    const user = User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })


    // checking whether the user has been created in the mongoose or not
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong ehile registering the user")
    }


    // returning the data
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registed succesfully")
    )

} )

export { registerUser }