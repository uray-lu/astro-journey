// The data type users provide for each timeline entry
export interface TimelineEntry {
  date: string;
  title: string;
  description?: string;
  link?: string;
}

// Props for the main <Timeline> component
export interface TimelineProps {
  items?: TimelineEntry[];
  class?: string;
  lineColor?: string;
  dotColor?: string;
  titleHover?: string;
}

// Props for individual <TimelineItem>
export interface TimelineItemProps {
  date: string;
  title: string;
  description?: string;
  link?: string;
  isLast?: boolean; // Internal: hides connector line on last item
}
