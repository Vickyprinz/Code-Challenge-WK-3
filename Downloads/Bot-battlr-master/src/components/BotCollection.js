import React from "react";
import BotCard from "./BotCard"

function BotCollection({bots,handleClick,handleDelete}) {
  const botCollection= bots.map( bot=>
  <BotCard
     key={bot.id}
     bot={bot}
     handleDelete={handleDelete}
      handleClick={handleClick}
       />)
  return (
    <div className="ui four column grid">
      <div className="row">
        {botCollection} 
        Collection of all bots
      </div>
    </div>
  );
}

export default BotCollection;