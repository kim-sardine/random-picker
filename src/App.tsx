import React, { useState } from 'react';
import ReactGA from 'react-ga';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { MyCard } from './components/Card';
import Header from './components/Header';
import UserInput from './components/UserInput';
import Rpap, {PickerStatus} from './components/Rpap'
import './App.css';

ReactGA.initialize('UA-131568070-5');
ReactGA.pageview('/');

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        marginBottom: theme.spacing(3),
    },
    toolBar: {
        justifyContent: "space-between",
    },
    noTransform: {
        textTransform: 'none',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    centerContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fab: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const sampleUserInputData = `Hugo Lloris	Goalkeeper	 France
Jan Vertonghen	Defender	 Belgium
Ben Davies	Defender	 Wales
Eric Dier	Midfielder	 England
Moussa Sissoko	Midfielder	 France
Dele Alli	Midfielder	 England
Lucas Moura	Midfielder	 Brazil
Son Heung-Min	Forward	 South Korea`;

const sampleUserInputTitle = '(Sample) 5th Monthly meeting Event!';

function App() {
    const [userInputTitle, setUserInputTitle] = useState(sampleUserInputTitle);
    const [userInputData, setUserInputData] = useState(sampleUserInputData);
    const [cardData, setCardData] = useState([new MyCard([])]);
    const [pickerStatus, setPickerStatus] = useState(PickerStatus.INIT);
    const [currentCardIdx, setCurrentCardIdx] = useState(0);
    
    const onChangeInputData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInputData(e.target.value);
    };
    
    const onChangeInputTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInputTitle(e.target.value);
    };
    
    const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let t_cardData: MyCard[] = [];
        let rows = userInputData.split("\n");
        for(let row of rows) {
            if (row !== "") {
                let cells = row.split("\t");
                t_cardData.push(new MyCard(cells));
            }
        }
        
        if (t_cardData.length === 0) {
            setCardData([new MyCard([])])
        }
        else {
            shuffleCards(t_cardData);
            setCardData(t_cardData);
            setPickerStatus(PickerStatus.READY);
            setCurrentCardIdx(0);
        }

        ReactGA.event({
            category: 'User',
            action: 'Click SHUFFLE & RUN',
            label: 'Total Length',
            value: t_cardData.length
        });
    };    
    
    function shuffleCards(cards: MyCard[]) {
        for(let i = cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = cards[i]
            cards[i] = cards[j]
            cards[j] = temp
        }
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <Grid container spacing={3} direction="row" justify="center">
                <Grid item xs={12} sm={6}>
                    <UserInput
                        userInputData={userInputData}
                        onChangeInputData={onChangeInputData}
                        userInputTitle={userInputTitle}
                        onChangeInputTitle={onChangeInputTitle}
                        onSubmitData={onSubmit}
                        classes={classes}
                        />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Rpap 
                        pickerStatus={pickerStatus}
                        cardData={cardData}
                        currentCardIdx={currentCardIdx}
                        title={userInputTitle}
                        classes={classes}
                        setPickerStatus={setPickerStatus}
                        setCurrentCardIdx={setCurrentCardIdx}
                    />
                </Grid>
            </Grid>
        </div>
        );
    }
    
    export default App;
                    