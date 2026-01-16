// the data type user provide
export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  icon?: string;
  link?: string;
}

// Props for the main <Timeline> component
export interface TimelineProps {
  items?: TimelineItem[];
  class?: string;
  lineColor?: string;
  dotColor?: string;
}

// TimelineItemProps - Props for individual <TimelineItem>
// TODO: add the photo and maybe no need the icon
export interface TimelineItemProps {
  date: string;
  title: string;
  description?: string;
  icon?: string;
  link?: string;
  isLast?: boolean; // Internal: hides connector line on last item
}
