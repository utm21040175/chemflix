// src/pages/Inicio.js
import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonCol, IonInput, IonPage,IonRow, IonTitle,IonImg, IonToolbar, IonButtons, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonMenu, IonList, IonItem, IonMenuButton, IonGrid } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import api from '../api'; // Importa la instancia configurada de axios

const Comedia: React.FC = () => {
    const history = useHistory();
    const [movies, setMovies] = useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState<string>(''); // Estado para el término de búsqueda

    useEffect(() => {
        //llamar a la api con el codigo del genero
        api.get('/discover/movie', {
            params: {
                with_genres: '35',
            }
        })
            .then(response => {
                console.log(response.data.results)
                setMovies(response.data.results)
            })
            .catch(error => {
                console.error('ERROR', error);
            })
    }, [])// El arreglo vacio es para que este efecto se ejecute solo una vez 

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
          <IonButton color={'warning'} onClick={handleLogout} href="/home">Cerrar sesion</IonButton>
        </IonContent>
      </IonMenu>

      {/* Contenido de la Página */}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Peliculas de comedia</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonItem>
              <IonInput
                value={searchQuery}
                placeholder="Buscar película..."
                onIonChange={(e) => setSearchQuery(e.detail.value!)}/>
              <IonButton color={'warning'} onClick={searchMovies}>Buscar</IonButton>
            </IonItem>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonGrid>
              <IonRow>
                {movies.length > 0 ? (
                  movies.map((movie, index) => (
                    <IonCol key={index} size="2"> {/* Cada película ocupa 3 columnas en una fila */}
                      <IonCard>
                        <IonCardHeader>
                          <IonCardTitle>{movie.title}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonImg
                            style={{ width: '100%', height: 'auto' }}
                            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                            alt={movie.title}
                          />{movie.overview}
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

export default Comedia;
