import { createContext, useState, ReactNode, useContext } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling:boolean;
  play: (episode: Episode) => void;
  playList:(list:Episode[], index:number)=>void;
  setPlaingState: (state: boolean) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  clearPlayerState: () => void;
  hasNext:boolean;
  hasPrevius:boolean;
  
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
};

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list:Episode[], index:number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index)
    setIsPlaying(true);

  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }
  function toggleLoop() {
    setIsLooping(!isLooping);
  }
  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlaingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0)
  }



  const hasPrevius = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext() {
     
     if(isShuffling){
         const nextRandomEpisodeIndex = Math.floor( Math.random() * episodeList.length)
         setCurrentEpisodeIndex( nextRandomEpisodeIndex)

     } else if(hasNext){

          setCurrentEpisodeIndex(currentEpisodeIndex +1)
      }
  }

  function playPrevious() {
    const nextEpisodeIndex = currentEpisodeIndex + 1

    if(hasPrevius){
        setCurrentEpisodeIndex(currentEpisodeIndex -1)
    }
}

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        isLooping,
        isShuffling,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlaingState,
        playList,
        playNext,
        playPrevious,
        hasNext,
        hasPrevius,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = ()=>{
    return useContext(PlayerContext);
}
