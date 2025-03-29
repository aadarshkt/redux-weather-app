import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchWeather } from "@/redux/thunks/weather";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Search = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.weather);
  const isLoading = status === "loading";

  const handleSubmit = () => {
    if (input.trim() !== "") {
      dispatch(fetchWeather(input));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex w-full md:w-96 items-center p-10">
      <div className="w-full p-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search city or location..."
          disabled={isLoading}
        />
      </div>
      <Button
        className={cn("px-10 py-30")}
        onClick={handleSubmit}
        type="submit"
        disabled={isLoading || input.trim() === ""}>
        <SearchIcon />
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};

export default Search;
