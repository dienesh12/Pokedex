import * as tf from "@tensorflow/tfjs";
import idx2class1 from "./classIdxDict2";

import React, { useState, useEffect } from "react";
import NavBar from './NavBar'
import axios from 'axios'
import PokeInfo from "./Pokeinfo";
//import "./App.css";

const Find = () => {
  // usestate for setting a javascript
  // object for storing and using data
  const [file, setFile] = useState(null);
  //   const [model, setModel] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [topkPredNames, setPrediction] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [topkPred, settopK] = useState(null);
  const [collName1,setcollName1] = useState("")
  const [collName2,setcollName2] = useState("")
  const [collName3,setcollName3] = useState("")
  const [pokeDex1,setpokeDex1] = useState()
  const [pokeDex2,setpokeDex2] = useState()
  const [pokeDex3,setpokeDex3] = useState()
  const [pokeName,setpokeName] = useState("")

  const [model, setModel] = useState(null);
  function readImage(file) {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader();
      fileReader.onload = () => rs(fileReader.result);
      fileReader.onerror = () => rj(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  }


  const addHandler = async (name,e) => {
    e.preventDefault();
    let collName = ""
    if(collName1 != "") collName = collName1
    if(collName2 != "") collName = collName2
    if(collName3 != "") collName = collName3

    //console.log(collName);
    const userData =  (JSON.parse(window.localStorage.getItem("userInfo")))
    const username = userData.username
    const token = userData.token
    const data1 = {
        'username':username,
        'collectionName':collName,
        'pokeName':name
    }

    const req = await axios.post(`https://pokedex-f6t5.onrender.com/api/collections/addPokemon`,data1,{ 
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    alert(`Pokemon added to ${collName} successfully!`)
    console.log(req);
}



  async function handleImgUpload(event) {
    const {
      target: { files },
    } = event;

    const _file = files[0];
    const fileData = await readImage(_file);
    console.log(fileData);
    setFile(fileData);
    setProcessing(true);
  }

  const MODEL_HTTP_URL = "https://pokedex-f6t5.onrender.com/api/pokeml/classify";
  const MODEL_INDEXEDDB_URL = "indexeddb://poke-model";

  const getTopKPred = (pred, k) => {
    const predIdx = [];
    const predNames = [];

    const topkPred = [...pred].sort((a, b) => b - a).slice(0, k);
    console.log(topkPred);
    settopK(topkPred)
    topkPred.map((i) => predIdx.push(pred.indexOf(i)));
    predIdx.map((i) => predNames.push(idx2class1[i]));
    console.log(predNames);
    return predNames;
  };

  const getTopKPredPokeObj = (pred, k) => {
    const foundPokeObj = [];
    const predPokeName = getTopKPred(pred, k);
    console.log(predPokeName);
    // predPokeName.map((name) =>
    //   foundPokeObj.push(pokeObjFromName(name, pokeObjList))
    // );

    return predPokeName;
  };
  useEffect(() => {
    async function fetchModel() {
      try {
        console.log(MODEL_INDEXEDDB_URL);
        
        const localClassifierModel = await tf.loadLayersModel(
          MODEL_INDEXEDDB_URL
        );

        console.log(localClassifierModel);

        setModel(localClassifierModel);
        console.log("Model loaded from IndexedDB");
      } catch (e) {
        try {
          console.log(MODEL_HTTP_URL);
          const classifierModel = await tf.loadLayersModel(MODEL_HTTP_URL);

          console.log(classifierModel);
          setModel(classifierModel);
          console.log("Model Loaded");
          await classifierModel.save(MODEL_INDEXEDDB_URL);
          console.log("Model saved to IndexedDB");
        } catch (e) {
          console.log("Unable to load model at all: ", e);
        }
      }
    }
    fetchModel();
  }, []);
  useEffect(() => {
    async function predict() {
      if (imageLoaded && file) {
        const imageElement = document.createElement("img");
        //console.log(imageElement);
        imageElement.src = file;

        console.log(imageElement);

        imageElement.onload = async () => {
          const tensor = tf.browser
            .fromPixels(imageElement)
            .resizeNearestNeighbor([120, 120])
            .toFloat()
            .sub(127)
            .div(127)
            .expandDims();

          console.log("fuck");
          const y_pred = await model.predict(tensor).data();
          //   console.log(y_pred);
          // console.log(pokemonState);
          const topkPredNames = getTopKPredPokeObj(y_pred, 3);

          //   dispatch(setePredictions({ predictions: topkPredNames }));
          setPrediction(topkPredNames);
          console.log(topkPredNames);
          console.log("-----------");
          const req1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${topkPredNames[0]}`)
          const req2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${topkPredNames[1]}`)
          const req3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${topkPredNames[2]}`)
          console.log(req1);
          setpokeDex1(req1.data)
          setpokeDex2(req2.data)
          setpokeDex3(req3.data)
          //   console.log(prediction);
          setProcessing(false);
          setImageLoaded(false);
          return topkPredNames;
          //   setPrediction(parseInt(prediction, 10));
        };
      }
    }

    predict();
  }, [imageLoaded, model, file]);

  return (
    <>
    <NavBar/>
    <div className="File-input-container">
      <div style={{marginLeft:"40%"}}>
      <form className="Form">
        <label htmlFor="upload-image">Upload image</label>
        <input
          id="image-selector"
          type="file"
          name="upload-image"
          accept="image/*"
          className="File-selector"
          onChange={handleImgUpload}
          disabled={!model || processing}
        />
      </form>
      <div className="Img-display-container" style={{width: '80%', height: '80%'}}>
        <img
          onLoad={() => {
            setImageLoaded(true);
          }}
          alt=""
          src={file}
        />
      </div>
      </div>
      <div className="Img-processing-container">
        {processing ? (
          <p>Loading ...</p>
        ) : topkPredNames !== null ? (
          <div style={{display:"flex",justifyContent:"space-between", height: "500px", width: "90%"}}>
            <div style={{display:"flex"}}>
              
              <div style={{width:'30px', height:'30px'}}>
                
                
                <PokeInfo data={pokeDex1}/>
              </div>
            </div>
            <div style={{display:"flex"}}>
              
              <div style={{width:'30px', height:'30px'}}>
                
                
                <PokeInfo data={pokeDex3}/>
              </div>
            </div>
            <div style={{display:"flex"}}>
              
              <div style={{width:'30px', height:'30px'}}>
                
                
                <PokeInfo data={pokeDex2}/>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
    </>
  );
};

export default Find;
