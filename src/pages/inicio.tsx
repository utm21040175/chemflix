// src/pages/Inicio.js
import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonCol, IonPage, IonRow, IonTitle, IonImg, IonToolbar, IonButtons, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonMenu, IonList, IonItem, IonMenuButton, IonInput, IonGrid } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import api from '../api'; // Importa la instancia configurada de axios
import "./Home.css";

const Inicio: React.FC = () => {
  const history = useHistory();
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Estado para el término de búsqueda

  useEffect(() => {
    // Llama a la API para obtener películas por defecto (ordenadas por popularidad)
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

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token almacenado
    alert('Sesión cerrada exitosamente');
    history.push('/login'); // Redirigir al usuario a la página de inicio de sesión
  };

  // Función para buscar películas
  const searchMovies = () => {
    if (!searchQuery) {
      alert('Por favor, ingresa un nombre de película para buscar');
      return;
    }

    api.get('/search/movie', {
      params: {
        query: searchQuery,
        api_key: 'fb7058078ac62b4a6d67a248f550db69', 
      },
    })
      .then(response => {
        setMovies(response.data.results); // Actualiza las películas con los resultados de búsqueda
      })
      .catch(error => {
        console.error('Error al buscar películas', error);
        alert('Error al buscar películas');
      });
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
          <IonItem href='/inicio'>Volver al inicio. 🏠</IonItem>
          <IonList>
            <IonItem button onClick={() => handleMenuClick('/amor')}>Amor</IonItem>
            <IonItem button onClick={() => handleMenuClick('/comedia')}>Comedia</IonItem>
            <IonItem button onClick={() => handleMenuClick('/terror')}>Terror</IonItem>
            <IonItem button onClick={() => handleMenuClick('/infantil')}>Infantil</IonItem>
          </IonList>

          <IonButton color={'warning'} onClick={handleLogout} href='/home'>Cerrar sesión</IonButton>
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
            {/* Campo de Búsqueda */}
            <IonItem>
              <IonInput
                value={searchQuery}
                placeholder="Buscar película..."
                onIonChange={(e) => setSearchQuery(e.detail.value!)}
              />
              <IonButton color={'warning'} onClick={searchMovies}>Buscar</IonButton>
            </IonItem>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              {movies.length > 0 ? (
                movies.map((movie, index) => (
                  <IonCol key={index} size="2"> {/* Cada película ocupa 2 columnas */}
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>{movie.title}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonImg
                          style={{ width: '100%', height: 'auto' }}
                          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                          alt={movie.title}
                        />
                        {movie.overview}
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))
              ) : (
                <p>No se encontraron películas.</p>
              )}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Inicio;
