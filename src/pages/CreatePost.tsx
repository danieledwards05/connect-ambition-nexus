
import Sidebar from "@/components/layout/Sidebar";
import CreatePostForm from "@/components/post/CreatePostForm";

const CreatePost = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 pl-16 md:pl-64 pt-4">
        <div className="container max-w-4xl mx-auto px-4 pb-8">
          <CreatePostForm />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
