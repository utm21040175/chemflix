import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar , IonMenu, IonList, IonItem} from '@ionic/react';

const Inicio: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Página de Inicio</IonTitle>
        </IonToolbar>
        <IonMenu side="start" menuId="first" contentId="content">
          <IonToolbar>
            <IonTitle>Menú</IonTitle>
          </IonToolbar>
        <IonContent>
          <IonList>
            <IonItem button>Opción 1</IonItem>
            <IonItem button>Opción 2</IonItem>
            <IonItem button>Opción 3</IonItem>
            <IonItem button>Opción 4</IonItem>
          </IonList>
        </IonContent> 
      </IonMenu>
      </IonHeader>
      <IonContent fullscreen>
        <p>Bienvenido a la página de inicio.</p>
      </IonContent>
    </IonPage>
  );
};

export default Inicio;
