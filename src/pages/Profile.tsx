
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileLoading from "@/components/profile/ProfileLoading";
import { useProfileData } from "@/hooks/useProfileData";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile, posts, isLoading, isCurrentUser } = useProfileData(id);
  
  // If no ID was provided and no current user exists, redirect to auth
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!id && !currentUser) {
      navigate('/');
    }
  }, [id, navigate]);
  
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-4">
        {isLoading ? (
          <ProfileLoading />
        ) : profile ? (
          <>
            <ProfileHeader profile={profile} isCurrentUser={isCurrentUser} />
            <ProfileTabs profile={profile} posts={posts} />
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Profile not found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
