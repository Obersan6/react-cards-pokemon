/*
## STEP 2: useFlip

Both the *PokemonCard* and the *PlayingCard* components can be flipped over when clicked on. You may have noticed that there is some duplicate code in these components. Create a *hooks.js* file in *src/*, and in that file
1) write a custom hook called *useFlip* which will hold the business logic for flipping any type of card.

- *useFlip* doesn’t need to take an argument, and similar to *useState*, it should return an array with two elements. The first element is the current flip state of the card, and the second element is a function that will toggle the flip state.

2) Once you’ve written this hook, refactor *PokemonCard* and *PlayingCard* to use this custom hook.
*/

import { useState } from "react";
import axios from "axios";
import { v1 as uuid } from "uuid"; // Import uuid for unique IDs

// Hook for toggling a flip state
export const useFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(isFlipped => !isFlipped);
  };

  return [isFlipped, toggleFlip];
};

/*
## STEP 3: *useAxios* in *PlayingCardList***

In the *PlayingCardList* component, we initialize an empty array in state, and add to it via an AJAX request we make with *axios*. Since we use *axios* in a few components, let’s move this logic into a function called *useAxios*.

1) *useAxios* should take in a URL, and similar to *useState*, it should return an array with two elements:
- The first element is an array of data obtained from previous AJAX requests (since we will add to this array, it’s a piece of state). 
- The second element is a function that will add a new object of data to our array.

2) Once you’ve written this hook, refactor *PlayingCardList* to use this custom hook. (Don’t worry about *PokeDex* for now - that’s coming in the next part!
*/

// Hook for making Axios requests and managing data
export const useAxios = (baseUrl) => {
    const [data, setData] = useState([]);
  
    const addData = async (endpoint = "") => {
      try {
        const response = await axios.get(`${baseUrl}${endpoint}`);
        setData(data => [...data, { ...response.data, id: uuid() }]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    return [data, addData];
  };

/*
## STEP 4: *useAxios* in *PokeDex***

*PokeDex* also make AJAX requests, but this one’s a bit trickier. *PlayingCardList* makes a request to the same endpoint every time, but the endpoint in *PokeDex* depends on the name of the pokemon.

Figure out a way to modify your *useAxios* hook so that when you call *useAxios* you can just provide a base url, and when you want to add to your array of response data in state, you can provide the rest of the url.

Once you’ve done this, refactor *PokeDex* to use *useAxios*. Make sure *PlayingCardList* still works too!

> Please let us see your code at this point!
>
*/