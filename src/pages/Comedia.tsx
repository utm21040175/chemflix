import api from "../api";
import { useHistory } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle,IonMenu,IonList,IonButtons, IonButton, IonMenuButton,  IonItem, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent , IonImg} from '@ionic/react';

const Comedia : React.FC = () => {
    const history = useHistory();
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

    const handleMenuClick = (path: string) => {
      history.push(path);
    };
  
 return (
  <>
    <IonMenu side="start" menuId="first" contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem button onClick={() => handleMenuClick('/amor')}>Amor</IonItem>
            <IonItem button onClick={() => handleMenuClick('/comedia')}>Comedia</IonItem>
            <IonItem button onClick={() => handleMenuClick('/terror')}>Terror</IonItem>
            <IonItem button onClick={() => handleMenuClick('/infantil')}>Infantil</IonItem>
          </IonList>
        </IonContent>
    </IonMenu>
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Peliculas de comedia.</IonTitle>
        </IonToolbar>
        <IonToolbar>
            <IonButtons slot="secondary">
              <IonButton onClick={() => handleMenuClick('/amor')}>Amor</IonButton>
              <IonButton onClick={() => handleMenuClick('/comedia')}>Comedia</IonButton>
              <IonButton onClick={() => handleMenuClick('/terror')}>Terror</IonButton>
              <IonButton onClick={() => handleMenuClick('/infantil')}>Infantil</IonButton>
            </IonButtons>
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
              <IonCardContent>{/*AÑADIR LAS IMAGENES DE LAS PELICULAS*/}
                <IonImg style={{ width: '150px', height: 'auto' }} src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
                  {movie.overview}
              </IonCardContent>
            </IonCard>
          ))
        ) : (
          <p>No se encontraron películas de comedia.</p>
        )}
      </IonContent>
    </IonPage>
    </>
  ); 
};

export default Comedia;