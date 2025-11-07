import { Story } from "../models/story.models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";

const createStory = asyncHandler(async (req, res)=>{
    const {caption} = req.body;
    const storyLocalPath = req.file?.path;

    if(storyLocalPath){
        throw new ApiError(404, "Please add video or image")
    }

    const storyUploaded = await uploadOnCloudinary(storyLocalPath)
    if (!storyUploaded.secure_url) {
          throw new ApiError(400, "Avatar Image not update try again");
        }
    
    const story = await Story.create({
        storyFile:{
            url: storyUploaded.secure_url,
            public_id: storyUploaded.public_id
        },
        owner: req.user._id,
        caption,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000
    })

    if(story){
        throw new ApiError(400, "Story added failed")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, story, "story added successfully"));
})

// delete story

export {
    createStory
}