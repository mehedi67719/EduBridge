import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import {
  Search,
  X,
  Bell,
  Sparkles,
  TrendingUp,
  Calendar as CalendarIcon,
  Filter,
} from "lucide-react";
import { noticeCategory } from "../../../API/Notice/NoticeCategory";
import { loadNotice } from "../../../API/Notice/Notice";
import Useauth from "../../../Hooks/Useauth";
import Loading from "../../../Components/Loading";
import ErrorComponent from "../../../Components/ErrorComponent";

const Notice = () => {
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNotices, setTotalNotices] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { dbUser, loading: authLoading } = Useauth();
  const userRole = dbUser?.userType || "public";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);
        const res = await noticeCategory();
        setCategory(res || []);
        setError(null);
      } catch (error) {
        setError("Failed to load categories");
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await loadNotice(
          selectCategory,
          userRole,
          searchTerm,
          currentPage,
        );

        setNotices(data?.data || []);
        setTotalPages(data?.totalPages || 1);
        setTotalNotices(data?.totalItems || data?.data?.length || 0);
        setError(null);
      } catch (error) {
        setError("Failed to load notices");
        setNotices([]);
        setTotalPages(1);
        setTotalNotices(0);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (!authLoading) {
        fetchNotices();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [selectCategory, searchTerm, userRole, currentPage, authLoading]);

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    const fetchNotices = async () => {
      try {
        const data = await loadNotice(
          selectCategory,
          userRole,
          searchTerm,
          currentPage,
        );
        setNotices(data?.data || []);
        setTotalPages(data?.totalPages || 1);
        setTotalNotices(data?.totalItems || data?.data?.length || 0);
        setError(null);
      } catch (error) {
        setError("Failed to load notices");
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  };

  const isLoading = loading || authLoading;

  return (
    <div className="min-h-screen">
      <div className="container py-6 lg:py-10">
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full"></div>

          <div className="relative text-center">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-md border border-gray-100">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                📢 Notice Board
              </span>
              <div className="w-px h-4 bg-gray-200"></div>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Bell className="w-4 h-4 text-indigo-500" />
                {totalNotices} Notices
              </span>
              <div className="w-px h-4 bg-gray-200"></div>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <CalendarIcon className="w-4 h-4 text-purple-500" />
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Notice Board
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Stay updated with the latest announcements and important updates
            </p>

            <div className="mt-4 flex justify-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium flex items-center gap-1 border border-indigo-100">
                <Sparkles className="w-3 h-3" /> Latest Updates
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1 border border-purple-100">
                <TrendingUp className="w-3 h-3" /> Trending Now
              </span>
              <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-medium flex items-center gap-1 border border-pink-100">
                <Bell className="w-3 h-3" /> 24/7 Access
              </span>
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search
                  className={`w-5 h-5 transition-colors duration-300 ${isSearchFocused ? "text-indigo-500" : "text-gray-400"}`}
                />
              </div>
              <input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search notices by title, category, or content..."
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-gray-200/50 bg-gray-50/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 text-gray-700 placeholder:text-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-6">
              {categoryLoading ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center">
                  <Loading />
                </div>
              ) : (
                <Sidebar
                  category={category}
                  selectcategory={selectCategory}
                  setselectcategory={(cat) => {
                    setSelectCategory(cat);
                    setCurrentPage(1);
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
              <div className="p-4 border-b border-gray-100/80 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800">
                      {selectCategory === "all"
                        ? "All Notices"
                        : selectCategory}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {isLoading
                        ? "Loading..."
                        : `${totalNotices} notices available`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50">
                    <Filter className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {selectCategory === "all"
                        ? "All Categories"
                        : selectCategory}
                    </span>
                  </div>
                  {notices.length > 0 && !isLoading && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs font-medium text-emerald-700">
                        {notices.length} new
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4">
                {error ? (
                  <ErrorComponent error={error} onRetry={handleRetry} />
                ) : isLoading ? (
                  <div className="py-20 flex items-center justify-center">
                    <Loading />
                  </div>
                ) : (
                  <Content
                    notices={notices}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Notice;