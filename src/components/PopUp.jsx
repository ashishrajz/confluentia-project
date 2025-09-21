'use client';
import { RiQuillPenAiLine, RiGeminiFill } from "react-icons/ri";
import { HiOutlinePhoto, HiOutlineVideoCamera } from "react-icons/hi2";
import { useRouter } from "next/navigation";

const PopUp = ({ onClose }) => {
  const router = useRouter();

  const handleContentCreation = () => {
    router.push("/content-generation");
    onClose();
  };

  const handleImageGeneration = () => {
    router.push("/image");
    onClose();
  };

  const handleVideoGeneration = () => {
    router.push("/generate-video"); // <-- redirect to video page
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="w-96 min-h-[250px] relative p-1 rounded-xl shadow-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl"
          style={{ animation: "spin 5s linear infinite" }}
        ></div>

        <div className="relative w-full h-full p-6 rounded-[11px] bg-white flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-4 text-blue-500">
            <RiGeminiFill className="text-3xl transition-transform duration-500 hover:rotate-180" />
            <h2 className="text-2xl font-bold text-gray-800">Create Something New</h2>
          </div>

          <p className="text-center text-gray-600 mb-6">
            Choose a creation type to get started.
          </p>

          <div className="flex flex-col gap-4 w-full">
            <button
              onClick={handleContentCreation}
              className="group py-3 px-4 bg-gray-100 hover:bg-blue-50 rounded-lg font-medium transition duration-300 flex items-center justify-between text-gray-700 hover:text-blue-500 border border-gray-200 hover:border-blue-300"
            >
              <span className="flex items-center gap-2">
                <RiQuillPenAiLine className="text-xl group-hover:animate-pulse" />
                Content Creation
              </span>
              <span className="ml-auto text-sm text-gray-400 group-hover:text-blue-500/80">
                AI Writer
              </span>
            </button>

            <button
              onClick={handleImageGeneration}
              className="group py-3 px-4 bg-gray-100 hover:bg-pink-50 rounded-lg font-medium transition duration-300 flex items-center justify-between text-gray-700 hover:text-pink-500 border border-gray-200 hover:border-pink-300"
            >
              <span className="flex items-center gap-2">
                <HiOutlinePhoto className="text-xl group-hover:animate-pulse" />
                Image Generation
              </span>
              <span className="ml-auto text-sm text-gray-400 group-hover:text-pink-500/80">
                AI Artist
              </span>
            </button>

            <button
              onClick={handleVideoGeneration} // updated handler
              className="group py-3 px-4 bg-gray-100 hover:bg-purple-50 rounded-lg font-medium transition duration-300 flex items-center justify-between text-gray-700 hover:text-purple-500 border border-gray-200 hover:border-purple-300"
            >
              <span className="flex items-center gap-2">
                <HiOutlineVideoCamera className="text-xl group-hover:animate-pulse" />
                Video Generation
              </span>
              <span className="ml-auto text-sm text-gray-400 group-hover:text-purple-500/80">
                AI Creator
              </span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
