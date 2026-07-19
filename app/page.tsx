import TopNavbar from "@/components/TopNavbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import NoticeScroller from "@/components/NoticeScroller";
import AchievementsSection from "@/components/AchievementsSection";

async function getHomeData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/home`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    return null;
  }
}

async function getNotices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notices`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    return [];
  }
}

async function getAchievements() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/achievements`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const homeData = await getHomeData();
  const notices = await getNotices();
  const achievements = await getAchievements();

  return (
    <>
      <TopNavbar />
      <NoticeScroller notices={notices} />
      <Hero data={homeData} />
      <AchievementsSection achievements={achievements} />
      <Footer />
      <FloatingButtons />
    </>
  );
}