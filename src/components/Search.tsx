import { useState, KeyboardEvent, useEffect, useRef } from "react";
import { Clock, Check } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { fetchWeather } from "@/redux/thunks/weather";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { addSearchItem } from "@/redux/slices/search";

const Search = () => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.weather);
  const isLoading = status === "loading";

  // Get suggestions from Redux store
  const suggestions = useAppSelector((state) => state.search.searches).filter((s) => s.trim() !== "");

  const handleSubmit = () => {
    if (input.trim() !== "") {
      dispatch(fetchWeather(input));
      dispatch(addSearchItem(input));
    }
  };

  const handleSelectItem = (value: string) => {
    setInput(value);
    dispatch(fetchWeather(value));
    dispatch(addSearchItem(value));
    setIsOpen(false);
  };

  // Close command menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex w-full md:w-96 items-center gap-2">
      <div className="relative flex-1" ref={commandRef}>
        <Command className="rounded-lg border shadow-md w-full">
          <div className="flex items-center border-b px-3">
            <CommandInput
              placeholder="Search city or location..."
              value={input}
              onValueChange={setInput}
              onFocus={() => setIsOpen(true)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleSubmit();
                  setIsOpen(false);
                }
              }}
              className="flex-1"
              disabled={isLoading}
            />
          </div>
          {isOpen && (suggestions.length > 0 || input.trim() !== "") && (
            <CommandList className="absolute top-full left-0 right-0 z-50 mt-1 max-h-[200px] overflow-auto bg-popover rounded-md border shadow-md">
              <CommandEmpty>No previous searches found.</CommandEmpty>
              {suggestions.length > 0 && (
                <CommandGroup heading="Recent Searches">
                  {suggestions.map((suggestion) => (
                    <CommandItem key={suggestion} value={suggestion} onSelect={handleSelectItem}>
                      <Clock className="mr-2 h-4 w-4 opacity-50" />
                      <span>{suggestion}</span>
                      {input === suggestion && <Check className="ml-auto h-4 w-4" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          )}
        </Command>
      </div>

      <Button
        onClick={() => {
          handleSubmit();
          setIsOpen(false);
        }}
        type="submit"
        className="h-9 px-6 text-base font-medium"
        disabled={isLoading || input.trim() === ""}>
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};

export default Search;
