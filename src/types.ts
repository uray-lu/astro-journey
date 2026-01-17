// The data type users provide for each timeline entry
export interface TimelineEntry {
  date: string;
  title: string;
  description?: string;
  link?: string;
  image?: string;
}

// Props for the main <Timeline> component
export interface TimelineProps {
  items?: TimelineEntry[];
  class?: string;
  lineColor?: string;
  dotColor?: string;
  titleColor?: string;
  titleHover?: string;
  descColor?: string;
  dateColor?: string;
}

// Props for individual <TimelineItem>
export interface TimelineItemProps {
  date: string;
  title: string;
  description?: string;
  link?: string;
  image?: string;
  isLast?: boolean; // Internal: hides connector line on last item
  lineHeight?: number; // Internal: calculated line height in rem
}
