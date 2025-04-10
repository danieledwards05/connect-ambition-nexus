
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FeedTabsProps {
  children: React.ReactNode;
}

const FeedTabs = ({ children }: FeedTabsProps) => {
  return (
    <div className="mb-4">
      <Tabs defaultValue="feed">
        <TabsList className="w-full">
          <TabsTrigger value="feed" className="flex-1">For You</TabsTrigger>
          <TabsTrigger value="following" className="flex-1">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          {children}
        </TabsContent>
        <TabsContent value="following">
          <div className="text-center py-8 text-muted-foreground">
            No posts from followed users yet.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedTabs;
