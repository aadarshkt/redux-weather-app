import { useAppSelector } from "../hooks/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";

// Update interfaces to match actual API response
interface LocationData {
  name: string;
  country: string;
  localtime: string;
  region: string;
}

interface AirQualityData {
  "us-epa-index": number;
  pm2_5: number;
  pm10: number;
  co: number;
  no2: number;
  o3: number;
  so2: number;
}

interface CurrentData {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  condition: {
    text: string;
    icon: string;
  };
  humidity: number;
  wind_kph: number;
  pressure_mb: number;
  vis_km: number;
  uv: number;
  cloud: number;
  air_quality: AirQualityData;
}

interface WeatherData {
  location: LocationData;
  current: CurrentData;
}

const Body = () => {
  const { data, status } = useAppSelector((state) => state.weather);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-130px)] p-3">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (status === "failed" || !data) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-130px)] p-3">
        <Card className="w-full border border-muted shadow-lg">
          <CardHeader className="p-6">
            <CardTitle className="text-center text-2xl">No Weather Data</CardTitle>
            <CardDescription className="text-center text-base mt-2">
              Search for a location to see weather information
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Extract relevant data
  const { location, current } = data as WeatherData;

  // Function to determine air quality label
  const getAirQualityLabel = (index: number) => {
    switch (index) {
      case 1:
        return { label: "Good", variant: "outline" as const };
      case 2:
        return { label: "Moderate", variant: "secondary" as const };
      case 3:
        return { label: "Unhealthy for Sensitive Groups", variant: "destructive" as const };
      case 4:
        return { label: "Unhealthy", variant: "destructive" as const };
      case 5:
        return { label: "Very Unhealthy", variant: "destructive" as const };
      case 6:
        return { label: "Hazardous", variant: "destructive" as const };
      default:
        return { label: "Unknown", variant: "outline" as const };
    }
  };

  const airQuality = getAirQualityLabel(current.air_quality["us-epa-index"]);

  // Format local time
  const formattedTime = new Date(location.localtime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex flex-col p-3">
      <Card className="w-full border border-muted shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-slate-900 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-primary">{location.name}</h2>
              <p className="text-lg text-muted-foreground">
                {location.region}, {location.country}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{formattedTime} • Local Time</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={`https:${current.condition.icon}`} alt={current.condition.text} className="w-24 h-24" />
              <p className="text-sm font-medium text-center">{current.condition.text}</p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col space-y-5">
            {/* Temperature Section */}
            <div className="flex justify-between items-center dark:bg-slate-900 rounded-lg p-5">
              <div className="space-y-2">
                <p className="text-5xl font-bold text-primary-foreground">
                  {current.temp_c}°<span className="text-2xl">C</span>
                </p>
                <p className="text-sm text-muted-foreground">Feels like {current.feelslike_c}°C</p>
              </div>
              <div className="space-y-2 text-right">
                <p className="text-2xl text-primary-foreground">
                  {current.temp_f}°<span className="text-lg">F</span>
                </p>
                <p className="text-sm text-muted-foreground">Feels like {current.feelslike_f}°F</p>
              </div>
            </div>

            <Separator className="my-3" />

            {/* Weather Details Grid */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Weather Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="text-xl font-medium">{current.humidity}%</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Wind</p>
                  <p className="text-xl font-medium">{current.wind_kph} km/h</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Pressure</p>
                  <p className="text-xl font-medium">{current.pressure_mb} mb</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Visibility</p>
                  <p className="text-xl font-medium">{current.vis_km} km</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">UV Index</p>
                  <p className="text-xl font-medium">{current.uv}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Cloud Cover</p>
                  <p className="text-xl font-medium">{current.cloud}%</p>
                </div>
              </div>
            </div>

            <Separator className="my-3" />

            {/* Air Quality Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Air Quality</h3>
              <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">US EPA Index</span>
                  <Badge variant={airQuality.variant}>{airQuality.label}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">PM2.5</p>
                    <p className="text-base font-medium">{current.air_quality.pm2_5.toFixed(1)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">PM10</p>
                    <p className="text-base font-medium">{current.air_quality.pm10.toFixed(1)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">CO</p>
                    <p className="text-base font-medium">{current.air_quality.co.toFixed(1)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">NO2</p>
                    <p className="text-base font-medium">{current.air_quality.no2.toFixed(1)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">O3</p>
                    <p className="text-base font-medium">{current.air_quality.o3.toFixed(1)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">SO2</p>
                    <p className="text-base font-medium">{current.air_quality.so2.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Body;
