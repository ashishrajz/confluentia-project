"use client"
import AiSuggestion from "@/components/AiSuggestion";
import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  
} from "recharts";
import { RiGeminiFill } from "react-icons/ri";
import { ChartNoAxesCombined } from "lucide-react";
import { FaHistory } from "react-icons/fa";


// Icon components
const InstagramIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 102.881.001 1.44 1.44 0 00-2.881-.001z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CommentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a3 3 0 10-4.516 2.103L12 15.5l-1.2 1.417a3 3 0 00-4.516-2.103m9.032 0a3 3 0 00-2.633-4.026m0 0a3 3 0 00-2.683 0" />
  </svg>
);

const PostIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const TrendUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrendDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const MetricCard = ({ icon, label, value, change, isPositive }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105">
    
    <div className="flex items-center justify-between mb-2">
      <div className="text-gray-500">{icon}</div>
      {change && (
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isPositive ? <TrendUpIcon /> : <TrendDownIcon />}
          {change}%
        </div>
      )}
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

const PlatformAnalyticsCard = ({ platform, icon, gradient, borderColor, metrics, engagementRate }) => (
  <div className={`bg-gradient-to-br ${gradient} rounded-3xl p-6 shadow-lg border-2 ${borderColor} hover:shadow-xl transition-shadow duration-300`}>
    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-12 h-12 rounded-full ${platform === 'Instagram' ? 'bg-pink-500' : 'bg-blue-500'} flex items-center justify-center text-white shadow-md`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{platform}</h3>
    </div>

    {/* Metrics Grid */}
    <div className="grid grid-cols-2 gap-3 mb-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>

    {/* Engagement Rate */}
    <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm border border-white/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChartIcon className="text-gray-600" />
          <span className="text-sm font-medium text-gray-600">Engagement Rate</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-800">{engagementRate.value}%</span>
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            engagementRate.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {engagementRate.isPositive ? <TrendUpIcon /> : <TrendDownIcon />}
            {engagementRate.change}%
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [linkedinPosts, setLinkedinPosts] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const igRes = await fetch("/api/content/instagram");
        const liRes = await fetch("/api/content/linkedin");

        if (!igRes.ok || !liRes.ok) throw new Error("Failed to fetch posts");

        const igData = await igRes.json();
        const liData = await liRes.json();

        setInstagramPosts(igData.contents || []);
        setLinkedinPosts(liData.contents || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);

  // dummy graph data at top
  const data = [
    { name: "Mon", views: 4000, clicks: 2400 },
    { name: "Tue", views: 3000, clicks: 1398 },
    { name: "Wed", views: 2000, clicks: 9800 },
    { name: "Thu", views: 2780, clicks: 3908 },
    { name: "Fri", views: 1890, clicks: 4800 },
    { name: "Sat", views: 2390, clicks: 3800 },
    { name: "Sun", views: 3490, clicks: 4300 },
  ];

  // analytics chart data for popup
  const chartData = [
    {
      name: "24h",
      likes: selectedContent?.analytics?.likes24h || 0,
      comments: selectedContent?.analytics?.comments24h || 0,
    },
    {
      name: "48h",
      likes: selectedContent?.analytics?.likes48h || 0,
      comments: selectedContent?.analytics?.comments48h || 0,
    },
    {
      name: "7d",
      likes: selectedContent?.analytics?.likes7d || 0,
      comments: selectedContent?.analytics?.comments7d || 0,
    },
  ];

  const snippet = (text, max = 90) =>
    text?.length > max ? text.substring(0, max) + "..." : text;

  // Platform metrics data
  const instagramMetrics = [
    { icon: <PostIcon />, label: "Total Posts", value: instagramPosts.length, change: 12, isPositive: true },
    { icon: <HeartIcon />, label: "Likes", value: "2.3K", change: 8, isPositive: true },
    { icon: <CommentIcon />, label: "Comments", value: "342", change: 5, isPositive: false },
    { icon: <ShareIcon />, label: "Shares", value: "128", change: 15, isPositive: true }
  ];

  const linkedinMetrics = [
    { icon: <PostIcon />, label: "Total Posts", value: linkedinPosts.length, change: 10, isPositive: true },
    { icon: <HeartIcon />, label: "Reactions", value: "1.8K", change: 6, isPositive: true },
    { icon: <CommentIcon />, label: "Comments", value: "256", change: 3, isPositive: false },
    { icon: <ShareIcon />, label: "Shares", value: "89", change: 20, isPositive: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
  {/* Page Header */}
  <div className="mb-8">
    <h1 className="text-4xl font-bold text-blue-600 mb-2">Dashboard</h1>
    <p className="text-gray-600">
      Unlock actionable insights and trends to elevate every AI-generated
      post and maximize engagement
    </p>
  </div>

  {/* Action Section */}
  <div className="mb-8 text-center py-12">
    <div className="flex flex-col items-center justify-center text-3xl gap-2 mb-4">
      <RiGeminiFill className="text-pink-400" />
      <h2 className="font-bold text-gray-800 m-0">Smart Actions</h2>
    </div>

    <div className="flex items-center justify-center space-x-4">
      <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold hover:from-blue-500 hover:to-pink-500 transition-colors flex items-center gap-1">
        <ChartNoAxesCombined className="text-gray-100 text-xl" /> Graph Analysis
      </button>

      <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold hover:from-blue-500 hover:to-pink-500 transition-colors flex items-center gap-1">
        <RiGeminiFill className="text-gray-100 text-xl" /> AI Recommendation
      </button>

      <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold hover:from-blue-500 hover:to-pink-500 transition-colors flex items-center gap-1">
        <FaHistory className="text-gray-100 text-xl" /> History
      </button>
    </div>
  </div>
</div>

      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold">Total Posts</h3>
          <p className="text-3xl font-bold mt-2">
            {instagramPosts.length + linkedinPosts.length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold">Engagement Rate</h3>
          <p className="text-3xl font-bold mt-2">72%</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold">Followers Growth</h3>
          <p className="text-3xl font-bold mt-2">+1.2k</p>
        </div>
      </div>

      {/* Platform Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PlatformAnalyticsCard
          platform="Instagram"
          icon={<InstagramIcon />}
          gradient="from-pink-200 via-purple-200 to-pink-400"
          borderColor="border-pink-400"
          metrics={instagramMetrics}
          engagementRate={{ value: 68, change: 4.5, isPositive: true }}
        />
        <PlatformAnalyticsCard
          platform="LinkedIn"
          icon={<LinkedInIcon />}
          gradient="from-blue-200 via-indigo-200 to-blue-400"
          borderColor="border-blue-400"
          metrics={linkedinMetrics}
          engagementRate={{ value: 54, change: 2.3, isPositive: false }}
        />
      </div>

      {/* line chart */}
      <div className="bg-white rounded-3xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Performance Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} />
            <Line type="monotone" dataKey="clicks" stroke="#f59e0b" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Posts */}
      <div className="bg-white rounded-3xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Posts</h2>

        {/* Instagram */}
        <h3 className="text-xl font-semibold mb-3">Instagram Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {instagramPosts.map((content) => (
            <div
              key={content._id}
              className="bg-gradient-to-br from-pink-50 to-purple-50 shadow-sm border border-gray-100 p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedContent(content)}
            >
              <h4 className="font-medium text-gray-700">{snippet(content.idea)}</h4>
            </div>
          ))}
        </div>

        {/* LinkedIn */}
        <h3 className="text-xl font-semibold mb-3">LinkedIn Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {linkedinPosts.map((content) => (
            <div
              key={content._id}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm border border-gray-100 p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedContent(content)}
            >
              <h4 className="font-medium text-gray-700">{snippet(content.idea)}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {selectedContent && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedContent(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Analytics</h2>
            <p className="mb-4">
              <strong>Idea:</strong> {snippet(selectedContent.idea, 80)}
            </p>

            <h3 className="text-lg font-semibold mb-2">Likes & Comments Analytics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="comments" fill="#3b82f6" />
                <Bar dataKey="likes" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      <AiSuggestion/>
    </div>
  );
};

export default DashboardPage;