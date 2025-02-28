import { Badge } from "../ui/badge";

export const BetItem = ({ bet, matchId, onRemove }) => (
  <div className="p-2 rounded">
    <div className="flex items-center justify-between">
      <span className="text-xs">{`${bet.homeTeam} - ${bet.awayTeam}`}</span>
      <span className="cursor-pointer" onClick={() => onRemove(matchId)}>
        &#10005;
      </span>
    </div>
    <div className="flex justify-between pt-3 text-base items-center">
      <div>{bet.betType === "draw" ? `Draw` : bet.betType === "home" ? `${bet.homeTeam}` : `${bet.awayTeam}`}</div>
      <Badge className="text-base">{bet.odds}</Badge>
    </div>
  </div>
);
