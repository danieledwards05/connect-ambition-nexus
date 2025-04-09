
const ProfileLoading = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <div className="h-40 bg-muted rounded-t-lg animate-pulse"></div>
        <div className="h-16 bg-card rounded-b-lg shadow-md p-6 pb-10 relative animate-pulse">
          <div className="absolute -top-10 left-6 h-20 w-20 rounded-full bg-muted border-4 border-background animate-pulse"></div>
          <div className="mt-10 space-y-4">
            <div className="h-6 bg-muted rounded-md w-1/3 animate-pulse"></div>
            <div className="h-4 bg-muted rounded-md w-1/4 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="h-60 bg-muted rounded-lg animate-pulse"></div>
    </div>
  );
};

export default ProfileLoading;
