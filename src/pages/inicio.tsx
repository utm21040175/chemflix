// src/pages/Inicio.js
import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle,IonImg, IonToolbar, IonButtons, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonMenu, IonList, IonItem, IonMenuButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import api from '../api'; // Importa la instancia configurada de axios

const Inicio: React.FC = () => {
  const history = useHistory();
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    // Llama a la API para obtener películas aleatorias
    api.get('/discover/movie', {
      params: {
        sort_by: 'popularity.desc',
      },
    })
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching random movies', error);
      });
  }, []);

  const handleMenuClick = (path: string) => {
    history.push(path);
  };

  return (
    <>
      {/* Menú */}
      <IonMenu side="start" menuId="first" contentId="main-content">
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

      {/* Contenido de la Página */}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Página de Inicio</IonTitle>
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
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{movie.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonImg style={{ width: '150px', height: 'auto' }} src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
                  {movie.overview}
                </IonCardContent>
              </IonCard>
            ))
          ) : (
            <p>No se encontraron películas.</p>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Inicio;
