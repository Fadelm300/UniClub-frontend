import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import authService from './services/authService';
import postService from './services/postService';
import channelService from './services/channelService';
import FileService from './services/FileService';


// Components
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import LandingReal from './components/LandingReal/LandingReal';
import Dashboard from './components/Dashboard/Dashboard';
// import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm'
import PostList from './components/PostList/PostList';
import PostDetails from './components/PostDetails/PostDetails';
import PostForm from './components/PostForm/PostForm';
import FileForm from './components/FileForm/FileForm';

import Footer from './components/footer/footer';

import ChannelForm from './components/Channel/ChannelForm';
import UserProfile from './components/UserProfile/UserProfile';


import Help from "./components/Help/help";
import About from "./components/About/about";
import Contact from "./components/Contact/contact";
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy"
import AffiliateProgram from "./components/AffiliateProgram/AffiliateProgram"
import OurServices from "./components/OurServices/OurServices"
import FAQ from "./components/FAQ/FAQ"
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import GPAStudent from "./components/GPA/GPAStudent";
const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [posts, setPosts] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();


  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }

  const handleAddPost = async (formData,path) => {
    const newPost = await postService.create(formData , path);
    setPosts([...posts, newPost]);
    navigate(path);
  }
  const handleAddFile = async (formData,path) => {
    const newFile = await FileService.create(formData , path);
    setFiles([...files, newFile]);
    navigate(path);
  }





// add channel 
  const handleAddchannel = async (formData,path) => {
    const newPost = await channelService.create(formData , path);
    setPosts([...posts, newPost])
    navigate(path);
  }


  const handleDeletePost = async (postId, path) => {
    const deletedPost = await postService.delete(postId, path);

    setPosts(posts.filter(post => post._id !== deletedPost._id));
    navigate(path);
  };

  const handleDeleteFile = async (fileId, path) => {
    const deletedFile = await FileService.delete(fileId, path);

    setFiles(files.filter((file) => file._id !== deletedFile._id));

  };


  const handleUpdateFile = async (formData, fileId, path) => {
    const updateFile = await FileService.updateFile(formData, fileId, path);
  };

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      {/* Scroll to top of page */}
      <ScrollToTop />
      <Routes>
        {user ? (
          // Protected Routes:
          <>
            <Route path="/profile/:userId" element={<UserProfile />} />

            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/posts" element={<PostList posts={posts} />} />
            <Route
              path="/posts/:postId"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route path="/posts/new" element={<PostForm />} />

            <Route path="/" element={<LandingReal />} />

            <Route
              path="/:uni"
              element={
                <Landing
                  user={user}
                  handleDeleteFile={handleDeleteFile}
                  handleUpdateFile={handleUpdateFile}
                />
              }
            />
            <Route
              path="/:uni/:college"
              element={
                <Landing
                  user={user}
                  handleDeleteFile={handleDeleteFile}
                  handleUpdateFile={handleUpdateFile}
                />
              }
            />
            <Route
              path="/:uni/:college/:major"
              element={
                <Landing
                  user={user}
                  handleDeleteFile={handleDeleteFile}
                  handleUpdateFile={handleUpdateFile}
                />
              }
            />
            <Route
              path="/:uni/:college/:major/:course"
              element={
                <Landing
                  user={user}
                  handleDeleteFile={handleDeleteFile}
                  handleUpdateFile={handleUpdateFile}
                />
              }
            />
            <Route
              path="/:uni/:college/:major/:course/:event"
              element={
                <Landing
                  user={user}
                  handleDeleteFile={handleDeleteFile}
                  handleUpdateFile={handleUpdateFile}
                />
              }
            />

            <Route
              path="/:uni/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/:major/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/:major/:course/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/:major/:course/:event/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />

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

            {/* add channel */}
            <Route
              path="/:uni/newchannel"
              element={<ChannelForm handleAddchannel={handleAddchannel} />}
            />
            <Route
              path="/:uni/:college/newchannel"
              element={<ChannelForm handleAddchannel={handleAddchannel} />}
            />
            <Route
              path="/:uni/:college/:major/newchannel"
              element={<ChannelForm handleAddchannel={handleAddchannel} />}
            />
            <Route
              path="/:uni/:college/:major/:course/newchannel"
              element={<ChannelForm handleAddchannel={handleAddchannel} />}
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
        ) : (
          // Public Route:
          <>
            <Route path="/" element={<LandingReal />} />
            <Route path="/:uni" element={<Landing user={user} />} />
            <Route path="/:uni/:college" element={<Landing user={user} />} />
            <Route
              path="/:uni/:college/:major"
              element={<Landing user={user} />}
            />
            <Route
              path="/:uni/:college/:major/:course"
              element={<Landing user={user} />}
            />
            <Route
              path="/:uni/:college/:major/:course/:event"
              element={<Landing user={user} />}
            />

            <Route
              path="/:uni/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/:major/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/:major/:course/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/:major/:course/:event/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
          </>
        )}

        {/* <Route path="/signup" element={<SignupForm setUser={setUser} />} /> */}
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />

        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/AffiliateProgram" element={<AffiliateProgram />} />
        <Route path="/OurServices" element={<OurServices />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/GPAStudent" element={<GPAStudent />} />

      </Routes>

      <Footer />
    </>
  );
};

export default App;