import React from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Paper, Fab, Typography, Button, Box } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import CardComponent, { MyCard } from './Card';


export enum PickerStatus {
    INIT,
    READY,
    RUNNING,
    FINISHED
}

type RpapProps = {
    pickerStatus: PickerStatus;
    cardData: MyCard[];
    currentCardIdx: number;
    classes: Record<any, string>;
    setPickerStatus: (p: PickerStatus) => void;
    setCurrentCardIdx: (n: number) => void;
}

function Rpap({ pickerStatus, cardData, currentCardIdx, classes, setPickerStatus, setCurrentCardIdx }: RpapProps) {
    const handle = useFullScreenHandle();

    const InitialPage = () => (
        <Typography variant="h5">
            Click button on the left to start RPAP!
        </Typography>
    )

    const PickerPage = () => {
        if (pickerStatus === PickerStatus.READY) {
            return (
                <Button 
                    variant="outlined"
                    color="primary"
                    onClick={() => setPickerStatus(PickerStatus.RUNNING)}
                >
                    Let's Start
                </Button>
            )
        }
        else if (pickerStatus === PickerStatus.FINISHED) {
            return (
                <Typography variant="h5">
                    Finished
                </Typography>
            )
        }
        else {
            return (
                <div>
                    <CardComponent card={cardData[currentCardIdx]} />
                    <Box mt="2rem">
                        <Button 
                            variant="contained"
                            onClick={getNextCard}
                            endIcon={<NavigateNextIcon />}
                        >
                            Next
                        </Button>
                    </Box>
                    <Box mt="1rem">
                        <Typography variant="h6">
                            {currentCardIdx + 1} / {cardData.length}
                        </Typography>
                    </Box>
                </div>
            )
        }
    }

    function getNextCard(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (currentCardIdx === cardData.length - 1) {
            setPickerStatus(PickerStatus.FINISHED)
        }
        else {
            setCurrentCardIdx(currentCardIdx + 1);
        }
    }

    return (
        <Paper className={`${classes.paper} ${classes.centerContent}`} style={{minHeight: 480, position: 'relative'}}>
            <Fab className={classes.fab} color="primary" aria-label="full screen" size="small">
                <FullscreenIcon onClick={handle.enter} />
            </Fab>
            <FullScreen handle={handle}>
                {pickerStatus === PickerStatus.INIT ? <InitialPage /> : <PickerPage />}
            </FullScreen>
        </Paper>
    );
}

export default Rpap;
                