import React from 'react';
import { IonContent, IonHeader, IonPage, IonRow, IonCol, IonTitle, IonIcon, IonToolbar, IonMenu, IonItem, IonButton, IonList} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons'; // Importa el ícono de usuario
import { useHistory } from 'react-router-dom';
import "./Home.css";
const PerfilMuestra: React.FC = () => {

    const history = useHistory();

    const handleMenuClick = (path: string) => {
        history.push(path);
      };
    
      const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token almacenado
        alert('Sesión cerrada exitosamente');
        history.push('/login'); // Redirigir al usuario a la página de inicio de sesión
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
                    <IonItem href='perfil'>Perfil de usuario.</IonItem>
                    <IonList>
                        <IonItem button onClick={() => handleMenuClick('/amor')}>Amor</IonItem>
                        <IonItem button onClick={() => handleMenuClick('/comedia')}>Comedia</IonItem>
                        <IonItem button onClick={() => handleMenuClick('/terror')}>Terror</IonItem>
                        <IonItem button onClick={() => handleMenuClick('/infantil')}>Infantil</IonItem>
                    </IonList>

                    <IonButton color={'warning'} onClick={handleLogout} href='/home'>Cerrar sesión</IonButton>
                </IonContent>
            </IonMenu>

            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Perfil del Usuario</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonRow>
                        <IonCol size="12" className="ion-text-center">
                            <IonIcon
                                icon={personCircleOutline}
                                style={{ fontSize: '150px', color: '#666', margin: '0 auto' }} // Tamaño y color del ícono
                            />
                            <h2>Laisha Pamela Hernandez</h2>
                            <p>Correo: utm21040175@utma.edu.mx</p>
                            <p>Contraseña: ******</p>
                        </IonCol>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    );
};

export default PerfilMuestra;
