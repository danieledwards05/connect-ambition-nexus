
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface TrendingTopic {
  name: string;
  count: number;
}

interface TrendingTopicsProps {
  topics: TrendingTopic[];
}

const TrendingTopics = ({ topics }: TrendingTopicsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Trending Topics</CardTitle>
          <TrendingUp size={18} className="text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {topics.map((topic) => (
            <li key={topic.name} className="flex items-center justify-between">
              <Badge variant="secondary" className="hover:bg-secondary/80">
                #{topic.name}
              </Badge>
              <span className="text-xs text-muted-foreground">{topic.count} posts</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
