// src/actions/user.js
import { connectDB } from "@/lib/db";
import User from "@/lib/models/user.model";
import { clerkClient } from "@clerk/clerk-sdk-node";


export async function syncUser(clerkId) {
  await connectDB();

  let user = await User.findOne({ clerkId });
  if (!user) {
    const clerkUser = await clerkClient.users.getUser(clerkId);
    user = await User.create({
      clerkId,
      email: clerkUser.emailAddresses[0]?.emailAddress || "",
      name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
      image: clerkUser.imageUrl,
      cart: [],
      wishlist: [],
      enrolledCourses: [],
      role: "student",
      courseProgress: [], // initialize as empty array
    });
  }

  return user;
}

export const getUserByClerkId = async (clerkId) => {
  await connectDB();
  return await User.findOne({ clerkId });
};

export const getDbUserId = async (clerkId) => {
  await connectDB();
  const user = await User.findOne({ clerkId });
  return user ? user._id : null;
};
