import React, { MouseEvent, useEffect, useState } from 'react'
import * as C from './App.styles'
import { InforItem } from './components/inforItem'
import logoImg from './assets/devmemory_logo.png'
import { Button } from './components/Button'
import RestartIcon from './svgs/restart.svg'
import { items } from './data/Items'
import { GridItemType } from './types/GridItemTypes'
import { withTheme } from 'styled-components'
import { GridItem } from './components/GridItem'
import { formatTimeElapsed } from './helpers/formatTimeElapsed'

function App() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => { resetAndCreateGrid() }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // verify if opened are equal
  useEffect(() => {
    if (shownCount === 2) {

      let opened = gridItems.filter(item => item.shown === true)
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          // if both are equal, make every "shown" permanent
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        } else {
          // else if they are not equal, clore all shown
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1500)
        }


        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [shownCount, gridItems])

  //verify is game is over
  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
      setPlaying(false);
    }
  },[moveCount,gridItems])

  const resetAndCreateGrid = () => {
    //step 1 - reset game
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    //step 2 - create grid empty
    let tmpGrid: GridItemType[] = []
    for (let i = 0; i < (items.length * 2); i++) {
      tmpGrid.push({
        item: null, shown: false, permanentShown: false
      });
    }

    //step 2 - fill the grid
    for (let w = 0; w < 2; w++) {
      for (let a = 0; a < items.length; a++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = a;
      }
    }

    //step 2 - fill state
    setGridItems(tmpGrid);


    //play game
    setPlaying(true);
  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid1 = [...gridItems];

      if (tmpGrid1[index].permanentShown === false && tmpGrid1[index].shown === false) {
        tmpGrid1[index].shown = true;
        setShownCount(shownCount + 1);
        console.log(tmpGrid1[index].shown)
      }
      setGridItems(tmpGrid1);
    }
  }

  return (
    <div className="App">
      <C.Container>
        <C.Info>
          <C.LogoLink>
            <img src={logoImg} alt="" width="200" />
          </C.LogoLink>

          <C.InforArea>
            <InforItem label='Tempo' value={formatTimeElapsed(timeElapsed)} />
            <InforItem label='Movimentos' value={(moveCount).toString()}/>
          </C.InforArea>

          <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
        </C.Info>
        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>
  )
}

export default App
