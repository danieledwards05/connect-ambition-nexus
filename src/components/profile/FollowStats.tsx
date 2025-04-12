
interface FollowStatsProps {
  followers: number;
  following: number;
}

const FollowStats = ({ followers, following }: FollowStatsProps) => {
  return (
    <div className="flex mt-4 gap-x-4">
      <div className="bg-secondary/50 px-3 py-1 rounded-md">
        <span className="font-semibold">{followers.toLocaleString()}</span>{" "}
        <span className="text-xs text-muted-foreground">Followers</span>
      </div>
      <div className="bg-secondary/50 px-3 py-1 rounded-md">
        <span className="font-semibold">{following.toLocaleString()}</span>{" "}
        <span className="text-xs text-muted-foreground">Following</span>
      </div>
    </div>
  );
};

export default FollowStats;
