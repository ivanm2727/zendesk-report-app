import React, { useState, MouseEvent, useEffect} from 'react';
import {
  Notification,
  Title,
  Close,
  ToastProvider,
  useToast
} from '@zendeskgarden/react-notifications';
import { Col, Row } from '@zendeskgarden/react-grid';
import { Button } from '@zendeskgarden/react-buttons';
import { Spinner } from '@zendeskgarden/react-loaders';
import {getPokemonByName} from "../../frameworks_and_drivers/external_interfaces/zendeskapi"

// interface IGenerateState {
//   loading: string,
//   notificationType: string,
//   notificationTitle: string,
//   notificationBody: string
// }

enum NotificationTypes {
  success = 'success',
  error = 'error',
  info = 'info'
}

enum NotificationTitles {
  success = 'Success',
  error = 'Error',
  info = 'Info'
}

enum NotificationBodies {
  success = 'Your reports have been generated succesfully',
  error = 'Error',
  info = 'Your reports are being processed'
}

const Toasts = () => {
  const { addToast } = useToast();
  const [notificationType, setNotificationType] = useState<NotificationTypes>(NotificationTypes.success);
  const [notificationTitle, setNotificationTitle] = useState<NotificationTitles>(NotificationTitles.success);
  const [notificationBody, setNotificationBody] = useState<NotificationBodies>(NotificationBodies.success);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setSuccessfulNotification = () =>{
    setNotificationType(NotificationTypes.success)
    setNotificationTitle(NotificationTitles.success)
    setNotificationBody(NotificationBodies.success)
  }

  const setUnsuccessfulNotification = () =>{
    setNotificationType(NotificationTypes.error)
    setNotificationTitle(NotificationTitles.error)
    setNotificationBody(NotificationBodies.error)
  }

  const setLoadingNotification = () =>{
    setNotificationType(NotificationTypes.info)
    setNotificationTitle(NotificationTitles.info)
    setNotificationBody(NotificationBodies.info)
    setIsLoading(true);
  }

  const setNotificationByStatusResponse = (status:number) =>{
    if (status>=200 && status<400){
      setSuccessfulNotification()
    } else{
      setUnsuccessfulNotification()
      console.log(notificationType)
      console.log('deberia ser error')
    }
  }

  const renderToasts = (placement: any) => {
    addToast(
      ({ close }) => (
        <Notification type={notificationType} style={{ maxWidth: 450 }}>
          <Title>{notificationTitle}</Title>
            {notificationBody}
          <Close aria-label="Close" onClick={close} />
        </Notification>
      ),
      { placement }
    );
  }

  const handleClick = async (event:MouseEvent,placement:string) => {
    event.preventDefault();
    console.log('Trayendo Reporte')
    setLoadingNotification()
    //setNotificationType(NotificationTypes.info);
    // AXIOS haciendo request al svc de backend
    // X cantidad de tiempo 

    try{
      const response= await getPokemonByName('yonathan');
      setNotificationByStatusResponse(response.status)
      console.log(notificationType)
      console.log(response)
      
    } catch(error:any){
      if (error.response){
        console.log(error.response.status)
        setNotificationByStatusResponse(error.response.status)
      }

    }finally{
      setIsLoading(false);
      return renderToasts(placement);
    }
  }

  return (
    <>
    <Row justifyContent="start">
        <Col size="2">
          <Button onClick={(event)=>handleClick(event,'bottom')} isStretched>
            Generate Report
          </Button>
        </Col>
        {isLoading && <Spinner size="48"/>}
    </Row>
       
    </>
  );
};


const Generate = () => {
  return (
    <ToastProvider>
      <Toasts />
    </ToastProvider>
  )
}

export default Generate


