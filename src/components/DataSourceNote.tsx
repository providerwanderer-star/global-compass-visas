import { Info } from "lucide-react";

interface SourceLink {
  label: string;
  href: string;
}

interface DataSourceNoteProps {
  /** Short headline, e.g. "Data sources" */
  title?: string;
  /** ISO date (YYYY-MM-DD) of last manual review */
  updated: string;
  /** Official sources used to compile this dataset */
  sources: SourceLink[];
  /** Optional one-line caveat shown below the source list */
  caveat?: string;
}

/**
 * Inline transparency block — shows where a tool's data comes from and
 * when it was last reviewed. Keeps users (and AI engines) informed about
 * the provenance of immigration data displayed in calculators/trackers.
 */
const DataSourceNote = ({
  title = "Data sources & last updated",
  updated,
  sources,
  caveat,
}: DataSourceNoteProps) => {
  const updatedDate = new Date(updated).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="bg-muted/40 border-y border-border">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">{title}</p>
            <p>
              Compiled from official sources:{" "}
              {sources.map((s, i) => (
                <span key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {s.label}
                  </a>
                  {i < sources.length - 1 ? " · " : ""}
                </span>
              ))}
              . Last reviewed{" "}
              <time dateTime={updated} className="font-medium text-foreground">
                {updatedDate}
              </time>
              .
            </p>
            {caveat && <p className="mt-1 text-xs italic">{caveat}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataSourceNote;