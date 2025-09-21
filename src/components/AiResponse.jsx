import { RiGeminiFill } from "react-icons/ri";
const AiResponse = () => {
  return (
    <div >
{/* AI Suggestions Section */}
<div className="max-w-5xl mx-auto mt-12 p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200">
  <h3 className="text-2xl font-bold text-gray-800 mb-4"><RiGeminiFill className="text-3xl text-pink-400 mb-2" />AI Suggestions</h3>

  <div className="space-y-4">
    {/* Suggestion: Best Time to Post */}
    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
      <h4 className="text-lg font-semibold text-blue-700 mb-1">Best Time to Post</h4>
      <p className="text-gray-700 text-sm">
        Based on previous history and engagement data, we recommend posting at <span className="font-semibold">6 PM IST</span> for maximum reach.
      </p>
    </div>

    {/* Suggestion: Other AI Tips */}
    <div className="p-4 bg-green-50 rounded-xl border border-green-100 shadow-sm">
      <h4 className="text-lg font-semibold text-green-700 mb-1">Content Tip</h4>
      <p className="text-gray-700 text-sm">
        Using a friendly and approachable tone usually increases engagement on social platforms like Instagram and TikTok.
      </p>
    </div>

    {/* Suggestion: Hashtag / Keywords Tip */}
    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 shadow-sm">
      <h4 className="text-lg font-semibold text-yellow-700 mb-1">Hashtag Recommendation</h4>
      <p className="text-gray-700 text-sm">
        Including relevant hashtags such as <span className="font-semibold">#AI #ContentCreation #SocialMediaTips</span> can improve discoverability.
      </p>
    </div>
  </div>
</div>


      
    </div>
  )
}

export default AiResponse
