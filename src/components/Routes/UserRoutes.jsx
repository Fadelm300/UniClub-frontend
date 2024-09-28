import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import PostForm from '../PostForm/PostForm';
import FileForm from '../FileForm/FileForm';
import ChannelForm from '../Channel/ChannelForm';
import UserProfile from '../UserProfile/UserProfile';

function UserRoutes({user , handleAddPost , handleAddFile}) {
  return (
    <>
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/" element={<Dashboard user={user} />} />

            {/* //add post */}
            <Route
              path="/:uni/newpost"
              element={<PostForm handleAddPost={handleAddPost} />}
            />
            <Route
              path="/:uni/:college/newpost"
              element={<PostForm handleAddPost={handleAddPost} />}
            />
            <Route
              path="/:uni/:college/:major/newpost"
              element={<PostForm handleAddPost={handleAddPost} />}
            />
            <Route
              path="/:uni/:college/:major/:course/newpost"
              element={<PostForm handleAddPost={handleAddPost} />}
            />
            <Route
              path="/:uni/:college/:major/:course/:event/newpost"
              element={<PostForm handleAddPost={handleAddPost} />}
            />


            {/* add file */}
            <Route
              path="/:uni/newfile"
              element={<FileForm handleAddFile={handleAddFile} />}
            />
            <Route
              path="/:uni/:college/newfile"
              element={<FileForm handleAddFile={handleAddFile} />}
            />
            <Route
              path="/:uni/:college/:major/newfile"
              element={<FileForm handleAddFile={handleAddFile} />}
            />
            <Route
              path="/:uni/:college/:major/:course/newfile"
              element={<FileForm handleAddFile={handleAddFile} />}
            />
          

    </>
  )
}

export default UserRoutes