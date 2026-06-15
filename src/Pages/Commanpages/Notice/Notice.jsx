import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { Search, Bell, X } from "lucide-react";
import { noticeCategory } from "../../../API/Notice/NoticeCategory";
import { loadNotice } from "../../../API/Notice/Notice";
import Useauth from "../../../Hooks/Useauth";
import Loading from "../../../Components/Loading";

const Notice = () => {
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState(null);

  const { dbUser, loading: authLoading } = Useauth();
  const userRole = dbUser?.userType || "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);
        const res = await noticeCategory();
        setCategory(res || []);
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
      setLoading(true);
      setError(null);
      try {
        const data = await loadNotice(selectCategory, userRole, searchTerm);
        setNotices(data || []);
      } catch (error) {
        setError("Failed to load notices");
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [selectCategory, searchTerm, userRole, authLoading]);

  const clearSearch = () => setSearchTerm("");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 my-8">
        <div className="text-center mb-8">
          <Bell className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Notice Board
          </h1>
          <p className="text-gray-600">
            Stay updated with latest announcements
          </p>
        </div>

        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notice..."
            className="w-full pl-10 pr-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-72 flex-shrink-0">
            {categoryLoading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <Loading />
              </div>
            ) : (
              <Sidebar
                category={category}
                selectcategory={selectCategory}
                setselectcategory={setSelectCategory}
              />
            )}
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {selectCategory === "all"
                        ? "All Notices"
                        : selectCategory}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {!loading && `${notices.length} ${notices.length === 1 ? "notice" : "notices"} found`}
                    </p>
                  </div>
                  {searchTerm && (
                    <div className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                      <span>🔍 Searching: "{searchTerm}"</span>
                      <button
                        onClick={clearSearch}
                        className="hover:bg-indigo-100 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="max-h-[calc(100vh-320px)] overflow-y-auto">
                {loading && authLoading ? <Loading /> : <Content notices={notices} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;