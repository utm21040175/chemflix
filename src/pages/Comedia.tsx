import api from "../api";

import React, {useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

const Comedia : React.FC = () => {
    const [movies, setMovies] = useState<any[]>([])

    useEffect(() => {
        //llamar a la api
        api.get('discover/movie',{
            params: {
                with_genres: '35'
            }
        })
        .then(response => {
            console.log(response.data.results);
            setMovies(response.data.results);
        })
        .catch(error =>{
            console.error('ERROR', error)
        });
    }, []) //el arreglo vacio es para que se ejecute una sola ves, pero me podria explicar como funciona? porfis 
 return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Películas de Comedia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Mapea el estado movies para crear una tarjeta para cada película */}
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardTitle>{movie.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {movie.overview}
              </IonCardContent>
            </IonCard>
          ))
        ) : (
          <p>No se encontraron películas de comedia.</p>
        )}
      </IonContent>
    </IonPage>
  ); 
};

export default Comedia;