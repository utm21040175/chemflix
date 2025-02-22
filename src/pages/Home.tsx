import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, 
  IonItem, IonLabel, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useState } from 'react';
import axios from 'axios';
import './Home.css';


// Componente principal 
const Home: React.FC = () => {
  // Definición de estados para username, password y modo (registro/inicio de sesión)
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegister, setIsRegister] = useState<boolean>(true);

  // Función que maneja el envío del formulario
  const handleSubmit = () => {
    // Define el endpoint en función del modo
    const endpoint = isRegister ? 'register' : 'login';
    // Realiza una solicitud POST a la API correspondiente con username y password
    axios.post(`http://localhost:4000/${endpoint}`, { username, password })
      .then(response => {
        // Muestra una alerta en función del modo
        alert(isRegister ? 'Registro exitoso' : 'Inicio de sesión exitoso');
      })
      .catch(error => {
        // Muestra una alerta en caso de error
        alert('Error:');
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* Título dinámico según el modo */}
          <IonTitle>{isRegister ? 'REGISTRARSE' : 'INICIAR SESIÓN'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            {/* Título grande para versión compacta */}
            <IonTitle size="large">{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Nombre de Usuario</IonLabel>
                {/* Input para el nombre de usuario */}
                <IonInput value={username} onIonChange={e => setUsername(e.detail.value!)} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Contraseña</IonLabel>
                {/* Input para la contraseña */}
                <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {/* Botón de envío del formulario */}
              <IonButton expand="block" onClick={handleSubmit}>
                {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
              </IonButton>
              {/* Botón para cambiar entre modos */}
              <IonButton expand="block" fill="clear" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? '¿Ya tienes una cuenta? Iniciar Sesión' : '¿No tienes una cuenta? Registrarse'}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
//Algo esta fallando pq entra aunque no pongamos usuario JJAJAJAJ, pero ya lo arreglaremos. 
export default Home;
