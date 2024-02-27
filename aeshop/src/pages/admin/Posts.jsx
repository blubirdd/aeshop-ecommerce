import React, { useContext } from 'react'
import { useEffect, useState } from "react";
import axiosClient from '../../axios-client.js';
import { UserContext } from '../../context/UserContext.jsx';
import TableHeader from '../../components/admin/TableHeader.jsx';
import Loading from '../../components/others/Loading.jsx';
import PostList from '../../components/admin/PostList.jsx';
import Pagination from '../../components/others/Pagination.jsx';
import ConfirmDialog from '../../components/others/ConfirmDialog.jsx';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const { setNotification } = useContext(UserContext);
  const [confirmDialog, setConfirmDialog] = useState(null);

  useEffect(() => {
    getPosts();
  }, [pagination.currentPage]);

  const onDelete = (post) => {
    setConfirmDialog({
      message: 'Are you sure you want to delete '+ post.title +'?',
      onConfirm: () => handleDeleteConfirmed(post.id),
      onCancel: () => setConfirmDialog(null),
    });
  };


  const handleDeleteConfirmed = (postID) => {
    axiosClient.delete(`/posts/${postID}`)
      .then(() => {
        setNotification('Post successfully deleted');
        getPosts();
      })
      .finally(() => {
        setConfirmDialog(null);
      });
  };

  const getPosts = () => {
    setLoading(true);
    axiosClient
      .get('/posts', { params: { page: pagination.currentPage } })
      .then(({ data }) => {
        setLoading(false);
        setPosts(data.data);
        setPagination({
          currentPage: data.meta.current_page,
          totalPages: data.meta.last_page,
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading &&
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      }

      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}

      {!loading &&
        <div className="posts">
          <TableHeader
            title="Posts"
            createLink="/admin/posts/new"
          />

          <PostList
            posts={posts}
            onDelete={onDelete}
          />

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination({ ...pagination, currentPage: page })}
          />
        </div>
      }
    </>
  )
}

export default Posts