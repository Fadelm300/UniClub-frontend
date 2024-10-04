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
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
// import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm'
import PostList from './components/PostList/PostList';
import PostDetails from './components/PostDetails/PostDetails';
import PostForm from './components/PostForm/PostForm';
import FileForm from './components/FileForm/FileForm';

import Footer from './components/footer/footer';

import ChannelForm from './components/Channel/ChannelForm';
import UserProfile from './components/UserProfile/UserProfile';
import OtherProfile from './components/UserProfile/OtherProfile'

import Help from "./components/Help/help";
import About from "./components/About/about";
import Contact from "./components/Contact/contact";
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy"
import AffiliateProgram from "./components/AffiliateProgram/AffiliateProgram"
import OurServices from "./components/OurServices/OurServices"
import FAQ from "./components/FAQ/FAQ"
import ScrollToTop from './components/ScrollToTop/ScrollToTop';


import GPAStudent from "./components/GPA/GPAStudent";
import UserList from "./components/UserList/UserList";
import UserListUser from './components/UserList/UserListUser';
import AddEvent from './components/Events/AddEvent/AddEvent';
import EditEvent from './components/Events/EditEvent/EditEvent';

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
      {user?.admin?
       <>
       <Route path="/" element={<AdminDashboard user={user} />} />

       <Route path="/userlist" element={<UserList userUser={user} />}  />
       <Route path="/edit-event/:eventid" element={<EditEvent user={user} />} />
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
       

       </> 
      :
      <>

      </>
      }

      {user?
      <>

      <Route path="/" element={<Dashboard user={user} />} />

      <Route path="/userlist" element={<UserListUser userUser={user}/>} />
      <Route path="/profile/:userId" element={<UserProfile />} />
      <Route path="/userlist/:userId" element={<OtherProfile userUser={user}/>} />
 

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
     :
      <>
      <Route path="/signin" element={<SigninForm setUser={setUser} end />} />
      <Route path="/" element={<LandingReal user={user}/>} />
      </>
        
      }
      
      <>
            {/* view channels */}
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

            {/* view post */}
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
        {/* other stuff */}
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/AffiliateProgram" element={<AffiliateProgram />} />
        <Route path="/OurServices" element={<OurServices />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/GPAStudent" element={<GPAStudent />} />

        <Route path="/UserList" element={<UserList />} />
        <Route path="/AddEvent" element={<AddEvent />} />




    </>
      
      </Routes>
      <Footer />
    </>
  );
};

export default App;