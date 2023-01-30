import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({bots,handleClick, handleDelete}) {
  const botCollection=bots.map(bot=>
  <BotCard
   key={bot.id}
   bot={bot} 
  handleClick={handleClick} 
  handleDelete={handleDelete}
 
  />)

  return (
    <div className="ui segment inverted black bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {botCollection}
          Your Bot Army
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;