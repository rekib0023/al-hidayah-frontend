import Announcements from "@/components/Announcements";
import Layout from "@/components/Layout";

export default function Home() {
  const announcements = [
    "Announcement 1",
    "Announcement 2",
    "Announcement 3",
    // Add more announcements as needed
  ];

  return (
    <Layout>
      <div className="container-div">
        <h1>Welcome to the Website!</h1>
      </div>
      {/* <Announcements announcements={announcements} /> */}


    </Layout>
  );
}
