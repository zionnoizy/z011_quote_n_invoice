import { auth } from "@/firebase.js";

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  let token = localStorage.getItem('token');
  console.log("any token? " + token);

  if (token) {
    // use token to authenticate user and allow access to requested route
    next()
  } else if (!user) {
    // redirect user to login page if not authenticated and no token present
    next({ name: 'Login' })
  } else {
    // allow access to requested route if user is authenticated and no token present
    next()
  }
}

export { requireAuth }