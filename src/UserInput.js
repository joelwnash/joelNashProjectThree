import { useState, useEffect } from "react";
import axios from "axios";
import GetImage from "./GetImage";

const UserInput = () => {

    // Stateful variable to store url parameters
    const [ userChoice, setUserChoice ] = useState({
                                                        redValue: '',
                                                        greenValue: '',
                                                        blueValue: '',
                                                        tiles: 50,
                                                        tileSize: 7});

    // Function to update url parameters based on input values
    const handleUserChoice = (e) => {
        setUserChoice(existingValues => ({
            ...existingValues,
            [e.target.id]: Number(e.target.value),
        }))
    }

    // Initialize a stateful variable for the API url
    const [ apiUrl, setApiUrl ] = useState('');

    // On form submission, construct the url
    const getImage = (e) => {
      e.preventDefault();
      const redValue = userChoice.redValue
                        ? `r=${userChoice.redValue}&`
                        : '';
      const greenValue = userChoice.greenValue
                        ? `g=${userChoice.greenValue}&`
                        : '';
      const blueValue = userChoice.blueValue
                        ? `b=${userChoice.blueValue}&`
                        : '';
      const tiles = userChoice.tiles
                        ? `tiles=${userChoice.tiles}&`
                        : '';
      const tileSize = userChoice.tileSize
                        ? `tileSize=${userChoice.tileSize}&`
                        : '';
      setApiUrl(`https://php-noise.com/noise.php?${redValue}${greenValue}${blueValue}${tiles}${tileSize}json`);
    }

    const [ imageUrl, setImageUrl ] = useState('');

    const update = () => {
        axios
            .get(apiUrl)
            .then( (res) => {
                setImageUrl(res.data.uri);
        });
    };

    useEffect(update, [apiUrl]);

    return(
        <>
            <section>

                <form onSubmit={getImage}>

                    <fieldset className="colourFieldset">

                        <legend>Make your RGB selection (values from 0-255):</legend>

                            <div className="colourSectionWrapper">

                                <div className="colourBox"

                                    style={{
                                        backgroundColor: `rgb(${userChoice.redValue}, ${userChoice.greenValue}, ${userChoice.blueValue})`
                                    }}
                                >
                                    {
                                        userChoice.redValue && userChoice.greenValue && userChoice.blueValue
                                        ? ''
                                        : <p className="yourColour">Enter RGB values to see sample colour:</p>
                                    }

                                </div> {/*.colourBox closure */}

                                <div className="colourWrapper">

                                    <div className="redWrapper">

                                        <label htmlFor="redValue">Red:</label>

                                        <input
                                            type="number"
                                            name="redValue"
                                            id="redValue"
                                            min="0"
                                            max="255"
                                            value={userChoice.redValue}
                                            placeholder="0-255"
                                            onChange={handleUserChoice}
                                        />

                                    </div> {/*.redWrapper closure */}

                                    <div className="greenWrapper">

                                        <label htmlFor="greenValue">Green:</label>

                                        <input
                                            type="number"
                                            name="greenValue"
                                            id="greenValue"
                                            min="0"
                                            max="255"
                                            value={userChoice.greenValue}
                                            placeholder="0-255"
                                            onChange={handleUserChoice}
                                        />

                                    </div> {/*.greenWrapper closure */}

                                    <div className="blueWrapper">

                                        <label htmlFor="blueValue">Blue:</label>

                                        <input
                                            type="number"
                                            name="blueValue"
                                            id="blueValue"
                                            min="0"
                                            max="255"
                                            value={userChoice.blueValue}
                                            placeholder="0-255"
                                            onChange={handleUserChoice}
                                        />

                                    </div> {/*.blueWrapper closure */}

                                </div> {/*.colourWrapper closure */}

                             </div> {/*.colourSectionWrapper closure */}

                    </fieldset> {/*.colourFieldset closure */}

                    <fieldset className="sizeFieldset">

                        <legend>Choose tile and image size:</legend>

                            <div className="sizeWrapper">

                                <div className="tileSizeWrapper">

                                    <label htmlFor="tileSize">Width and height of 1 tile in pixels:</label>

                                    <input
                                        type="number"
                                        name="tileSize"
                                        id="tileSize"
                                        min="1"
                                        max="20"
                                        value={userChoice.tileSize}
                                        placeholder="1-20"
                                        onChange={handleUserChoice}
                                    />

                                </div> {/*.tileSizeWrapper closure */}

                                <div className="tilesWrapper">

                                    <label htmlFor="tiles">Number of tiles per row and column:</label>

                                    <input
                                        type="number"
                                        name="tiles"
                                        id="tiles"
                                        min="4"
                                        max="50"
                                        value={userChoice.tiles}
                                        placeholder="4-50"
                                        onChange={handleUserChoice}
                                    />

                                </div> {/*.tilesWrapper closure */}

                            </div> {/*.sizeWrapper closure */}

                    </fieldset> {/*.sizeFieldset closure */}

                <button type="submit">Generate my background!</button>

                </form>

            </section>

            {
                imageUrl
                ? <GetImage imageUrl={imageUrl} />
                : null
            }

        </>
    )
}

export default UserInput;