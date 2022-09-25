### About

- This web application was created in the process of learning the React library and using Firebase as DB.
- The application can be tested from the [link](https://s1een.github.io/react-chat-app/ "link")

You can use a test account or create your own.
- Login Info: r3ason@gmail.com 12312322

# React Chat App with Firebase

![](https://itproger.com/img/courses/1648997560.png)

## Technologies used in the development:

- [![React][react.js]][react-url]
- [![Firebase][Firebase.js]][Firebase-url]
- [![npm][npm.com]][npm-url]

## React

The app was built in React v.18.2.0.

`$ npx create-react-app react-chat-app`

## React Context API

AuthContext:

```javascript
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

ChatContext:

```javascript
export const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
```

## React Navigation

```javascript
function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/react-chat-app/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/react-chat-app">
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

## Pages

### HomePage:

```javascript
function HomePage() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
```

### LoginPage:
Render:
```javascript
return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Login</span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button disabled={loading || error}>Sign In</button>
          {error && (
            <div className="auth-error-container">
              <h3>Oops,something went wrong...</h3>
              <div className="auth-error-line-container">
                <div className="auth-error-line"></div>
              </div>
            </div>
          )}
          {loading && (
            <div className="loading-container">
              <h3>Loading, please wait...</h3>
              <div className="loading-line-container">
                <div className="loading-line"></div>
              </div>
            </div>
          )}
        </form>
        <p>
          You don't have an account?{" "}
          <Link to="/react-chat-app/register">Register</Link>
        </p>
      </div>
    </div>
  );
```

States:

```javascript
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
```

HandleSubmit:

```javascript
async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        setLoading(false);
        navigate("/react-chat-app");
      }, 6000);
    } catch (err) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
    }
  }
```
### RegisterPage:
Render:

```javascript
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input className="file-load" type="file" id="file" />
          <label htmlFor="file">
            <img src={addAvatar} alt="add avatar img" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading || error}>Sign Up</button>
          {error && (
            <div className="auth-error-container">
              <h3>Oops,something went wrong...</h3>
              <div className="auth-error-line-container">
                <div className="auth-error-line"></div>
              </div>
            </div>
          )}
          {loading && (
            <div className="loading-container">
              <h3>Loading, please wait...</h3>
              <div className="loading-line-container">
                <div className="loading-line"></div>
              </div>
            </div>
          )}
        </form>
        <p>
          You do have an account? <Link to="/react-chat-app/login">Login</Link>
        </p>
      </div>
    </div>
  );
```

States:

```javascript
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
```

HandleSubmit:

```javascript
async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    let file = e.target[3].files[0];
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            if (typeof file === "undefined") {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL:
                  "https://firebasestorage.googleapis.com/v0/b/chat-app-efec9.appspot.com/o/noAvatar.png?alt=media&token=a9a9c083-183a-4f3f-b85b-b02fb18a2861",
              });
            } else {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
            }

            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setTimeout(() => {
              setLoading(false);
              navigate("/react-chat-app");
            }, 6000);
          } catch (err) {
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
    }
  }
```

## Acknowledgments

Resources that helped me in development.

- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [Firebase](https://firebase.google.com/)

## My Links

- [![linkedin][linkedin.com]][linkedin-url]
- [![telegram][telegram.com]][telegram-url]
- [![portfolio][portfolio.com]][portfolio-url]
  <!-- MARKDOWN LINKS & IMAGES -->
  <!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
  [product-screenshot]: images/main.png
  [react.js]: https://img.shields.io/badge/React_18.2.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
  [react-url]: https://reactjs.org/
  [Firebase.js]: https://img.shields.io/badge/Firebase-20232A?style=for-the-badge&logo=firebase&logoColor=FFCB2B
  [Firebase-url]: https://firebase.google.com/
  [npm.com]: https://img.shields.io/badge/NPM-20232A?style=for-the-badge&logo=npm&logoColor=764abc
  [npm-url]: https://www.npmjs.com/
  [linkedin.com]: https://img.shields.io/badge/LinkedIn-20232A?style=for-the-badge&logo=linkedin&logoColor=wgute
  [linkedin-url]: https://www.linkedin.com/in/dmitry-morozov-082288228/
  [telegram.com]: https://img.shields.io/badge/Telegram-20232A?style=for-the-badge&logo=telegram&logoColor=white
  [telegram-url]: https://t.me/r3ason_why
  [portfolio.com]: https://img.shields.io/badge/Portfolio-20232A?style=for-the-badge&logo=github&logoColor=white
  [portfolio-url]: https://s1een.github.io/my_cv_site/
