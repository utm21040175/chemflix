import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import api from '../api'; // Importa la instancia configurada de axios

const Terror: React.FC = () => {
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Películas de Terror</IonTitle>
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
                {movie.overview}{movie.i}
              </IonCardContent> 
            </IonCard>
          ))
        ) : (
          <p>No se encontraron películas de terror.</p>
        )}
      </IonContent>
    </IonPage>
  ); 
};

export default Terror;
