import React, { useState } from "react";
import { BookOpen, User, Award, Calendar, Lock, Paperclip, Eye, Upload, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const AssignmentCard = ({ assignment, statusConfig, priorityConfig, semesterBadgeColor, formatDate }) => {
  const [hovered, setHovered] = useState(false);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-indigo-200 hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`}></div>
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.text} flex items-center gap-1.5`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityConfig.dot}`}></span>
              {priorityConfig.label} Priority
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${semesterBadgeColor}`}>
              📚 {assignment.semester}
            </span>
            {assignment.isPrivate && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Private
              </span>
            )}
            {assignment.attachments > 0 && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                <Paperclip className="w-3 h-3" /> {assignment.attachments}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
            {assignment.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">
            {assignment.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-400" /> {assignment.subject}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-indigo-400" /> {assignment.teacher}
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-400" /> {assignment.totalMarks} Marks
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-400" /> {formatDate(assignment.deadline)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-4 flex-shrink-0">
          <Link 
            to={`/assignment/${assignment.id}`} 
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap group/btn"
          >
            <Eye className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" /> 
            View Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link 
            to={`/assignment/submit/${assignment.id}`} 
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap group/btn2"
          >
            <Upload className="w-4 h-4 group-hover/btn2:-translate-y-1 transition-transform duration-300" /> 
            Submit Assignment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;