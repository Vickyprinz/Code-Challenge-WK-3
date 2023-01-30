import React, { useEffect,useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {

  const [bots, setBots] = useState([]);

  useEffect(() => {
    fetch("https://linexmugambi.github.io/db/db.json")
      .then((response) => response.json())
      .then((data)=>setBots(data.bots));
  }, []);

function castBots(id,cast=true){
 setBots(bots.map(bot=> id===bot.id ?{...bot, isCast: cast}: bot))
}
 function unCastBots(id){
  setBots(bots.map(bot=> id===bot.id ?{...bot, isCast: false}: bot))

 }
  function deleteBots(deletedBotId){
    setBots(bots.filter(bot => bot.id !== deletedBotId))
  }
 


  return (
    <div>
      <YourBotArmy bots={bots.filter(bot=>bot.isCast)}
      handleDelete={deleteBots}
      handleClick={unCastBots}

     />
      <BotCollection bots={bots} 
     handleDelete={deleteBots}
      handleClick={castBots}
      />
    </div>
  )
}

export default BotsPage;