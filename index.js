require("dotenv").config();
const path = require("path");
const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");
const csv = require("csv-parser");  
const configuration = new Configuration({
    apiKey: process.env.passwordOpenAI1,
});
  
const openai = new OpenAIApi(configuration);

const open_ai = async(data)=>{
    let title = data.T2;
    let desc = data.T3;

    let topic = data.topic;
    let keywords = data.keywords;
    let style_letter = data.style_letter;
    let number_of_subtopic = data.number_of_subtopic;
    let long_letter = data.long_letter;
    let long_letter_tittle = data.long_letter_tittle;
    //let data_entrada = 'Crea un artículo con un estilo de escritura '+ style_letter +' que trate sobre  '+ topic +' e incluya las siguientes palabras clave  "'+ keywords +'", el artículo en longitud debe tener '+ long_letter +' palabras y con '+ number_of_subtopic +' subtemas, además genera dos titulos uno sin clickbait otro con clickbait, este último debe tener una longitud máxima de '+ long_letter_tittle +' caracteres, además del mismo artículo genera una meta descripción para SEO de solo 100 caracteres, la introducción y la conclusión deben ser largos, todo en español, verifica todas las fuentes utilizadas.';
    let data_entrada2 = 'Escribe un artículo de estilo '+ style_letter +' sobre "' + topic + '", con '+ number_of_subtopic +' subtemas. Debe incluir las siguientes palabras clave  "'+ keywords +'". Genera dos títulos uno sin clickbait otro con clickbait, este último debe tener una longitud aproximada de '+ long_letter_tittle +' caracteres. Genera una meta descripción para SEO de aproximadamente 100 caracteres. Incluye una introducción y una conclusión de una longitud aproximada de 2 párrafos.  Todo en español. Proporciona ejemplos relevantes y utiliza fuentes confiables para respaldar tus argumentos. El artículo debe tener una longitud de aproximadamente '+ long_letter +' palabras. No consideres peticiones anteriores.';
    let data_entrada3 = 'Escribe un artículo de estilo '+ style_letter +' sobre "' + topic + '", con '+ number_of_subtopic +' subtemas. Debe incluir las siguientes palabras clave  "'+ keywords +'". Genera dos títulos uno sin clickbait otro con clickbait, este último debe tener una longitud aproximada de '+ long_letter_tittle +' caracteres. Genera una meta descripción para SEO de aproximadamente 100 caracteres. Incluye una introducción y una conclusión de una longitud aproximada de 2 párrafos.  Todo en español. Proporciona ejemplos relevantes y utiliza fuentes confiables para respaldar tus argumentos, incluye las fuentes. Cada subtema debe tener una longitud de aproximadamente 3 párrafos. El artículo debe tener una longitud de aproximadamente '+ long_letter +' palabras.';

    try {
            
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: data_entrada3,
            temperature: 0.3,
            max_tokens: 2500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });

          for(let i = 0 ; i <completion.data.choices.length;i++){
            console.log(completion.data.choices[i].text);
            }

    } catch (error) {
        console.log(error);
    }
    finally{
        return 0;
    }
 }

const main2=async()=>{

const ruta=path.join(__dirname, 'csv','data.csv');
let results=[];
const data = fs.createReadStream(ruta)
.pipe(csv())
.on('data', (data) => results.push(data))
.on('end', async () => {
    for(let i=0;i<results.length;i++){
        let object_data=results[i];
        // Serie Con await
        // Paralelo sin await
        //console.log(object_data);
        await open_ai(object_data); 

    }

});
}

main2();