// The data type users provide for each timeline entry
export interface TimelineEntry {
  date: string;
  title: string;
  description?: string;
  link?: string;
}

// Layout options: 'default' (date in content) or 'split' (date on left)
export type TimelineLayout = 'default' | 'split';

// Props for the main <Timeline> component
export interface TimelineProps {
  items?: TimelineEntry[];
  class?: string;
  lineColor?: string;
  dotColor?: string;
  layout?: TimelineLayout;
}

// Props for individual <TimelineItem>
export interface TimelineItemProps {
  date: string;
  title: string;
  description?: string;
  link?: string;
  isLast?: boolean; // Internal: hides connector line on last item
  layout?: TimelineLayout; // Internal: passed from parent Timeline
}
