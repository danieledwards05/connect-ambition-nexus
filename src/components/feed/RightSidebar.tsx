
import SearchBox from "./SearchBox";
import TrendingTopics from "./TrendingTopics";
import SuggestedStartups from "./SuggestedStartups";

interface TrendingTopic {
  name: string;
  count: number;
}

interface Startup {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  industry: string;
  isPublic: boolean;
}

interface RightSidebarProps {
  trendingTopics: TrendingTopic[];
  suggestedStartups: Startup[];
}

const RightSidebar = ({ trendingTopics, suggestedStartups }: RightSidebarProps) => {
  return (
    <div className="hidden md:block">
      <div className="sticky top-4 space-y-6">
        <SearchBox />
        <TrendingTopics topics={trendingTopics} />
        <SuggestedStartups startups={suggestedStartups} />
      </div>
    </div>
  );
};

export default RightSidebar;
