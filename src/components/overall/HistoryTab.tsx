
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HistoryTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Score History</CardTitle>
        <CardDescription>See how your Overall Score has changed over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <p className="text-muted-foreground">Score history chart will be displayed here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryTab;
