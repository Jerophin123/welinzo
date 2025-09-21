'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, User, Mail, Calendar } from 'lucide-react';
import { apiService, Comment } from '@/services/apiService';

interface ProductCommentsProps {
  productId: number;
}

export default function ProductComments({ productId }: ProductCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const data = await apiService.getComments();
        setComments(data);
        
        // If we have comments, select the first post by default
        if (data.length > 0) {
          setSelectedPost(data[0].postId);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // Get unique post IDs from comments
  const postIds = Array.from(new Set(comments.map(comment => comment.postId)));

  // Get comments for selected post
  const selectedPostComments = selectedPost 
    ? comments.filter(comment => comment.postId === selectedPost)
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 md:py-10 px-4 md:px-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 md:w-8 md:h-8 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full relative z-50"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="glass-card ios-rounded-2xl p-4 md:p-8">
      <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6">
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
        <h3 className="text-xl md:text-2xl font-bold text-white">Community Comments ({comments.length})</h3>
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-8 md:py-12">
          <MessageCircle className="w-12 h-12 md:w-16 md:h-16 text-gray-500 mx-auto mb-3 md:mb-4" />
          <p className="text-gray-400 text-sm md:text-lg">No comments available yet.</p>
          <p className="text-gray-500 text-xs md:text-sm mt-1 md:mt-2">Check back later for community discussions!</p>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {/* Post Selection */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {postIds.map((postId) => (
              <motion.button
                key={postId}
                onClick={() => setSelectedPost(postId)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className={`px-3 py-1.5 md:px-4 md:py-2 ios-rounded-lg font-medium transition-all duration-300 text-xs md:text-sm ${
                  selectedPost === postId
                    ? 'glass-button text-white bg-blue-500/20 border-blue-500/30'
                    : 'glass-button text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Post {postId} ({comments.filter(c => c.postId === postId).length} comments)
              </motion.button>
            ))}
          </div>

          {/* Comments List */}
          {selectedPost && (
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-2 mb-3 md:mb-4">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full"></div>
                <h4 className="text-base md:text-lg font-semibold text-white">
                  Post {selectedPost} Comments ({selectedPostComments.length})
                </h4>
              </div>

              {selectedPostComments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card ios-rounded-xl p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start space-x-3 md:space-x-4">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/20">
                        <User className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 mb-2">
                        <h5 className="text-white font-semibold truncate text-sm md:text-base">
                          {comment.name}
                        </h5>
                        <div className="flex items-center space-x-1 text-gray-400 text-xs md:text-sm">
                          <Mail className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="truncate max-w-24 md:max-w-32">{comment.email}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed mb-2 md:mb-3 text-sm md:text-base">
                        {comment.body}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                        <div className="flex items-center space-x-2 text-gray-500 text-xs md:text-sm">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Comment #{comment.id}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-xs md:text-sm font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
