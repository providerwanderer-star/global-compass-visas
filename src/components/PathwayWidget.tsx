import { Link } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PathwayWidget = () => (
  <div className="bg-gradient-to-br from-primary/5 to-gold/5 border border-gold/20 rounded-2xl p-6 md:p-7">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
        <Compass className="h-6 w-6 text-gold" />
      </div>
      <div className="flex-1">
        <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-1">
          Find My Canada Pathway
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Answer 6 quick questions — get a personalised PR, work, or study recommendation in under a minute.
        </p>
        <Link to="/quiz">
          <Button className="bg-gold text-accent-foreground hover:bg-gold-dark font-bold">
            Start the Pathway Quiz <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default PathwayWidget;
