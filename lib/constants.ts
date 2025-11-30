export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    title: "React Conf 2025",
    image: "/images/event1.png",
    slug: "react-conf-2025",
    location: "San Francisco, CA",
    date: "2025-03-15",
    time: "9:00 AM",
  },
  {
    title: "Next.js Conference",
    image: "/images/event2.png",
    slug: "nextjs-conference-2025",
    location: "San Francisco, CA",
    date: "2025-04-20",
    time: "10:00 AM",
  },
  {
    title: "DevWorld Hackathon",
    image: "/images/event3.png",
    slug: "devworld-hackathon-2025",
    location: "New York, NY",
    date: "2025-05-10",
    time: "8:00 AM",
  },
  {
    title: "Web3 Summit",
    image: "/images/event4.png",
    slug: "web3-summit-2025",
    location: "Austin, TX",
    date: "2025-06-05",
    time: "9:30 AM",
  },
  {
    title: "AI & Machine Learning Expo",
    image: "/images/event5.png",
    slug: "ai-ml-expo-2025",
    location: "Seattle, WA",
    date: "2025-07-18",
    time: "10:00 AM",
  },
  {
    title: "Full Stack Developers Meetup",
    image: "/images/event6.png",
    slug: "fullstack-meetup-2025",
    location: "Boston, MA",
    date: "2025-08-22",
    time: "6:00 PM",
  },
];

