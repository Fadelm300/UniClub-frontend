import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import authService from './services/authService';
import postService from './services/postService';


// Components
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import LandingReal from './components/LandingReal/LandingReal';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm'
import PostList from './components/PostList/PostList';
import PostDetails from './components/PostDetails/PostDetails';
import PostForm from './components/PostForm/PostForm';
import Footer from './components/footer/footer';



import Help from "./components/Help/help";
import About from "./components/About/about";
import Contact from "./components/Contact/contact";



const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [posts, setPosts] = useState([]);
  // const [channel, setChannel] = useState([]);
  const navigate = useNavigate();

  // useEffect(()=>{
  //   // async function getPosts (){
  //   //   const postsData = await postService.index()
  //   //   setPosts(postsData)
  //   // }
  //   async function getChannel (){
  //     const channelData = await channelService.index()
  //     setChannel(channelData)
  //   }
  //   // if(user){
  //   //   // fetch the posts
  //   //   // getPosts()
  //     getChannel()
  //   // }
  // }, [channel])

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }

  const handleAddPost = async (formData) => {
    const newPost = await postService.create(formData);
    setPosts([...posts, newPost])
    navigate('/posts');
  }

  const handleDeletePost = async (postId) => {
    const deletedPost = await postService.delete(postId);
    setPosts(posts.filter(post => post._id !== deletedPost._id))
    navigate('/posts');
  };

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout}/>
      <Routes>
        { user ? (
          // Protected Routes:
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/posts" element={<PostList posts={posts}/>} />
            <Route path="/posts/:postId" element={<PostDetails user={user} handleDeletePost={handleDeletePost}/>} />
            <Route
              path="/posts/new"
              element={<PostForm handleAddPost={handleAddPost} />}
            />
                 <Route path="/" element={<LandingReal  />} />
            <Route path="/:uni" element={<Landing  />} />
            <Route path="/:uni/:college" element={<Landing  />} />
            <Route path="/:uni/:college/:major" element={<Landing  />} />
            <Route path="/:uni/:college/:major/:course" element={<Landing  />} />
            <Route path="/:uni/:college/:major/:course/:event" element={<Landing  />} />
           

          </>
        ) : (
            // Public Route:
            <>
            <Route path="/" element={<LandingReal  />} />
            <Route path="/:uni" element={<Landing  />} />
            <Route path="/:uni/:college" element={<Landing  />} />
            <Route path="/:uni/:college/:major" element={<Landing  />} />
            <Route path="/:uni/:college/:major/:course" element={<Landing  />} />
            <Route path="/:uni/:college/:major/:course/:event" element={<Landing  />} />



            </>
            

        )}


        <Route path="/signup" element={<SignupForm setUser={setUser}/>} />
        <Route path="/signin" element={<SigninForm setUser={setUser}/>} />


          <Route path="/help" element={<Help/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>

      </Routes>
      
      <Footer/>
    </>
  );
};

export default App;