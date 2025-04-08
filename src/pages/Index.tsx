
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Check if we have a current user
  const currentUser = localStorage.getItem('currentUser');
  
  // Redirect to the feed if logged in, auth page if not
  return currentUser ? <Navigate to="/feed" replace /> : <Navigate to="/" replace />;
};

export default Index;
