import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/react';
import api from '../api'

const Infantil: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([])

    useEffect(() => {
        //llamar a la api con el codigo del genero
        api.get('/discover/movie', {
            params: {
                with_genres: '16',
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


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Películas Infantiles</IonTitle>
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
                    <p>No se encontraron películas Infantiles.</p>
                )}
            </IonContent>
        </IonPage>
    );
}

export default Infantil;