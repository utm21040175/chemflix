import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenu,IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent ,IonImg, IonButtons, IonButton, IonMenuButton} from '@ionic/react';
import api from '../api'; // Importa la instancia configurada de axios

const Terror: React.FC = () => {
  const history = useHistory();
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    // Llama a la API para obtener los datos de películas de terror
    api.get('/discover/movie', {
      params: {
        with_genres: '27', // El ID para el género para Terror en TMDb es 27
      },
    })
      .then(response => {
        console.log(response.data.results); // Añade un console.log para verificar los datos
        setMovies(response.data.results);
      })
      .catch(error => {
        // Manejo de errores en caso de fallo en la solicitud
        console.error('Error', error);
      });
  }, []); // El arreglo vacío [] asegura que este efecto se ejecute solo una vez al montar el componente
  const handleMenuClick = (path: string) => {
    history.push(path);
  };

  return (
    <>
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
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Peliculas de Terror.</IonTitle>
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
            <p>No se encontraron películas de terror.</p>
          )}
        </IonContent>
      </IonPage>
    </>
  ); 
};

export default Terror;
