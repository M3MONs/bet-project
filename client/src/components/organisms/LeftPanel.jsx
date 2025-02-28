import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ListItem from "../atoms/ListItem";
import AccordionPanelItem from "../molecules/AccordionPanelItem";
import { fetchPopularLeagues, fetchSportsWithLeagues } from "@/services/sportsService";

const LeftPanel = () => {
  const [popular, setPopular] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const handleFetchData = async () => {
      const popularLeagues = await fetchPopularLeagues();
      const sportsWithLeagues = await fetchSportsWithLeagues();
      setPopular(popularLeagues);
      setSports(sportsWithLeagues);
    };
    handleFetchData();
  }, []);

  return (
    <div className="p-6 mx-10">
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Popular</h2>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y divide-gray-100">
              {Array.isArray(popular) &&
                popular.map((league) => (
                  <ListItem key={league.id} country={league.country_code} to={league.url_path}>
                    {league.name}
                  </ListItem>
                ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Sport</h2>
          <div className="bg-white rounded-lg shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {Array.isArray(sports) &&
                sports.map((sport) => (
                  <AccordionPanelItem key={sport.id} title={sport.name}>
                    {sport.leagues.map((league, i) => (
                      <ListItem key={i} country={league.country_code} to={league.url_path}>
                        {league.name}
                      </ListItem>
                    ))}
                  </AccordionPanelItem>
                ))}
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeftPanel;
