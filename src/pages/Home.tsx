import Body from "@/components/Body";
import Search from "@/components/Search";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="bg-white dark:bg-slate-900 border-b border-border shadow-sm">
        <div className="w-full px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">Weather Dashboard</h1>
            <Search />
          </div>
        </div>
      </header>

      <main className="w-full">
        <Body />
      </main>

      <footer className="w-full py-5 px-6 text-center text-sm text-muted-foreground mt-4">
        <p>Weather data provided by WeatherAPI.com</p>
      </footer>
    </div>
  );
};

export default Home;
